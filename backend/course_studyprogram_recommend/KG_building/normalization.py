from audioop import reverse
import codecs

# from curses import echo
import json
import os
from py2neo import Node, Relationship, Graph, Path, Subgraph
from py2neo import NodeMatcher, RelationshipMatcher
import pandas as pd

backend_directory = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUTPUT_DATA = os.path.abspath(
    os.path.join(
        backend_directory, "course_studyprogram_recommend", "entities_and_relationships"
    )
)


class Normalization(object):
    def __init__(self):
        super(Normalization, self).__init__()
        self.graph = Graph("http://localhost:7474/", auth=("neo4j", "1234qweR"))
        self.link_list = []
        self.rel_list = []

    def normalize(self, dic):
        """
        This function is used to map the weight of the interests to [1,5]
        """
        # {'learning analytics': 9,
        # 'open assessment': 1}
        # dict = ([('Learning analytics', 9), ('Open assessment', 1), ('Learning environment', 5), ('Peer assessment', 9)])
        maxnum = sorted(
            dic.items(),
            key=lambda items: items[
                1
            ],  # key of sorting is the second element in dic which is the numbers(weights) of each keyword
            reverse=True,
        )[:1][0][1]
        for k, v in dic.items():
            # if maxnum == 0:
            #     maxnum = 5
            f = (v / maxnum) * 5
            dic[k] = round(f, 1)
            if dic[k] < 1:
                dic[k] = 1.0
        return dic

    def export_data(self, data, path):
        # print("export data...")
        if isinstance(data[0], str):
            data = sorted([d.strip("...") for d in set(data)])
        with codecs.open(OUTPUT_DATA + path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4, ensure_ascii=False)

    def run(self):
        node_matcher = NodeMatcher(self.graph)
        relationship_matcher = RelationshipMatcher(self.graph)
        lecture_nodes = node_matcher.match("lecture")

        # normalize has_key
        i = 0
        for node in lecture_nodes:
            relationship = list(relationship_matcher.match([node], r_type="has_key"))
            i = len(relationship)
            if i > 0:
                dict = {}
                dict["name"] = relationship[0].start_node["name"]
                dict["validate_keywords"] = {}
                for j in range(i):
                    dict["validate_keywords"][relationship[j].end_node["name"]] = float(
                        relationship[j]["weight"]
                    )
                normal_keys = self.normalize(dict["validate_keywords"])

                # for k, v in normal_keys["validate_keywords"].items():
                for k, v in dict["validate_keywords"].items():
                    cql = """MATCH p=(n)-[r:has_key]->(m) 
                            WHERE n.name = '{head}' AND m.name='{tail}'
                            SET r.weight = '{weight}' """.format(
                        head=dict["name"].replace("'", ""),
                        tail=k.replace("'", ""),
                        weight=v,
                    )
                    try:
                        self.graph.run(cql)
                        i = i + 1
                    except Exception as e:
                        print(e)
                        print(cql)

            self.rel_list.append(dict)
        print("reset {} has_key weights".format(i))
        self.export_data(self.rel_list, "/normalized_has_key.json")

        # normalize has_linl
        lecture_nodes = node_matcher.match("keyword")
        num = 0
        for node in lecture_nodes:
            relationship = list(relationship_matcher.match([node], r_type="has_link"))
            i = len(relationship)
            if i > 0:
                dict = {}
                dict["name"] = relationship[0].start_node["name"]
                dict["validate_links"] = {}
                for j in range(i):
                    dict["validate_links"][relationship[j].end_node["name"]] = float(
                        relationship[j]["weight"]
                    )
                normal_keys = self.normalize(dict["validate_links"])

                for k, v in normal_keys.items():
                    cql = """MATCH p=(n)-[r:has_link]->(m) 
                        WHERE n.name = '{head}' AND m.name='{tail}'
                        SET r.weight = '{weight}' """.format(
                        head=dict["name"].replace("'", ""),
                        tail=k.replace("'", ""),
                        weight=v,
                    )
                    try:
                        self.graph.run(cql)
                        num = num + 1
                    except Exception as e:
                        print(e)
                        print(cql)

                self.link_list.append(dict)
        print("reset {} has_link weights".format(num))
        self.export_data(self.link_list, "/normalized_has_link.json")


if __name__ == "__main__":
    normalization = Normalization()
    normalization.run()

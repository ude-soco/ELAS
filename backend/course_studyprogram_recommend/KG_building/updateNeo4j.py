#extract links and category data
# delete invalidate keywords, write links and category to neo4j

import codecs
import io
import re
import json
import os
from unicodedata import category
from py2neo import Graph, Node

from tqdm import tqdm
import json
import codecs


backend_directory = os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", ".."))
Filtered_Keywords_DATA = os.path.abspath(os.path.join(
    backend_directory, "course_studyprogram_recommend", "entities_and_relationships", "wiki_filterd_keywords.json"))
Category_DATA = os.path.abspath(os.path.join(
    backend_directory, "course_studyprogram_recommend", "entities_and_relationships", "wiki_entry_categories_summary.json"))
Links_DATA = os.path.abspath(os.path.join(
    backend_directory, "course_studyprogram_recommend", "entities_and_relationships", "sorted_links_count.json"))

OUTPUT_DATA = os.path.abspath(os.path.join(
    backend_directory, "course_studyprogram_recommend", "entities_and_relationships"))
OUTPUT_LINK_ENTITIES = os.path.abspath(
    os.path.join(OUTPUT_DATA, "links.json"))
OUTPUT_HAS_LINK_RELATIONSHIP = os.path.abspath(
    os.path.join(OUTPUT_DATA, "keyword_has_links.json"))
OUTPUT_CATEGORY_ENTITIES = os.path.abspath(
    os.path.join(OUTPUT_DATA, "categories.json"))
OUTPUT_IS_IN_RELATIONSHIP = os.path.abspath(
    os.path.join(OUTPUT_DATA, "keyword_is_in_categories.json"))


class UpdateNeo4j(object):
    def __init__(self):
        super(UpdateNeo4j, self).__init__()
        self.graph = Graph('http://localhost:7474/', auth=("neo4j", "1234"))
        self.keyword_list = []
        self.links = []  
        self.keyword_has_link = []  
        self.categories = [] 
        self.keyword_infos = []  
        self.keyword_is_in_category = []  

    def access_keywords(self):
        nodes = self.graph.nodes
        keyword_nodes = nodes.match("keyword")      
        for node in keyword_nodes:
            self.keyword_list.append(node["name"])  
        print('{} keyword nodes got from Neo4j'.format(
            len(self.keyword_list)))  

    def delete_nodes(self, entity, entity_type_name):  # delete one entity and its relationships
        cql = """MATCH(n:{label}{{name:'{entity_name}'}})
                DETACH DELETE n""".format(
            label=entity_type_name, entity_name=entity.replace("'", "")
        )
        try:
            self.graph.run(cql)
        except Exception as e:
            print(e)
            print(cql)

    def write_weighted_edges(self, quadruple, head_type, tail_type):
        print("write {0} relationship".format(quadruple[0][1]))
        for head, relation, tail, value in tqdm(quadruple, ncols=80):
            cql = """MATCH(p:{head_type}),(q:{tail_type})
                    WHERE p.name = '{head}' AND q.name='{tail}'
                    MERGE (p)-[r:{relation}] -> (q)
                    SET r.value = '{value}' """.format(
                head_type=head_type, tail_type=tail_type, head=head.replace(
                    "'", ""),
                tail=tail.replace("'", ""), value=value, relation=relation
            )
            try:
                self.graph.run(cql)
            except Exception as e:
                print(e)
                print(cql)

    def write_nodes(self, entity_list, entity_type_name):  # create one entity
        print("write {0} entities".format(entity_type_name))
        for node in list(set(entity_list)):  
            cql = """MERGE(n:{label}{{name:'{entity_name}'}})""".format(
                label=entity_type_name, entity_name=node.replace("'", "")
            )
            try:
                self.graph.run(cql)
            except Exception as e:
                print(e)
                print(cql)

    def write_edges(self, triples, head_type, tail_type):  # creat one relationship edge
        print("write {0} relationship".format(triples[0][1]))
        for head, relation, tail, in tqdm(triples, ncols=80):
            cql = """MATCH(p:{head_type}),(q:{tail_type})
                    WHERE p.name = '{head}' AND q.name='{tail}'
                    MERGE (p)-[r:{relation}] -> (q)""".format(
                head_type=head_type, tail_type=tail_type, head=head.replace(
                    "'", ""),
                tail=tail.replace("'", ""), relation=relation
                )
            try:
                self.graph.run(cql)
            except Exception as e:
                print(e)
                print(cql)


    def run(self):
        #delete invalidate keywords
        self.access_keywords()
        with open(Filtered_Keywords_DATA, 'r', encoding='utf8') as k_file:
            validate_keywords = json.load(k_file)
            i = 0
            for node in self.keyword_list:
                if node not in validate_keywords:
                    self.delete_nodes(node, 'keyword')
                    i = i+1
            print("delete {0} keywords".format(i))
        
        # write links and has_link
        with open(Links_DATA, 'r', encoding='utf8') as link_file:
            relevant_keywords = json.load(link_file)
            for item in relevant_keywords:
                if 'links' in item:
                    keyword_name = item['name']
                    # links_list = []
                    for link in item['links']:
                        self.links.append(link[1])
                        self.keyword_has_link.append(
                            [keyword_name, 'has_link', link[1], link[0]])

            self.write_nodes(self.links, 'relevant_keywords')
            self.write_weighted_edges(self.keyword_has_link, 'keyword', 'relevant_keywords')

            with io.open(OUTPUT_LINK_ENTITIES, 'w', encoding='UTF8') as output_file:
                json.dump(self.links, output_file, ensure_ascii=False)
                output_file.close()

            with io.open(OUTPUT_HAS_LINK_RELATIONSHIP, 'w', encoding='UTF8') as output_file:
                json.dump(self.keyword_has_link, output_file, ensure_ascii=False)
                output_file.close()

            link_file.close()

        # write category, belongs_to, summary of keywords
        with open(Category_DATA, 'r', encoding='utf8') as cat_file:
            category_data = json.load(cat_file)
            for item in category_data:
                keyword_name = item['name']
                if 'summary' in item:
                    cql = """MATCH (n:keyword)
                        WHERE n.name='{name}'
                        set n.summary='{summary}'""".format(name=keyword_name.replace("'", ""), summary=item['summary'].replace("'", "").replace("\n", ""))
                    try:
                        self.graph.run(cql)
                    except Exception as e:
                        print(e)
                        print(cql)
                if 'categories' in item:
                    for cate in item['categories']:
                        self.categories.append(cate)
                        self.keyword_is_in_category.append([keyword_name, 'is_in', cate])

            self.write_nodes(self.categories, 'category')
            self.write_edges(self.keyword_is_in_category, 'keyword', 'category')

            with io.open(OUTPUT_CATEGORY_ENTITIES, 'w', encoding='UTF8') as output_file:
                json.dump(self.categories, output_file, ensure_ascii=False)
                output_file.close()

            with io.open(OUTPUT_IS_IN_RELATIONSHIP, 'w', encoding='UTF8') as output_file:
                json.dump(self.keyword_is_in_category, output_file, ensure_ascii=False)
                output_file.close()

            cat_file.close()

if __name__ == '__main__':
    updateDB = UpdateNeo4j()
    updateDB.run()
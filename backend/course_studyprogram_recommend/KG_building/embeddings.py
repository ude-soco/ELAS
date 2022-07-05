import codecs
import json
import os
import numpy as np
from numpy import nan
from tkinter import E
from py2neo import NodeMatcher, RelationshipMatcher
from py2neo import Graph, Node, Relationship
from gensim.models.doc2vec import Doc2Vec, TaggedDocument
import gensim
from tqdm import tqdm
from dotenv import load_dotenv

load_dotenv()

NEO_HOST = os.environ.get("NEO4J_HOST")
NEO_USER = os.environ.get("NEO4J_USER")
NEO_PASS = os.environ.get("NEO4J_PASS")


backend_directory = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
DBOW_Model_Path = os.path.abspath(
    os.path.join(
        backend_directory,
        "course_studyprogram_recommend",
        "doc2vec_dbow_dm_wiki_article_200_dim",
        "doc2vec_dbow.model",
    )
)
OUTPUT_DATA = os.path.abspath(
    os.path.join(
        backend_directory, "course_studyprogram_recommend", "entities_and_relationships"
    )
)

graph = Graph({NEO_HOST}, auth=({NEO_USER}, {NEO_PASS}))
nodes = graph.nodes
node_matcher = NodeMatcher(graph)
relationship_matcher = RelationshipMatcher(graph)

nan_default = {"nan": 0}

stopwords_list = list(gensim.parsing.preprocessing.STOPWORDS)
model = Doc2Vec.load(DBOW_Model_Path)


def delete_nodes(entity, entity_type_name):  # delete one entity and its relationships
    cql = """MATCH(n:{label}{{name:'{entity_name}'}})
                DETACH DELETE n""".format(
        label=entity_type_name, entity_name=entity.replace("'", "")
    )
    try:
        graph.run(cql)
    except Exception as e:
        print(e)
        print(cql)


keyword_list = []


def KeywordEmbedding():
    keyword_nodes = nodes.match("keyword")
    keyword_info = {}
    count = 0
    for node in tqdm(keyword_nodes):
        count = count + 1
        if node["abstract"] is not None:
            keyword_info["name"] = node["name"]
            # print("keyword Node " + str(count) + ": " + keyword_info["name"])  # 打印日志
            keyword_info["abstract"] = node["abstract"]
            keyword_info["embedding"] = doc2vecEmbedding(node["abstract"]).tolist()

            keyword_list.append(keyword_info)
            cql = """MATCH (n:keyword)
                WHERE n.name='{name}'
                set n.embedding='{embedding}'""".format(
                name=keyword_info["name"].replace("'", ""),
                embedding=keyword_info["embedding"],
            )
            try:
                graph.run(cql)
            except Exception as e:
                print(e)
                print(cql)
        if node["abstract"] is None:
            # TODO: uncomment code below if need to delete node which has no abstract
            # delete_nodes(node,'keyword')
            print(
                "keyword Node {count}: {n} failed, has no abstract".format(
                    count=count, n=node["name"]
                )
            )
    print("{} keyword nodes have embedding".format(len(keyword_list)))


relevant_keywords_list = []


def RelevantKeywordEmbedding():
    relevant_keywords_nodes = nodes.match("relevant_keywords")
    relevant_keywords_info = {}
    count = 0
    for node in tqdm(relevant_keywords_nodes):
        count = count + 1
        if node["abstract"] is not None:
            relevant_keywords_info["name"] = node["name"]
            # print(
            #     "relevant_keywords Node "
            #     + str(count)
            #     + ": "
            #     + relevant_keywords_info["name"]
            # )
            relevant_keywords_info["abstract"] = node["abstract"]
            relevant_keywords_info["embedding"] = doc2vecEmbedding(
                node["abstract"]
            ).tolist()
            # print(relevant_keywords_info['embedding'])
            relevant_keywords_list.append(relevant_keywords_info)
            cql = """MATCH (n:relevant_keywords)
                    WHERE n.name='{name}'
                    set n.embedding='{embedding}'""".format(
                name=relevant_keywords_info["name"].replace("'", ""),
                embedding=relevant_keywords_info["embedding"],
            )
            try:
                graph.run(cql)
            except Exception as e:
                print(e)
                print(cql)
        if node["abstract"] is None:
            # delete_nodes(node,'relevant_keywords')
            print(
                "relevant_keywords Node {count}: {n} failed, has no abstract".format(
                    count=count, n=node["name"]
                )
            )
    print(
        "{} relevant_keywords nodes have embedding".format(len(relevant_keywords_list))
    )


category_list = []


def CategoryEmbedding():
    category_nodes = nodes.match("category")
    count = 0
    for node in tqdm(category_nodes):
        count = count + 1
        cql = """MATCH p=()-[r:is_in]->(m) 
            where m.name = '{name}'
            RETURN p""".format(
            name=node["name"]
        )
        relationship = list(graph.run(cql))
        i = len(relationship)
        if i > 0:
            dict = {}
            dict["name"] = node["name"]  # category
            dict["rel_key_embs"] = {}
            vector = np.zeros(200, float)
            for j in range(i):
                # print(relationship[j][0])
                if relationship[j][0].start_node["embedding"] is not None:
                    emb_list = eval(
                        "(" + relationship[j][0].start_node["embedding"] + ")"
                    )
                    dict["rel_key_embs"][
                        relationship[j][0].start_node["name"]
                    ] = relationship[j][0].start_node["embedding"]
                    vector = vector + np.array(emb_list)
                if relationship[j][0].start_node["embedding"] is None:
                    print(
                        "keyword Node {n} has no embedding".format(
                            n=relationship[j][0].start_node["name"]
                        )
                    )
            avg_embedding = vector / i

            dict["cate_embedding"] = avg_embedding.tolist()

            category_list.append(dict)

            cql = """MATCH (n:category)
                    WHERE n.name='{name}'
                    set n.embedding='{embedding}'""".format(
                name=dict["name"].replace("'", ""), embedding=dict["cate_embedding"]
            )
            try:
                graph.run(cql)
                # print("category Node " + str(count) + ": " + node["name"])
            except Exception as e:
                print(e)
                print(cql)
        if i == 0:
            # delete_nodes(node,'category')
            print(
                "category Node {count}: {n} failed, has no relationship".format(
                    count=count, n=node["name"]
                )
            )
    print("{} category nodes have embedding".format(len(category_list)))


lecture_list = []


def LectureEmbedding():
    lecture_nodes = nodes.match("lecture")
    count = 0
    for node in tqdm(lecture_nodes):
        count = count + 1
        cql = """MATCH p=(n)-[r:has_key]->() 
            where n.name = '{name}'
            RETURN p,r""".format(
            name=node["name"]
        )
        relationship = list(graph.run(cql))
        i = len(relationship)
        if i > 0:
            dict = {}
            dict["name"] = node["name"]  # lecture
            dict["rel_key_embs"] = {}
            vector = np.zeros(200, float)
            weights = 0
            for j in range(i):
                if relationship[j][0].end_node["embedding"] is not None:
                    dict["rel_key_embs"][
                        relationship[j][0].end_node["name"]
                    ] = relationship[j][0].end_node[
                        "embedding"
                    ]  # 方便输出看json结果
                    emb_list = eval(
                        "(" + relationship[j][0].end_node["embedding"] + ")"
                    )
                    w = float(relationship[j][1].get("weight"))
                    weights = weights + w
                    vector = vector + np.array(emb_list) * w
                if relationship[j][0].end_node["embedding"] is None:
                    print(
                        "keyword Node {n} has no embedding".format(
                            n=relationship[j][0].end_node["name"]
                        )
                    )
            weighted_avg_embedding = vector / weights

            dict["lec_embedding"] = weighted_avg_embedding.tolist()

            lecture_list.append(dict)

            cql = """MATCH (n:lecture)
                    WHERE n.name='{name}'
                    set n.embedding='{embedding}'""".format(
                name=dict["name"].replace("'", ""), embedding=dict["lec_embedding"]
            )
            try:
                graph.run(cql)
                # print("lecture Node " + str(count) + ": " + node["name"])
            except Exception as e:
                print(e)
                print(cql)
        if i == 0:
            # delete_nodes(node,'lecture')
            print(
                "lecture Node {count}: {n} failed, has no relationship".format(
                    count=count, n=node["name"]
                )
            )
    print("{} lecture nodes have embedding".format(len(lecture_list)))


study_program_list = []


def StudyProgramEmbedding():
    study_program_nodes = nodes.match("study_program")
    count = 0
    for node in tqdm(study_program_nodes):
        count = count + 1
        # print(node['name'])
        cql = """MATCH p=()-[r:belongs_to]->(m) 
            where m.name = '{name}'
            RETURN p""".format(
            name=node["name"]
        )
        relationship = list(graph.run(cql))
        i = len(relationship)
        # print(i)
        if i > 0:
            dict = {}
            dict["name"] = node["name"]  # study program
            dict["rel_key_embs"] = {}
            vector = np.zeros(200, float)
            for j in range(i):
                # print(relationship[j][0])
                if relationship[j][0].start_node["embedding"] is not None:
                    emb_list = eval(
                        ("(" + relationship[j][0].start_node["embedding"] + ")"),
                        nan_default,
                    )
                    dict["rel_key_embs"][
                        relationship[j][0].start_node["name"]
                    ] = relationship[j][0].start_node["embedding"]
                    vector = vector + np.array(emb_list)
                if relationship[j][0].start_node["embedding"] is None:
                    print(
                        "keyword Node {n} has no embedding".format(
                            n=relationship[j][0].start_node["name"]
                        )
                    )
            avg_embedding = vector / i

            dict["stu_prog_embedding"] = avg_embedding.tolist()

            study_program_list.append(dict)

            cql = """MATCH (n:study_program)
                    WHERE n.name='{name}'
                    set n.embedding='{embedding}'""".format(
                name=dict["name"].replace("'", ""), embedding=dict["stu_prog_embedding"]
            )
            try:
                graph.run(cql)
                # print("study program Node " + str(count) + ": " + node["name"])
            except Exception as e:
                print(e)
                print(cql)
        if i == 0:
            # delete_nodes(node,'study_program')
            print(
                "study program Node {count}: {n} failed, has no relationship".format(
                    count=count, n=node["name"]
                )
            )
    print("{} study program nodes have embedding".format(len(study_program_list)))


def doc2vecEmbedding(text):
    # stopwords_list = list(gensim.parsing.preprocessing.STOPWORDS)
    p = [
        word
        for word in gensim.utils.simple_preprocess(text)
        if word not in stopwords_list
    ]
    # model = Doc2Vec.load(DBOW_Model_Path)
    vector = model.infer_vector(p)
    return vector


def export_data(data, path):
    # print("export data")
    if isinstance(data[0], str):
        data = sorted([d.strip("...") for d in set(data)])
    with codecs.open(OUTPUT_DATA + path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)


if __name__ == "__main__":
    KeywordEmbedding()
    export_data(keyword_list, "/keyword_embeddings.json")
    RelevantKeywordEmbedding()
    export_data(relevant_keywords_list, "/links_embeddings.json")
    CategoryEmbedding()
    export_data(category_list, "/category_embeddings.json")
    LectureEmbedding()
    export_data(lecture_list, "/lecture_embeddings.json")
    StudyProgramEmbedding()
    export_data(study_program_list, "/study_program_embeddings.json")

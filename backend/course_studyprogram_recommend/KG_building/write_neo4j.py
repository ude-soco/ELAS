# extract lecture and study program data from output in scraper folder
# first write lecture and study program and keyword entities, relationships and attributes among them

import os
import json
import codecs
import threading
from py2neo import Graph
from tqdm import tqdm

backend_directory = os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", ".."))

LECTURE_DATA = os.path.abspath(os.path.join(
    backend_directory, "scrapers", "merged_data.json"))
STUDY_PROGRAMS_DATA = os.path.abspath(os.path.join(
    backend_directory, "scrapers", "study_programs.json"))
OUTPUT_DATA = os.path.abspath(os.path.join(
    backend_directory, "course_studyprogram_recommend", "entities_and_relationships"))



class LectureExtractor(object):

    def __init__(self):
        super(LectureExtractor, self).__init__()
        self.graph = Graph('http://localhost:7474/', auth=("neo4j", "1234"))

        # entities 
        self.lectures = []  
        self.study_programs = []  
        self.professors = []  
        self.keywords = []  

        # attributes of entity
        self.lecture_infos = []
        self.study_program_infos = []
        self.professor_infos = []
        self.keyword_infos = []

        # relationships
        self.lecture_has_key = []
        self.lecture_belongs_to_studyprograms = []
        self.lecture_taucht_by_professor = []

    def extrac_studyprogram(self):
        print("extract info from study_program.json")
        with open(STUDY_PROGRAMS_DATA, 'r', encoding='utf8') as s_file:
            studyprogram_data = json.load(s_file)
            for studyprogram_item in studyprogram_data:
                studyprogram_dict = {}
                studyprogram_dict['url'] = ''
                studyprogram_dict['id'] = ''
                studyprogram_dict['name'] = ''

                studyprogram_name = studyprogram_item['name']
                studyprogram_dict['name'] = studyprogram_name
                self.study_programs.append(studyprogram_name)

                if 'url' in studyprogram_item:
                    studyprogram_dict['url'] = studyprogram_item['url']

                if 'id' in studyprogram_item:
                    studyprogram_dict['id'] = studyprogram_item['id']

                self.study_program_infos.append(studyprogram_dict)

    def extrac_triples(self):
        print("extract info from merged_data.json")
        with open(LECTURE_DATA, 'r', encoding='utf8') as f:
            course_data = json.loads(f.read())
            for lecture_item in course_data:  
                lecture_dict = {}  # temporary storage of each course attributes
                lecture_dict['url'] = ''
                lecture_dict['id'] = ''
                # lecture_dict['root_id'] = ''
                lecture_dict['subject_type'] = ''
                lecture_dict['language'] = ''
                lecture_dict['professor'] = ''
                lecture_dict['description'] = ''

                professor_dic = {}  

                keywords_dic = {}  

                lecture_name = lecture_item['name']
                lecture_dict['name'] = lecture_name
                self.lectures.append(lecture_name)  

                if 'url' in lecture_item:  
                    lecture_dict['url'] = lecture_item['url']

                if 'id' in lecture_item:  
                    lecture_dict['id'] = lecture_item['id']

                if 'subject_type' in lecture_item:  
                    lecture_dict['subject_type'] = lecture_item['subject_type']

                if 'language' in lecture_item:  
                    lecture_dict['language'] = lecture_item['language']

                if 'description' in lecture_item:  
                    lecture_dict['description'] = lecture_item['description']

                if 'root_id' in lecture_item:  
                    for r_id in lecture_item['root_id']:
                        for i in range(len(self.study_program_infos)):
                            if r_id in self.study_program_infos[i]['id']:
                                self.lecture_belongs_to_studyprograms.append(
                                    [lecture_name, 'belongs_to', self.study_program_infos[i]['name']])  

                if 'persons' in lecture_item:  
                    for person in lecture_item['persons']:
                        professor_dic['name'] = person['name']
                        self.professors.append(
                            person['name'])  
                        self.lecture_taucht_by_professor.append(
                            [lecture_name, 'taught_by', person["name"]])
                        if 'url' in person:
                            professor_dic['url'] = person['url']

                if 'keywords' in lecture_item:  
                    keywords_list = []
                    for keyword in lecture_item['keywords']:  
                        self.keywords.append(keyword['text'])
                        self.lecture_has_key.append(
                            [lecture_name, 'has_key', keyword['text'], keyword['value']])
                        keywords_list.append( 
                            [keyword['text'], keyword['value']])
                    
                    keywords_dic['name'] = lecture_name
                    keywords_dic['keywords'] = keywords_list

                self.lecture_infos.append(lecture_dict)
                #self.professor_infos.append(professor_dic)
                self.keyword_infos.append(keywords_dic)

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

    # has_key edge has weight
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

    def set_attributes(self, entity_infos, entity_type):
        print("write {0} attributes of entity".format(entity_type))
        for e_dict in tqdm(entity_infos[:], ncols=80):
            try:
                name = e_dict['name']
                del e_dict['name']
                for k, v in e_dict.items():  
                    cql = """MATCH (n:{label})
                        WHERE n.name='{name}'
                        set n.{k}='{v}'""".format(label=entity_type, name=name.replace("'", ""), k=k, v=v.replace("'", "").replace("\n", ""))
                    self.graph.run(cql)
            except Exception as e:
                print(e)
                print(cql)

    def create_entities(self):  # creat all entities
        self.write_nodes(self.lectures, 'lecture')
        self.write_nodes(self.study_programs, 'study_program')
        self.write_nodes(self.keywords, 'keyword')
        #self.write_nodes(self.professors, 'professor')

    def create_relationships(self):  # create all relationships
        self.write_weighted_edges(self.lecture_has_key, 'lecture', 'keyword')
        self.write_edges(self.lecture_belongs_to_studyprograms,
                         'lecture', 'study_program')
        # self.write_edges(self.lecture_taucht_by_professor,
        #                  'lecture', 'professor')

    def set_attributes_lectures(self): # set attributes of lecture entity
        t = threading.Thread(target=self.set_attributes,
                             args=(self.lecture_infos, "lecture"))
        t.setDaemon(False)
        t.start()

    def set_attributes_study_programs(self): # set attributes of study program entity
        t = threading.Thread(target=self.set_attributes,
                             args=(self.study_program_infos, "study_program"))
        t.setDaemon(False)
        t.start()

    # def set_attributes_professors(self): # set attributes of professor entity if need in the future
    #     t = threading.Thread(target=self.set_attributes,
    #                          args=(self.professor_infos, "professor"))
    #     t.setDaemon(False)
    #     t.start()

    def export_data(self, data, path):
        #print("export data")
        if isinstance(data[0], str):
            data = sorted([d.strip("...") for d in set(data)])
        with codecs.open(OUTPUT_DATA+path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)

    def export_entities_relationships(self): 
        self.export_data(self.lectures, '/lectures.json')
        #self.export_data(self.professors, '/professors.json')
        self.export_data(self.keywords, '/keywords.json')
        self.export_data(self.study_programs, '/study_program.json')

        self.export_data(self.lecture_has_key,
                         '/lecture_has_key.json')
        self.export_data(self.lecture_belongs_to_studyprograms,
                         '/lecture_belongs_to_studyprograms.json')
        #self.export_data(self.lecture_taucht_by_professor,
        #                 '/lecture_taucht_by_professor.json')

    def run(self):
        self.extrac_studyprogram() # extract study program information
        self.extrac_triples()  # extract lecture information
        print("{} lecture entities extracted, ".format(len(self.lectures)))
        print("{} study_program entities extracted, ".format(
            len(self.study_programs)))
        print("{} keyword entities extracted, ".format(len(self.keywords)))
       # print("{} professor entities extracted.".format(len(self.professors)))
        self.create_entities()
        self.create_relationships()

        self.set_attributes_study_programs()
        self.set_attributes_lectures()
        self.set_attributes_professors()

        self.export_entities_relationships()


if __name__ == '__main__':
    print(OUTPUT_DATA)
    # extractor = LectureExtractor()
    # extractor.run()

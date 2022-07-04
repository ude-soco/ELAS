# scrape wikipedia information of links

from py2neo import Graph
import wikipedia
import os
import json
import codecs

backend_directory = os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", ".."))
OUTPUT_DATA = os.path.abspath(os.path.join(
    backend_directory, "course_studyprogram_recommend", "entities_and_relationships"))

class WikipediaFilterLinks(object):
    def __init__(self):
        super(WikipediaFilterLinks, self).__init__()
        self.graph = Graph('http://localhost:7474/', auth=("neo4j", "1234"))
        self.relevant_keywords_list = []
        self.link_infos = []
        self.filtered_links = []

    def access_links(self):
        nodes = self.graph.nodes
        links_nodes = nodes.match("relevant_keywords")      
        for node in links_nodes:
            self.relevant_keywords_list.append(node["name"])  
        print('{} relevant keywords nodes got from Neo4j'.format(
            len(self.relevant_keywords_list)))  

    def wikiScraper(self):
        i = 0
        for key in self.relevant_keywords_list: 
            link_entry = {}
            try:
                link_entry['name'] = key
                link_entry['abstract'] = wikipedia.summary(key)  
                i = i+1
                self.filtered_links.append(key)
                self.link_infos.append(link_entry)
            except Exception as e:
                print(e)

        print("get {} text from wikipedia".format(i))

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

    def update_links(self):
        i=0
        for node in self.relevant_keywords_list:
            if node in self.filtered_links:
                for item in self.link_infos:
                    if node == item['name']:
                        cql = """MATCH (n:relevant_keywords)
                            WHERE n.name='{name}'
                            set n.abstract='{abstract}'""".format(name=item['name'].replace("'", ""), abstract=item['abstract'].replace("'", "").replace("\n", ""))
                        try:
                            self.graph.run(cql)
                        except Exception as e:
                            print(e)
                            print(cql)              
            else:
                self.delete_nodes(node, 'relevant_keywords')
                i=i+1

        print("finish update! delete {} relevant keywords".format(i))

    def export_data(self, data, path):
        print("export data..")
        if isinstance(data[0], str):
            data = sorted([d.strip("...") for d in set(data)])
        with codecs.open(OUTPUT_DATA+path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)

    def run(self):
        self.access_links()
        self.wikiScraper()
        self.update_links()
        self.export_data(self.link_infos, '/wiki_links_article.json')
        self.export_data(self.filtered_links, '/wiki_filterd_links.json')


if __name__ == '__main__':
    wikiScraper = WikipediaFilterLinks()
    wikiScraper.run()
# use wikipedia tutor: https://wikipedia.readthedocs.io/en/latest/code.html#api
# scrape wikipedia information of keywords

import os
from py2neo import Graph
import wikipedia

import json
import codecs


backend_directory = os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", ".."))
OUTPUT_DATA = os.path.abspath(os.path.join(
    backend_directory, "course_studyprogram_recommend", "entities_and_relationships"))


class WikipediaFilter(object):
    def __init__(self):
        super(WikipediaFilter, self).__init__()
        self.graph = Graph('http://localhost:7474/', auth=("neo4j", "1234"))
        self.keyword_list = []
        self.category_infos = []
        self.link_infos = []
        self.filtered_keywords = []
        self.title_list = []
    
    def access_keywords(self):
        nodes = self.graph.nodes
        keyword_nodes = nodes.match("keyword")      
        for node in keyword_nodes:
            self.keyword_list.append(node["name"])  
        print('{} keyword nodes got from Neo4j'.format(
            len(self.keyword_list)))  

    def wikiScraper(self):
        i = 0
        for key in self.keyword_list:  
            category_entry = {}
            link_entry = {}
            try:
                category_entry['name'] = key
                category_entry['WikipediaPage'] = str(wikipedia.page(key))
                category_entry['title'] = str(wikipedia.page(key)).split("\'")[1]
                category_entry['abstract'] = wikipedia.summary(key)
                category_entry['category_amount'] = len(wikipedia.page(key).categories)
                category_entry['categories'] = wikipedia.page(key).categories   

                link_entry['name'] = key
                link_entry['text'] = wikipedia.page(key).content  
                link_entry['links'] = wikipedia.page(key).links  
                i = i+1

                self.filtered_keywords.append(key)
                self.category_infos.append(category_entry)
                self.title_list.append(category_entry['title'])
                self.link_infos.append(link_entry)

            except Exception as e:
                print(e)

        print("get {} keyword text from wikipedia".format(i))

    def export_data(self, data, path):
        print("export data..")
        if isinstance(data[0], str):
            data = sorted([d.strip("...") for d in set(data)])
        with codecs.open(OUTPUT_DATA+path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
    
    def run(self):
        self.access_keywords()
        self.wikiScraper()

        self.export_data(self.category_infos, '/wiki_entry_categories_summary.json')
        self.export_data(self.link_infos, '/wiki_entry_links_text.json')
        self.export_data(self.filtered_keywords, '/wiki_filterd_keywords.json')
        self.export_data(self.title_list, '/wiki_titleOf_keywords.json')


if __name__ == '__main__':
    wikiScraper = WikipediaFilter()
    wikiScraper.run()
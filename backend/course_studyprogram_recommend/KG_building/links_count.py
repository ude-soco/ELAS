# this module's function is to count the number of occurrences of lins in one wiki page
# to filter most relevant links


import codecs
import json
import os
import nltk


backend_directory = os.path.abspath(os.path.join(
    os.path.dirname(__file__), "..", ".."))
OUTPUT_DATA = os.path.abspath(os.path.join(
    backend_directory, "course_studyprogram_recommend", "entities_and_relationships"))
WIKI_DATA = os.path.abspath(os.path.join(
    backend_directory, "course_studyprogram_recommend", "entities_and_relationships", "wiki_entry_links_text.json"))
# print(backend_directory)
# print(WIKI_DATA)


def fail(sub_string):
    ans = [0] * (len(sub_string) + 1)
    for i in range(1, len(sub_string)):
        j = ans[i]
        while j > 0 and sub_string[i] != sub_string[j]:
            j = ans[j]
        if sub_string[i] == sub_string[j]:
            ans[i + 1] = j + 1
        else:
            ans[i + 1] = 0
    return ans


def count_substring(string, sub_string):
    next = fail(sub_string)
    cnt = 0
    start = 0
    length = len(string) - len(sub_string)
    i = 0
    while i <= length:
        while start < len(sub_string) and string[i + start] == sub_string[start]:
            start = start + 1
        if start == len(sub_string):
            cnt = cnt + 1
        i = i + start - next[start]
        if next[start] == 0:
            i = i + 1
        start = next[start]
    return cnt



def export_data(data, path):
    print("export data..")
    if isinstance(data[0], str):
        data = sorted([d.strip("...") for d in set(data)])
    with codecs.open(OUTPUT_DATA+path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)



if __name__ == "__main__":
    with open(WIKI_DATA, 'r', encoding="utf8") as f:
        wiki_text = json.load(f)
        #entry = wiki_text[4]
        All_page_links_count = []

        for entry in wiki_text:
            links_count = []
            page_links_count = {}
            if 'name' in entry:
                page_links_count['name'] = entry['name']
                # print(entry['text'][:200])
                sentences_list = nltk.sent_tokenize(entry['text'])  # divide sentence
                # print(sentences_list)
                links_list = entry['links']
                # print(len(links_list))

                for link in links_list:
                    count = 0
                    for sentence in sentences_list:
                        count = count + count_substring(sentence, link)
                    if(count > 0):
                        links_count.append((count, link))

                sorted_links_count = sorted(links_count, reverse=True)
                if(len(sorted_links_count) >= 10):
                    page_links_count['links'] = sorted_links_count[:10]
                else:
                    page_links_count['links'] = sorted_links_count
                All_page_links_count.append(page_links_count)

        export_data(All_page_links_count, '/sorted_links_count.json')
        

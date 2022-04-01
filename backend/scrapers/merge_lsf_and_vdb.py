import io
import json
from difflib import SequenceMatcher
from pprint import pprint
from Keyword_Extractor.statistics_based import yake
from Keyword_Extractor.graph_based.singlerank import SingleRank
import re

lsf_data_directory = '.\\lsf_scraper\\lsf_scraper\\Data\\post_processed_lectures.json'
vdb_data_directory = '.\\vdb_scraper\\vdb_scraper\\Data\\post_processed_descriptions.json'
merged_data_directory = '.\\merged_data.json'

def clear_merged_data_directory():
    open(merged_data_directory, 'w').close()

def similar(name1, nameList):
    ratio = 0
    result = ''
    for name in nameList:
        if SequenceMatcher(None, name1, name).ratio() > ratio:
            ratio = SequenceMatcher(None, name1, name).ratio()
            result = name
    if ratio > 0.60:
        return (result, ratio)
    else:
        return (None, None)

def yake_keywords(lecture_description):
    max_ngram_size = 2
    num = 15
    custom_kwextractor = yake.KeywordExtractor(
        lan="en",
        n=max_ngram_size,
        dedupLim=0.9,
        dedupFunc='seqm',
        windowsSize=1,
        top=num,
        features=None,
        additional_stopwords=['description', 'literature', 'aufl', 'aufl.', 'auflage', 'und', 'learning', 'targets',
                              'pre-qualifications', 'info', 'link', 'notice', 'springer', 'berlin']
    )
    reg = '(Description:)(.*?)(Learning Targets:)(.*?)(Literature:)(.*?)(Pre-Qualifications:)(.*?)(Info Link:)(.*?)(Notice:)'
    matches = re.findall(reg, lecture_description, re.DOTALL)
    processed_lecture_description = lecture_description
    keyphrases = []
    if len(matches) > 0 and len((matches[0][1] + matches[0][3]).strip()) > 0:
        processed_lecture_description = ' '.join([matches[0][1], matches[0][3]])
    try:
        if len(lecture_description.strip()) > 0:
            keyphrases = custom_kwextractor.extract_keywords(processed_lecture_description)
    except Exception as e:
        print(str(e))
    lecture_keywords = []
    if len(keyphrases) > 0:
        lecture_keywords = [{
            "text": keyphrase_weight[0],
            "value": keyphrase_weight[1]
        } for keyphrase_weight in keyphrases]

    return lecture_keywords

def singlerank_keywords(lecture_description):
    num = 15
    pos = {'NOUN', 'PROPN', 'ADJ'}
    extractor = SingleRank()
    extractor.load_document(input=lecture_description, language='en_core_web_sm')
    extractor.candidate_selection(pos=pos)
    extractor.candidate_weighting(window=10, pos=pos)
    keyphrases = extractor.get_n_best(n=num)
    lecture_keywords = [{
        "text": keyphrase_weight[0],
        "value": keyphrase_weight[1]
    } for keyphrase_weight in keyphrases]
    return lecture_keywords

def get_keywords(lecture_description):
    keywords = []
    if len(lecture["description"]) == 0:
        return keywords

    reg = '(Description:)(.*?)(Learning Targets:)(.*?)(Literature:)(.*?)(Pre-Qualifications:)(.*?)(Info Link:)(.*?)(Notice:)'
    matches = re.findall(reg, lecture_description, re.DOTALL)
    processed_lecture_description = lecture_description

    if len(matches) > 0 and len((matches[0][1] + matches[0][3]).strip()) > 0:
        processed_lecture_description = ' '.join([matches[0][1], matches[0][3]])

    keyphrases = []
    try:
        if len(lecture_description.strip()) <= 280:
            print("using yake")
            keywords = yake_keywords(processed_lecture_description)
        else:
            print("using single rank")
            keywords = singlerank_keywords(processed_lecture_description)
    except Exception as e:
        print(str(e))

    return keywords

with io.open(vdb_data_directory, encoding='UTF8') as vdb_data, io.open(lsf_data_directory, encoding='UTF8') as lsf_data, io.open(merged_data_directory, 'w', encoding='UTF8') as output_file:
    vdb_json = json.load(vdb_data)
    lsf_json = json.load(lsf_data)

    print(len(vdb_json))
    print(len(lsf_json))
    matches = 0
    somewhat_same = 0
    similarity_too_low = 0

    lecture_name_list = list(vdb_json.keys()) # list of names of lectures in the Vorlesungsdatenbank data (descriptions)
    distant_matches = []
    zero, less, more = 0,0,0

    for lecture in lsf_json:
        subject = lecture['name']
        # if 'zu' in subject:
        #     subject = ' '.join(subject.split(' ')[2:]).replace('"', '')
        if subject in vdb_json.keys(): # checking if the subject from the lsf_data is in the keys of the vdb dictionary
            matches = matches + 1
            lecture['description'] = vdb_json[subject]['description']['en'] # en because only English description is relevant for us
            # print('exact match:\t{}\t---->\t{}'.format(subject, lsf_value['name']))
        else:
            result = similar(subject, lecture_name_list)
            closest_match, ratio = result[0], result[1]
            if not closest_match:
                similarity_too_low = similarity_too_low + 1
                print('no match for:\t{}'.format(subject))
            else:
                somewhat_same = somewhat_same + 1
                distant_matches.append({
                    "original": subject,
                    "closest_match": closest_match,
                    "ratio": ratio
                })
                lecture['description'] = vdb_json[closest_match]['description']['en'] # if it's a close enough match, then merge the descriptions anyway (English ones)

        lecture["keywords"] = get_keywords(lecture_description=lecture["description"])

    print(zero, less, more)
    # print(len(distant_matches))
    # pprint(distant_matches)
    print('exact matches: {}, somewhat same: {}, no close enough match: {}'.format(matches, somewhat_same, similarity_too_low))

    json.dump(lsf_json, output_file, ensure_ascii=False)
    output_file.close()
    vdb_data.close()
    lsf_data.close()
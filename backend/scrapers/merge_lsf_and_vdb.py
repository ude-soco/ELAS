import io
import json
from difflib import SequenceMatcher
from Keyword_Extractor.statistics_based import yake
from Keyword_Extractor.graph_based.singlerank import SingleRank
import re
import os

lsf_data_directory = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "lsf_scraper", "lsf_scraper", "Data", "post_processed_lectures.json"))
vdb_data_directory = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "vdb_scraper", "vdb_scraper", "Data", "post_processed_descriptions.json"))
merged_data_directory = os.path.abspath(os.path.join(os.path.dirname(__file__), "merged_data.json"))


class MergeData:
    def clear_merged_data_directory(self):
        open(merged_data_directory, 'w').close()

    def similar(self, lecture_name, nameList):
        ratio = 0
        result = ''
        for name in nameList:
            if SequenceMatcher(None, lecture_name, name).ratio() > ratio:
                ratio = SequenceMatcher(None, lecture_name, name).ratio()
                result = name
        if ratio > 0.60:
            return (result, ratio)
        else:
            return (None, None)

    # function to reverse the weights of the keywords extracted by YAKE
    # In YAKE, the keyphrase with the lowest weight is the most important, but in the word cloud on the frontend,
    # the largest (most important) keyword needs the biggest weight. So we reverse the weights, but not the keywords
    def reverse_yake_weights(self, keyword_weights):
        weights = [weight for keyword, weight in keyword_weights]
        reverse_weights = weights[::-1]
        reverse_keyphrase_weights = []

        for i in range(len(keyword_weights)):
            reverse_keyphrase_weights.append({
                "text": keyword_weights[i][0],
                "value": reverse_weights[i]
            })

        return reverse_keyphrase_weights

    def yake_keywords(self, lecture_description):
        max_ngram_size = 2
        num = 15
        custom_kwextractor = yake.KeywordExtractor(
            lan="en",
            n=max_ngram_size,
            top=num,
            additional_stopwords=['description', 'literature', 'aufl', 'aufl.', 'auflage', 'und', 'learning', 'targets',
                                  'pre-qualifications', 'info', 'link', 'notice', 'springer', 'berlin']
        )
        keyphrases = []
        try:
            if len(lecture_description.strip()) > 0:
                keyphrases = custom_kwextractor.extract_keywords(lecture_description)
        except Exception as e:
            print(str(e))

        lecture_keywords = []
        if len(keyphrases) > 0:
            lecture_keywords = self.reverse_yake_weights(keyphrases)

        return lecture_keywords

    def singlerank_keywords(self, lecture_description):
        num = 15
        pos = {'NOUN', 'PROPN', 'ADJ'}
        window = 10
        extractor = SingleRank()
        extractor.load_document(input=lecture_description, language='en_core_web_sm')
        extractor.candidate_selection(pos=pos)
        extractor.candidate_weighting(window=window, pos=pos)
        keyphrases = extractor.get_n_best(n=num)
        lecture_keywords = [{
            "text": keyphrase_weight[0],
            "value": keyphrase_weight[1]
        } for keyphrase_weight in keyphrases]
        return lecture_keywords

    def get_keywords(self, lecture_description, lecture_name):
        keywords = []
        if len(lecture_description) == 0:
            return keywords

        reg = '(Description:)(.*?)(Learning Targets:)(.*?)(Literature:)(.*?)(Pre-Qualifications:)(.*?)(Info Link:)(.*?)(Notice:)'
        matches = re.findall(reg, lecture_description, re.DOTALL)
        processed_lecture_description = lecture_description

        if len(matches) > 0 and len((matches[0][1] + matches[0][3]).strip()) > 0:
            processed_lecture_description = ' '.join([matches[0][1], matches[0][3]])

        try:
            if len(lecture_description.strip()) <= 280:
                print("using yake for {}".format(lecture_name))
                keywords = self.yake_keywords(processed_lecture_description)
            else:
                print("using single rank for {}".format(lecture_name))
                keywords = self.singlerank_keywords(processed_lecture_description)
        except Exception as e:
            print(str(e))

        return keywords

    def run(self):
        with io.open(vdb_data_directory, encoding='UTF8') as vdb_data, io.open(lsf_data_directory,
                                                                               encoding='UTF8') as lsf_data, io.open(
                merged_data_directory, 'w', encoding='UTF8') as output_file:
            vdb_json = json.load(vdb_data)
            lsf_json = json.load(lsf_data)

            print("{} post processed descriptions".format(len(vdb_json)))
            print("{} post processed lectures".format(len(lsf_json)))
            matches = 0
            somewhat_same = 0
            similarity_too_low = 0

            lecture_name_list = list(
                vdb_json.keys())  # list of names of lectures in the Vorlesungsdatenbank data (descriptions)
            distant_matches = []

            for lecture in lsf_json:
                subject = lecture['name']
                # if 'zu' in subject:
                #     subject = ' '.join(subject.split(' ')[2:]).replace('"', '')
                if subject in vdb_json.keys():  # checking if the subject from the lsf_data is in the keys of the vdb dictionary
                    matches = matches + 1
                    lecture['description'] = vdb_json[subject]['description'][
                        'en']  # en because only English description is relevant for us
                else:
                    result = self.similar(subject, lecture_name_list)
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
                        lecture['description'] = vdb_json[closest_match]['description'][
                            'en']  # if it's a close enough match, then merge the descriptions anyway (English ones)

                lecture["keywords"] = self.get_keywords(lecture_description=lecture["description"],
                                                        lecture_name=lecture["name"])

            print('exact matches: {}, somewhat same: {}, no close enough match: {}'.format(matches, somewhat_same,
                                                                                           similarity_too_low))

            json.dump(lsf_json, output_file, ensure_ascii=False)
            output_file.close()
            vdb_data.close()
            lsf_data.close()

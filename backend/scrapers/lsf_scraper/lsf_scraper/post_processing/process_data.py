import io
import json
import os

backend_directory = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", ".."))

LECTURE_DATA = os.path.abspath(os.path.join(backend_directory, "scrapers", "lsf_scraper", "lecture_results.json"))
OUTPUT_FILE = os.path.abspath(
    os.path.join(backend_directory, "scrapers", "lsf_scraper", "lsf_scraper", "Data", "post_processed_lectures.json"))
STUDY_PROGRAMS_FILE = os.path.abspath(os.path.join(backend_directory, "scrapers", "study_programs.json"))


class ProcessLsfData:
    def clear_output_directories(self):  # clean the destination directory before filling it with new data
        open(OUTPUT_FILE, 'w').close()
        open(STUDY_PROGRAMS_FILE, 'w').close()

    def merge_lectures_with_same_id(self, subjects_list) -> dict:
        seen_subjects_dict = {}
        for entry in subjects_list:
            if entry['id'] in seen_subjects_dict.keys():
                seen_subjects_dict[entry['id']]['parent_id'].append(entry['parent_id'])
                if entry['root_id'] not in seen_subjects_dict[entry['id']]['root_id']:
                    seen_subjects_dict[entry['id']]['root_id'].append(entry['root_id'])
            else:
                seen_subjects_dict[entry['id']] = entry
                seen_subjects_dict[entry['id']]['parent_id'] = [entry['parent_id']]
                seen_subjects_dict[entry['id']]['root_id'] = [entry['root_id']]

        return seen_subjects_dict

    def process_timetable_of_subject(self, subject):
        processed_timetable = []
        for entry in subject['timetable']['entries']:
            times = entry['time'].split('\xa0bis\xa0')
            if len(times) == 2:
                time = {
                    'from': times[0].replace('\xa0', ''),
                    'to': times[1].replace('\xa0', ''),
                }
                entry['time'] = time

            durations = entry['duration'].split('\xa0bis\xa0')
            if len(durations) == 2:
                duration = {
                    'from': durations[0].replace('\xa0', ''),
                    'to': durations[1].replace('\xa0', '')
                }
                entry['duration'] = duration

            processed_timetable.append(entry)

        subject['timetable'] = processed_timetable
        return subject

    def create_list_from_lecture_dict(self, lectures_dict):
        lecture_list = []
        for key, value in lectures_dict.items():
            lecture_list.append(value)
        return lecture_list

    def merge_einzeltermine_with_same_subject_id(self, einzeltermine_list) -> dict:
        einzeltermine_dict = {}
        for einzeltermin in einzeltermine_list:
            if einzeltermin["subject_id"] in einzeltermine_dict.keys():
                einzeltermine_dict[einzeltermin['subject_id']][einzeltermin['termin_id']] = einzeltermin
            else:
                einzeltermine_dict[einzeltermin["subject_id"]] = {einzeltermin['termin_id']: einzeltermin}

        return einzeltermine_dict

    def assign_einzeltermine_to_correct_lecture(self, lecture, einzeltermin) -> dict:
        if len(einzeltermin) == 0:
            return lecture
        lecture_id = lecture['id']
        timetable_entries = lecture['timetable']
        for i in range(len(timetable_entries)):
            individual_dates = einzeltermin[timetable_entries[i]['id']]
            timetable_entries[i]['dates'] = individual_dates['einzeltermine']
        lecture['timetable'] = timetable_entries
        return lecture

    def run(self):
        self.clear_output_directories()
        with io.open(LECTURE_DATA, encoding='utf8') as json_file:
            data = json.load(json_file)  # load raw scraped data
            subjects_dict = {}
            categories_dict = {}
            subjects_list = []
            einzeltermine_list = []
            studyprogram_list = []

            for entry in data:
                if 'subject_type' in entry.keys():
                    subjects_list.append(entry)  # storing all lectures
                elif 'type' in entry.keys():
                    einzeltermine_list.append(entry)  # storing all einzeltermine
                elif 'catalog' in entry.keys():
                    studyprogram_list.append(entry)

            merged_lectures = self.merge_lectures_with_same_id(
                subjects_list)  # dictionary containing no duplicate lectures
            einzeltermine_dict = self.merge_einzeltermine_with_same_subject_id(
                einzeltermine_list)  # dictionary containing einzeltermine

            # print(merged_lectures)
            for key, value in merged_lectures.items():
                merged_lectures[key] = self.process_timetable_of_subject(value)  # process timetables of each lecture
                if key in einzeltermine_dict.keys():
                    merged_lectures[key] = self.assign_einzeltermine_to_correct_lecture(value, einzeltermine_dict[key])
            # print(merged_lectures)
            print("{} lectures after merging duplicates".format(len(merged_lectures)))
            print("{} study programs found".format(len(studyprogram_list)))

            final_merged_lectures_and_categories = []

            for key, value in merged_lectures.items():
                final_merged_lectures_and_categories.append(value)

            with io.open(OUTPUT_FILE, 'w', encoding='UTF8') as output_file:
                json.dump(final_merged_lectures_and_categories, output_file, ensure_ascii=False)
                output_file.close()

            with io.open(STUDY_PROGRAMS_FILE, 'w', encoding='UTF8') as output_file:
                json.dump(studyprogram_list, output_file, ensure_ascii=False)
                output_file.close()

            json_file.close()

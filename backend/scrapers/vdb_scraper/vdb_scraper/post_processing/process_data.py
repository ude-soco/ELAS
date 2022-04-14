import io
import json
import os

backend_directory = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", ".."))

VDB_DATA_DIRECTORY = os.path.abspath(
    os.path.join(backend_directory, "scrapers", "vdb_scraper", "description_results.json"))
VDB_DESTINATION_DIRECTORY = os.path.abspath(
    os.path.join(backend_directory, "scrapers", "vdb_scraper", "vdb_scraper", "Data",
                 "post_processed_descriptions.json"))


class ProcessVdbData:
    def clear_post_processed_directory(self):  # clean the destination directory before filling it with new data
        open(VDB_DESTINATION_DIRECTORY, 'w').close()

    def run(self):
        self.clear_post_processed_directory()

        with io.open(VDB_DATA_DIRECTORY, encoding='utf8') as json_file:
            data = json.load(json_file)
            lectures_dict = {}

            print("{} raw description data".format(len(data)))
            for entry in data:
                if entry['name'] in lectures_dict.keys():
                    print('duplicate found {} originally in {}, also in {}'.format(entry['id'],
                                                                                   entry['parent_course']['name'],
                                                                                   lectures_dict[entry['name']].get(
                                                                                       'parent_course').get('name')))
                else:
                    lectures_dict[entry['name']] = entry

            print("{} data left after processing raw description data".format(len(lectures_dict)))

            with io.open(VDB_DESTINATION_DIRECTORY, 'w', encoding='UTF8') as output_file:
                json.dump(lectures_dict, output_file, ensure_ascii=False)
                output_file.close()

            json_file.close()

import os
import re
import math
import yaml
import json
import pprint
import subprocess
from datetime import datetime
from difflib import SequenceMatcher
from scrapers.merge_lsf_and_vdb import MergeData
from orm_interface.upload_orm_data import Uploader
from scrapers.lsf_scraper.lsf_scraper.post_processing.process_data import ProcessLsfData
from scrapers.vdb_scraper.vdb_scraper.post_processing.process_data import ProcessVdbData

pp = pprint.PrettyPrinter(indent=4)

def clean_files(file_directories): # clears existing data in a file and creates it if it doesn't exist
    for file in file_directories:
        open(file, 'w').close()

def run(config, insight_url, e3_url):
    backend_directory = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

    lsf_data = os.path.abspath(os.path.join(backend_directory, config['scraped_lsf_data_directory']))
    lsf_data_post_processed = os.path.abspath(os.path.join(backend_directory, config['post_processed_lsf_data_directory']))
    vdb_data = os.path.abspath(os.path.join(backend_directory, config['scraped_vdb_data_directory']))
    vdb_data_post_processed = os.path.abspath(os.path.join(backend_directory, config['post_processed_vdb_data_directory']))
    study_programs_json = os.path.abspath(os.path.join(backend_directory, "scrapers", "study_programs.json"))

    merged_data_directory = os.path.abspath(os.path.join(backend_directory, config['merged_data_directory']))

    clean_files([lsf_data, lsf_data_post_processed, vdb_data, vdb_data_post_processed, merged_data_directory, study_programs_json])

    lsf_scraper_directory = os.path.abspath(os.path.join(backend_directory, config['lsf_scraper_directory']))
    vdb_scraper_directory = os.path.abspath(os.path.join(backend_directory, config['vdb_scraper_directory']))

    # 1. run both scrapers: lsf_scraper for LSF data and vdb_scraper for Vorlesungsdatenbank data
    os.chdir(lsf_scraper_directory)
    subprocess.call(f"scrapy crawl main -a url=\"{insight_url}\" -o lecture_results.json", shell=True)

    os.chdir(vdb_scraper_directory)
    subprocess.call(f"scrapy crawl vdb-scraper -o description_results.json", shell=True)

    # 2. process both sets of data
    LsfDataProcessing = ProcessLsfData()
    LsfDataProcessing.run()

    VdbDataProcessing = ProcessVdbData()
    VdbDataProcessing.run()

    # 3. merge both sets of data
    merge_script = MergeData()
    merge_script.run()

    # 4. upload all the data to the database
    uploader = Uploader()
    uploader.upload_data()

    # 5. define temp files for e3 courses and ratings files
    temp_e3 = os.path.abspath(os.path.join(backend_directory, config['temp_e3_directory']))
    temp_ratings_raw = os.path.abspath(os.path.join(backend_directory, config['temp_ratings_raw']))
    temp_ratings = os.path.abspath(os.path.join(backend_directory, config['temp_ratings']))

    course_scraper_directory = os.path.abspath(os.path.join(backend_directory, config["courseScraper"]))
    ratings_scraper_directory = os.path.abspath(os.path.join(backend_directory, config["ratingsScraper"]))

    clean_files([temp_e3, temp_ratings_raw, temp_ratings])

    # 6. run both scrapers: course-catalog for e3 and course-ratings
    os.chdir(course_scraper_directory)
    subprocess.call(f'scrapy crawl course-catalog -a url="{e3_url}" -a e3=True -o temp_e3.json', shell=True)

    os.chdir(ratings_scraper_directory)
    subprocess.call(f"scrapy crawl -a email=\"{config['ratingsEmail']}\" -a password=\"{config['ratingsPassword']}\" course-ratings -o temp_ratings_raw.json", shell=True)

    # 7. post-process and save the ratings data
    os.chdir(os.path.join(ratings_scraper_directory, "course_ratings", "post_processing"))
    subprocess.call(f"python derive_attributes.py {temp_ratings_raw} {temp_ratings}", shell=True)

    # 8. load the data from the temp files
    with open(temp_e3, encoding='utf-8') as file:
        e3_courses = json.load(file)

    with open(temp_ratings, encoding='utf-8') as file:
        ratings = json.load(file)

    # 9. process e3 data & ratings, write to target files
    e3_processed, avg_ratings = process_e3(e3_courses, ratings)

    e3_target_file = os.path.abspath(os.path.join(backend_directory, config["e3TargetFile"]))
    with open(e3_target_file, "w") as file:
        file.write(json.dumps(e3_processed))

    e3_ratings_file = os.path.abspath(os.path.join(backend_directory, config["e3RatingsFile"]))
    with open(e3_ratings_file, "w") as file:
        file.write(json.dumps(avg_ratings))

    # 10. remove temp files
    os.remove(temp_e3)
    os.remove(temp_ratings)
    os.remove(temp_ratings_raw)

    clean_files([lsf_data, lsf_data_post_processed, vdb_data, vdb_data_post_processed, merged_data_directory, study_programs_json])

    # 11. update statusMessage in config
    config["statusMessage"] = datetime.now().strftime("%Y-%m-%d %H:%M")
    with open(os.path.join(os.path.dirname(__file__), "config.yaml"), "w") as file:
        file.write(yaml.dump(config))


def process_e3(courses, ratings):
    processed_courses = []

    # Keeps track of number of ratings & sum total of rates
    avg_ratings = {
        "fairness": 0,
        "support": 0,
        "material": 0,
        "fun": 0,
        "comprehensibility": 0,
        "interesting": 0,
        "grade_effort": 0
    }
    ratings_count = 0

    for course in courses:
        # check for duplicates
        if course["url"] in [c["Link"] for c in processed_courses]:
            continue

        # Rename the dict keys and populate with processed data
        processed_course = {
            "selected": False,
            "Title": course["name"],
            "Link": course["url"],
            "catalog": course["parent_id"],
            "Type": course["subject_type"],
            "SWS": course["sws"] if course["sws"] != " " else "",
            "Erwartete Teilnehmer": course["expected"],
            "Max. Teilnehmer": course["max"],
            "Credits": clean_credits(course["credits"]),
            "Language": course["language"],
            "Description": clean_description(course["description"]),
            "Times_manual": convert_timetable(course["timetable"]),
            "Location": get_locations(course["timetable"]),
            "Exam": get_exams(course["exam"]),
            "Ausgeschlossen_Ingenieurwissenschaften_Bachelor": get_excluded(course["excluded"])
        }

        # integrate the ratings, if they exist
        course_ratings = find_ratings(ratings, course["name"])
        if course_ratings:
            # update the ratings tracker
            ratings_count += 1
            for key, item in avg_ratings.items():
                avg_ratings[key] += course_ratings[key]

            # processed_course = processed_course | course_ratings
            processed_course = {**processed_course, **course_ratings}

        else:
            processed_course = {**processed_course, **{
                "fairness": "",
                "support": "",
                "material": "",
                "fun": "",
                "comprehensibility": "",
                "interesting": "",
                "grade_effort": ""
            }}

        # append the processed course to the list
        processed_courses.append(processed_course)
        pp.pprint(processed_course)

    # calculate the average rating
    for key, item in avg_ratings.items():
        avg_ratings[key] = item / ratings_count

    return processed_courses, avg_ratings


def find_ratings(ratings, title):
    for rating in ratings:
        # courses are not named the same on meinprof.de as in the LSF
        similarity = SequenceMatcher(None, title, rating["name"]).ratio()
        if similarity > 0.65:
            return {
                "fairness": rating["fairness"] / 100 if rating["fairness"] else 0,
                "support": rating["support"] / 100 if rating["support"] else 0,
                "material": rating["material"] / 100 if rating["material"] else 0,
                "fun": rating["fun"] / 100 if rating["fun"] else 0,
                "comprehensibility": rating["understandability"] / 100 if rating["understandability"] else 0,
                "interesting": rating["interest"] / 100 if rating["interest"] else 0,
                "grade_effort": rating["node_effort"] / 100 if rating["node_effort"] else 0
            }
    return None


def clean_credits(credits):
    if len(credits) < 1:
        return "0"

    partials = credits.split("-")
    if len(partials) == 1:
        return partials[0]

    try:
        if int(partials[0]) == int(partials[1]):
            return str(partials[0])
    except Exception:
        return "0"

    return credits


def clean_description(text):
    text = re.sub(r"Inhalte:[\s\\r\\n]+", "", text)
    return text


def convert_timetable(timetable):
    flattime = set()
    for dates in timetable:
        try:
            dates["day"] = dates["day"].replace(u'\xa0', ' ').strip()
            dates["time"] = dates["time"].replace(u'\xa0', ' ').strip()
            start = math.floor(int(dates["time"][:2])/2.)*2
            flattime.add(dates["day"][:2] + str(start) + "-" + str(start + 2))
        except ValueError:
            continue
    return ";".join(flattime)


def get_locations(timetable):
    locations = set()

    for date in timetable:
        loc = date["comment"]

        if "Dortmund" in loc:
            locations.add("Dortmund")
        elif "online" in loc:
            locations.add("online")
        elif any(word in loc for word in ["Ruhr", "Bochum", "HNC", "RUB"]):
            locations.add("Bochum")
        elif "Essen" in loc or loc.startswith("E ") or (len(loc.split(": ")) > 1 and loc.split(": ")[1].startswith("E ")):
            locations.add("Essen")
        elif "Duisburg" in loc or loc.startswith("D ") or (len(loc.split(": ")) > 1 and loc.split(": ")[1].startswith("D ")):
            locations.add("Duisburg")
        elif "E-Learning" in date["elearn"]:
            locations.add("online")

    if not len(locations):
        return "unknown"
    else:
        return ";".join(locations)


def get_exams(text):
    markers = {
        "Präsentation": [
            "referat", "präsentation", "presentation"
        ],
        "Mündliche Prüfung": [
            "mündlich", "oral"
        ],
        "Klausur": [
            "schriftlich", "klausur", "exam", "e-klausur", "präsenz", "written"
        ],
        "Essay": [
            "seitig", "page", "besprechung", "essay", "hausarbeit", "ausarbeitung", "seiten", "hausaufgabe", "dokumentation", "documentation", "protokoll",
            "zeichen", "character", "tagebuch", "diary", "assignment", "portfolio"
        ]
    }

    weight = {
        "Präsentation": 0,
        "Mündliche Prüfung": 0,
        "Klausur": 0,
        "Essay": 0
    }

    text = text.lower()

    for key, item in markers.items():
        for marker in item:
            weight[key] += text.count(marker)

    if sum(weight.values()) == 0:
        return "unknown"

    return max(weight, key=lambda k: weight[k])


def get_excluded(text):
    shorthand = {
        "BauIng": "Bauingenieurwesen",
        "Komedia": "Komedia",
        "ISE": "ISE",
        "Maschinenbau": "Maschinenbau",
        "EIT": "Elektrotechnik und Informationstechnik",
        "Medizintechnik": "Medizintechnik",
        "NanoEng": "Nano Engineering",
        "Wi-Ing": "Wirtschaftsingenieurwesen",
        "Angewandte Informatik": "Angewandte Informatik",
        "Ang. Inf.": "Angewandte Informatik"
    }

    overrides = {
        "IngWi": "ALLE",
        "Alle außer BauIng (1. FS)": "ALLE (außer Bauingenieurwesen (1. FS))",
        "IngWi (außer BauIng)": "ALLE (außer Bauingenieurwesen)"
    }

    text = re.sub(r"\(IngWi\)", "IngBRACESWi", text)
    text = re.sub(r"\(IngWi & WiWi\)", "IngBRACESWiWi", text)
    text = re.sub(r"[^0-9a-zA-Z,.-]+", " ", text)

    for key, item in overrides.items():
        if key in text:
            return item

    excluded = []

    for key, item in shorthand.items():
        if key in text:
            excluded.append(item)

    return ";".join(excluded) if len(excluded) else "-"

if __name__ == "__main__":
    with open("config.yaml", "r") as file:
        config = file.read()
    config = yaml.safe_load(config)

    run(config, "https://campus.uni-due.de/lsf/rds?state=wtree&search=1&trex=step&root120212=288350%7C292081%7C290850&P.vx=kurz",
        "https://campus.uni-due.de/lsf/rds?state=wtree&search=1&trex=step&root120211=280741%7C276221%7C276682&P.vx=kurz")

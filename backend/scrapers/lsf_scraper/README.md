# LSF-scraper

The LSF scraper is a part of the bachelor thesis "A Toolkit for the Aggregation and Extraction of University Course
Data". This thesis aims to extract data from LSF and lecture database websites at UDE and then combine the data. Keyword
extraction algorithms are applied to get keywords from a lecture's description to make a word cloud on the frontend.

With a tool like this, it is easier for students to visualize the contents of a lecture at a quick glance, and access
all of a lecture's information at one place.

This directory contains a web crawler written using [Scrapy](https://scrapy.org/). It extracts
all [INKO lectures](https://campus.uni-due.de/lsf/rds?state=wtree&search=1&trex=step&root120212=288350%7C292081%7C290850&P.vx=kurz)
, their details and timetables, and stores them in a JSON file. After finishing scraping, the raw data is processed:
duplicate lectures are removed, different timetable entries are merged into their lecture, and each lecture has its
information in a single entry in the JSON file.

The raw data can be found in `backend/scrapers/lsf_scraper/lecture_results.json`

The dataset created after post-processing can be found
in `backend/scrapers/lsf_scraper/lsf_scraper/Data/post_processed_lectures.json`

Note that the data stored in the JSON files is cleaned **before and after** the scraping. If you wish to explore the
results after each scraping, you must delete the `clean_files()` function call
in `backend/application/scraper/scrape_control.py` that occurs at the end of the scraping process.

## To scrape all engineering courses:

In the "default" state of the scraper, it scrapes only the courses under the INKO group of lectures using the following
link:https://campus.uni-due.de/lsf/rds?state=wtree&search=1&trex=step&root120212=288350%7C292081%7C290850&P.vx=kurz

To scrape **all** engineering faculties and study programs from the
link: https://campus.uni-due.de/lsf/rds?state=wtree&search=1&trex=step&root120212=288350%7C292081&P.vx=kurz, run the
following command in `backend/scrapers/lsf_scraper`:

`scrapy crawl main -a url="https://campus.uni-due.de/lsf/rds?state=wtree&search=1&trex=step&root120212=288350%7C292081&P.vx=kurz" -a all_engineering_faculties=True -o lecture_results.json`

The "all_engineering_faculties" flag must be set to "True" **and** it must be the starting URL.
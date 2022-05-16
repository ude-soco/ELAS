# VDB-scraper

The VDB scraper (Veranstaltungsdatenbank) is a part of the bachelor thesis "A Toolkit for the Aggregation and Extraction
of University Course Data". This thesis aims to extract data from LSF and lecture database websites at UDE and then
combine the data. Keyword extraction algorithms are applied to get keywords from a lecture's description to make a word
cloud on the frontend.

With a tool like this, it is easier for students to visualize the contents of a lecture at a quick glance, and access
all of a lecture's information at one place.

This directory contains a web crawler written using [Scrapy](https://scrapy.org/). It extracts all descriptions
of [INKO lectures](https://www.uni-due.de/vdb/en_EN/studiengang/liste) from the lecture database website of UDE. It
extracts their IDs names and descriptions, and stores them in a JSON file. After finishing scraping, the raw data is
processed:
duplicate lectures are removed, HTML formatting is removed from the lecture descriptions.

The raw data can be found in `backend/scrapers/vdb_scraper/description_results.json`

The dataset created after post-processing can be found
in `backend/scrapers/vdb_scraper/vdb_scraper/Data/post_processed_descriptions.json`

Note that the data stored in the JSON files is cleaned **before and after** the scraping. If you wish to explore the
results after each scraping, you must delete the `clean_files()` function call
in `backend/application/scraper/scrape_control.py` that occurs at the end of the scraping process.

## To scrape descriptions from all engineering study programs:

In the "default" state of the scraper, it scrapes only the courses under the INKO group of lectures using the following
link: https://www.uni-due.de/vdb/en_EN/studiengang/liste

To scrape **all** engineering faculties and study programs from the above link, run the following command
in `backend/scrapers/vdb_scraper`:

`scrapy crawl vdb-scraper -a all_engineering_studyprograms=True -o description_results.json`

The "all_engineering_studyprograms" flag must be set to "True" **and** it must be the right starting URL.
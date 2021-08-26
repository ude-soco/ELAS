# uni-due-course-catalog-scraper

This project is part of a [research project](https://github.com/FloRich/uni-due-visual-study-planer) course "Learning analytics and visual analytics" (SS19) at university duisburg-essen.

The main goal of the research project is to help students select courses for an upcoming semester by let them visually explore the structure of their studyprogram, see ratings of courses and their overlaps in time.

In this part, studyprograms with information about courses and subjects were scraped from university of duisburg-essen's 
[course catalog](https://campus.uni-due.de/lsf/rds?state=wtree&search=1&category=veranstaltung.browse&navigationPosition=lectures%2Clectureindex&breadcrumb=lectureindex&topitem=lectures&subitem=lectureindex)
for the faculty of engineering. Only data for semester WS 18/19 and SS19 were scraped.
After scraping the informations with [scrapy](https://scrapy.org/) from the catalog, courses and subjects from each semester were aggregated into one entity,
if they had the same title, and got additional information about the usage in other studyprograms as well.

The raw scraped data can be found under data/output.json.

The created dataset can be found under data/post_processed_studyprograms.json.
This file is used for the visuallization in the [research project](https://github.com/FloRich/uni-due-visual-study-planer).

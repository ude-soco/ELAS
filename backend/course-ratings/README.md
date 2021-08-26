# course-ratings
Crawler for ratings of courses from meinprof.de

This project is part of a research project course "Learning analytics and visual analytics" (SS19) at university duisburg-essen.

The main goal of the research project is to help students select courses for an upcoming semester by letting them visually explore the structure of their studyprogram, see ratings of courses and their overlaps in time.

In this part, ratings from [meinprof.de](https://www.meinprof.de) were scraped for courses that belong to university of duisburg-essen.

The raw scraped data can be found under data/ratings.json.

The created dataset can be found under data/post_processed_courses.json. It cointains normalized ratings and statistics about the ratings for each course. 
This file is used for the visual representation of ratings in the [research project](https://github.com/FloRich/uni-due-visual-study-planer).

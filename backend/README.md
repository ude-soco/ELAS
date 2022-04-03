<p align="center">
<a href="https://www.uni-due.de/soco/teaching/courses/lab-idea-ss21.php" target="_blank" rel="noopener noreferrer">
<img height="110px" src="../img/cover.png" alt="re-frame logo">
</a>
</p>

# ELAS - Backend

## Table of Contents

- [Project Info](#project-info)
- [Project structure](#project-structure)
- [Technologies](#technologies)
- [Additional applications](#Additional-applications)

## Project Info

This repository consists of the web server made with Flask for ELAS Lab Project. Each group will receive access to a
branch and should only work on project inside `resources` folder they are assigned to.

## Project structure

```
│   .gitignore
│   example.env                         # rename to .env
│   example.flaskenv                    # rename to .flaskenv
│   README.md
│   requirements.txt                    # necessary python libraries to install
│
├───application
│   │   extensions.py                   # initialization of libraries
│   │   main.py                         # application REST APIs
│   │   settings.py                     # global constants
│   │   __init__.py                     # application script file
│   │
│   └───resources                       # resources folder consists of all projects
│       │   __init__.py
│       │
│       ├───course_insights
│       │       course_insights.py      # Course Insights project REST APIs
│       │       __init__.py
│       │
│       ├───e3_selector
│       │       e3_selector.py          # E3 Selector project REST APIs
│       │       __init__.py
│       │
│       ├───intogen
│       │       intogen.py              # Intogen project REST APIs
│       │       __init__.py
│       │
│       └───spoa
│               spoa.py                 # SPOA project REST APIs
│               __init__.py
│
│───bin                                 # files containing, ratings, studyprograms data
│
│───course-ratings                      # Scrapy web crawler for scraping data from meinprof.de
│
│───Keyword_Extractor                   # Libraries and algorithms for extracting keywords from lecture descriptions
│
│───orm_interface                       # Package to be able to interact with a relational database through ORM
│       │   entities                    # package containing all data types to be stored in each table and their relationship with each other 
│       │   base.py                     # declarative base of the ORM schema
│       │   upload_orm_data.py          # main script to upload all scraped data to the database
│
│───scrapers                            # LSF and Vorlesungsdatenbank scrapers
│       ├───lsf_scraper                 # scraper to extract lecture data from LSF
│       │
│       ├───vdb_scraper                 # scraper to extract descriptions from Vorlesungsdatenbank
│       │
│       │   merge_lsf_and_vdb.py        # script that merges data from LSF and VDB and extracts keywords from each description
│
│───uni-due-course-catalog-scraper      # scraper that extracts E3 course data
│
├───static
└───templates
```

## How to use

1. Navigate to ELAS/backend directory.
2. Make sure you've installed the latest version of Postgres, along with pgAdmin. You can do this from https://www.postgresql.org/download/
3. Run `pip install requirments.txt`. This should install all requirements.
4. Set up a database with a name and a password.
5. Add this name and password to ELAS/backend/orm_interface/base.py
6. Start the frontend by running `npm start` in ELAS/frontend
7. After the frontend is running, run `flask run` in ELAS/backend

## Technologies

Project is created with:

- [Python](https://www.python.org/downloads/release/python-387/) (v3.8.7)
- [Flask](https://flask.palletsprojects.com/en/1.1.x/) (v1.1.2)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) (v4.4.4)

## Additional applications

- [Postman](https://www.postman.com/downloads/)
- [Visual Studio Code](https://code.visualstudio.com/download)
  or [Pycharm Professional](https://www.jetbrains.com/de-de/pycharm/download/#section=windows)
- Mongo Compass (check the box to install when installing MongoDB Community Server)

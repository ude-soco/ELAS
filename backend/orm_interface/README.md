# ORM interface

This ORM interface is a part of the bachelor thesis "A Toolkit for the Aggregation and Extraction of University Course
Data". This thesis aims to extract data from LSF and lecture database websites at UDE and then combine the data. Keyword
extraction algorithms are applied to get keywords from a lecture's description to make a word cloud on the frontend.

With a tool like this, it is easier for students to visualize the contents of a lecture at a quick glance, and access
all of a lecture's information at one place.

This directory contains an ORM created using [SQLAlchemy](https://www.sqlalchemy.org/). It makes a schema for a
relational database (in this case, we use [Postgres](https://www.postgresql.org/)), so that data can be queried from the
backend efficiently.

The `backend/orm_interface/entities` directory contains all tables and their relationships with each other as Python
classes.

`backend/base.py` contains the parameters needed for setting up an ORM. The parameters are loaded from `backend/.env'.
Note that you must **set the password** in the .env file before using the ORM.

In `backend/orm_interface/upload_orm_data.py` we iterate through the merged data found
in `backend/scrapers/merged_data.json` and upload it to our database.
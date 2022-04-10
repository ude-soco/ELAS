<p align="center">
<a href="https://www.uni-due.de/soco/teaching/courses/lab-idea-ss21.php" target="_blank" rel="noopener noreferrer">
<img height="110px" src="../img/cover.png" alt="re-frame logo">
</a>
</p>

## How to get started with ELAS - Backend

1. Navigate to ELAS/backend directory.
2. Make sure you've installed the [latest version (ver.14) of Postgres](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
3. Create a virtual environment `python -m venv venv`
4. Activate the virtual environment `.\venv\Scripts\activate`
5. Run `pip install requirements.txt`. This should install all requirements.
6. Set up a database with a name and a password
   1. Make a duplicate of `exmaple.env` and `example.flaskenv` file in the same directory and rename to `.env`
   2. Update the `.env` file with the password of your postgres database
7. After the frontend is running, run `python -m flask run --host=0.0.0.0` in ELAS/backend

## Technologies

Project is created with:

- [Python](https://www.python.org/downloads/release/python-387/) (v3.8.7)
- [Flask](https://flask.palletsprojects.com/en/1.1.x/) (v1.1.2)
- [PostgresSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) (v14)

## Additional applications

- [Postman](https://www.postman.com/downloads/)
- IDE of your choice
  - [Visual Studio Code](https://code.visualstudio.com/download)
  - [IntelliJ](https://www.jetbrains.com/de-de/idea/download/#section=windows)

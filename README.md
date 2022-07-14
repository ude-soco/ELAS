<p align="center">
<a href="https://www.uni-due.de/soco/research/projects/elas.php" target="_blank" rel="noopener noreferrer">
<img width=75% src="img/elas-logo.svg" alt="re-frame logo">
</a>
</p>
<br/>
The Interactive Data Exploration and Analytics (IDEA) lab course offered at the UDE Social Computing Group focuses on the effective integration of techniques from human-computer interaction (HCI), information visualization, and machine learning to help users interactively explore data.

<br/>

[Live Demo - Launch ELAS in your browser](https://elas-social-computing.herokuapp.com/)

## Student projects

- [E3Selector](https://github.com/ude-soco/ELAS/tree/main/frontend/src/components/Projects/E3Selector)
- [StudyCompass](https://github.com/ude-soco/ELAS/tree/main/frontend/src/components/Projects/StudyCompass)
- [Intogen](https://github.com/ude-soco/ELAS/tree/main/frontend/src/components/Projects/Intogen)

### 🚀 Get Started

1. Using Docker 🐳

    - Download and install [Docker](https://www.docker.com/products/docker-desktop)
      , [pgAdmin4](https://www.pgadmin.org/download/pgadmin-4-windows/), and [NodeJS](https://nodejs.org/en/)

    - Add your project folder `ELAS` in the file sharing settings of Docker as
      shown [here](img/docker-issue-windows.jpg)

    - Open a command prompt/terminal and move to the `ELAS\frontend` directory. Then type the following command:

      ```
      npm ci
      ```

    - Move back to `ELAS` directory and type the following command in the command prompt/terminal:

      ```
      docker-compose up --build
      ```

    - Follow the steps mentioned in the Scraping Tool section

<br/>

2. Manual Installation Guide 🔨

    - Backend installation

        - Download and install [Python 3.10.4](https://www.python.org/downloads/)
          and [PostgreSQL 14.2](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

        - Open a command prompt, move inside `backend` folder, and follow the steps below by typing the commands in your
          command prompt

            - Install a python virtual environment

              ```
              python -m venv venv
              ```

            - Activate the python virtual environment

              ```
              .\venv\Scripts\activate
              ```

            - Upgrade the pip version

              ```
              python -m pip install --upgrade pip
              ```

            - Install the required packages from the `requirements.txt` file

              ```
              pip install -r requirements.txt           # For Linux/MacOS
              pip install -r requirements-windows.txt   # For Windows
              ```

        - Rename the files `example.env` to `.env` and `example.flaskenv` to `.flaskenv` respectively

        - Open `.env` file, find `POSTGRES_PASS`, and type the password of your postgresql database between the single
          quotation mark

        - Type the following command in a command prompt to run server

          ```
          python -m flask run --host=0.0.0.0
          ```

    - Frontend installation

        - Download and install [NodeJS](https://nodejs.org/en/)

        - Move to `frontend` folder and rename the file `example.env` to `.env`

        - Open command prompt/terminal and follow the steps below:

            - Download and install node packages

              ```
              npm ci
              ```

            - Run the script and starts the application

              ```
              npm run dev
              ```

            - Stop the Frontend application by pressing `Cntl + c` inside the command prompt

            - Application will open automatically in browser at [localhost:3000](http://localhost:3000)

            - Read more about CSS framework [Material UI v4](https://v4.mui.com/getting-started/installation/)

## 🕸️ Scraping Tool

- In the ELAS web application homepage, click `Login` button and create a new account
- After successful login, click the circle button at the top right corner, open the menu, and click `Settings`
- Click on `SCRAPE COURSES` button
- Copy and paste the following address links in the respective text fields
    - Example link
      for [E3 courses SS22](https://campus.uni-due.de/lsf/rds?state=wtree&search=1&trex=step&root120221=303720%7C306477%7C306534&P.vx=kurz)
    - Example link
      for [Engineering courses SS22](https://campus.uni-due.de/lsf/rds?state=wtree&search=1&trex=step&root120221=303720%7C306861%7C305477&P.vx=kurz)
- Click the `SCRAPE NOW` button, wait for the scraping to finish (check progress in the webserver command prompt)
- Read more about [ORM interface](backend\orm_interface\README.md)

<p align="center">
<a href="https://www.uni-due.de/soco/teaching/courses/lab-idea-ss21.php" target="_blank" rel="noopener noreferrer">
<img height="100px" src="frontend/public/images/logos/cover.png" alt="re-frame logo">
</a>
</p>

# Exploratory Learning Analytics Toolkit for Students (ELAS)

The Interactive Data Exploration and Analytics (IDEA) lab course offered at the UDE Social Computing Group focuses on the effective integration of techniques from human-computer interaction (HCI), information visualization, and machine learning to help users interactively explore data.

The aim of this IDEA lab is to provide the foundation for an Exploratory Learning Analytics Toolkit for Students (ELAS) to support UDE students in their learning activities. In the previous iterations of the Learning Analytics (LA), Advanced Web Technologies (AdvWebTech), and Learning Analytics and Visual Analytics (LAVA) courses offered at the SoCo Group, different LA applications were developed as part of student projects. The task in IDEA lab will be to improve, adapt, and integrate selected applications into the ELAS platform.

## How to get started?

1. Using Docker

   - Download and install [Docker](https://www.docker.com/products/docker-desktop)
   - Open command prompt/terminal in the `ELAS` directory and type `docker-compose up --build`
   - Troubleshoot Docker file sharing issue
     - Add your project folder as shown [here](img/docker-issue-windows.jpg)

2. Manual installation
   - Backend installation
     - Download and install [Python](https://www.python.org/downloads/release/python-387/)
     - Download and install [MongoDB Community Server](https://www.mongodb.com/try/download/community)
     - Open command prompt/terminal, move to `backend` folder, and type the following commands
     ```sh
     $ python -m venv venv                   # Installs a python virtual environment
     $ .\venv\Scripts\activate               # Activates the python virtual environment
     $ python -m pip install --upgrade pip   # Upgrades pip version
     $ pip install -r requirements.txt       # Installs the required packages
     ```
     - Rename `example.env` and `example.flaskenv` to `.env` and `.flaskenv` respectively
     - Type `python -m flask run --host=0.0.0.0` to run server
   - Frontend installation
     - Download and install [NodeJS](https://nodejs.org/en/)
     - Move to `frontend` folder and rename `example.env` to `.env`
     - Open command prompt/terminal, move to `frontend` folder, and type the following commands:
     ```sh
     $ npm install                           # Downloads and installs node packages
     $ npm start                             # Runs the script and starts the application
     ```
     - Application will start automatically in [http://localhost:3000](http://localhost:3000)

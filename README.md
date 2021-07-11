<p align="center">
<a href="https://www.uni-due.de/soco/research/projects/openlap.php" target="_blank" rel="noopener noreferrer">
<img height="100px" src="frontend/public/images/logos/cover.png" alt="re-frame logo">
</a>
</p>

# Exploratory Learning Analytics Toolkit for Students (ELAS)

## How to get started?

1. Using Docker
   - Download and install [Docker](https://www.docker.com/products/docker-desktop)
   - Type `docker-compose up --build`
2. Local installation
   - Backend installation
     - Download and install Python
     - Download and install MongoDB
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
     - Open command prompt/terminal, move to `frontend` folder, and type the following commands:
     ```sh
     $ npm install                           # Downloads and installs node packages
     $ npm start                             # Runs the script and starts the application
     ```
     - Application will start automatically in [http://localhost:3000](http://localhost:3000)

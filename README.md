<p align="center">
<a href="https://www.uni-due.de/soco/teaching/courses/lab-idea-ss21.php" target="_blank" rel="noopener noreferrer">
<img height="110px" src="img/cover.png" alt="re-frame logo">
</a>
</p>

# Exploratory Learning Analytics Toolkit for Students (ELAS)

The Interactive Data Exploration and Analytics (IDEA) lab course offered at the UDE Social Computing Group focuses on the effective integration of techniques from human-computer interaction (HCI), information visualization, and machine learning to help users interactively explore data.

The aim of this IDEA lab is to provide the foundation for an Exploratory Learning Analytics Toolkit for Students (ELAS) to support UDE students in their learning activities. In the previous iterations of the Learning Analytics (LA), Advanced Web Technologies (AdvWebTech), and Learning Analytics and Visual Analytics (LAVA) courses offered at the SoCo Group, different LA applications were developed as part of student projects. The task in IDEA lab will be to improve, adapt, and integrate selected applications into the ELAS platform.

## 🚀 Get Started

1. Using Docker 🐳

   - Make sure you have downloaded and installed [Docker](https://www.docker.com/products/docker-desktop)
   - Make sure to add your project folder `ELAS` in the file sharing settings of Docker as shown [here](img/docker-issue-windows.jpg)
   - Make sure you have downloaded and installed [NodeJS](https://nodejs.org/en/)
   - Open a command prompt/terminal and move to the `ELAS\frontend` directory. Then type the following command:

     ```sh
     npm install
     ```
     
   - Move back to `ELAS` directory and type the following command in the command prompt/terminal:

     ```sh
     docker-compose up --build
     ```


2. Manual installation 🔨
   - Backend installation
     - Download and install [Python](https://www.python.org/downloads/release/python-387/)
     - Download and install [MongoDB Community Server](https://www.mongodb.com/try/download/community)
     - Open command prompt/terminal, move to `backend` folder
       - Install a python virtual environment

         ```sh
         python -m venv venv  
         ```
       - Activate the python virtual environment

         ```sh
         .\venv\Scripts\activate  
         ```
       - Upgrade pip version

         ```sh
         python -m pip install --upgrade pip  
         ```
       - Install the required packages

         ```sh
         pip install -r requirements.txt 
         ```
     - Rename `example.env` and `example.flaskenv` to `.env` and `.flaskenv` respectively
     - Type the following command in a command prompt/terminal to run server 
     
       ```sh
       python -m flask run --host=0.0.0.0
       ```
     
   - Frontend installation
     - Download and install [NodeJS](https://nodejs.org/en/)
     - Move to `frontend` folder and rename `example.env` to `.env`
     - Open command prompt/terminal, move to `frontend` folder
       
       - Download and install node packages
       
         ```sh
         npm install
         ```
        
       - Run the script and starts the application
       
         ```sh
         npm start
         ```
     - Application will start automatically in [http://localhost:3000](http://localhost:3000)

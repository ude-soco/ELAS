<p align="center">
<a href="https://www.uni-due.de/soco/teaching/courses/lab-idea-ss21.php" target="_blank" rel="noopener noreferrer">
<img height="110px" src="img/cover.png" alt="re-frame logo">
</a>
</p>

# Exploratory Learning Analytics Toolkit for Students (ELAS)

The Interactive Data Exploration and Analytics (IDEA) lab course offered at the UDE Social Computing Group focuses on the effective integration of techniques from human-computer interaction (HCI), information visualization, and machine learning to help users interactively explore data.

The aim of this IDEA lab is to provide the foundation for an Exploratory Learning Analytics Toolkit for Students (ELAS) to support UDE students in their learning activities. In the previous iterations of the Learning Analytics (LA), Advanced Web Technologies (AdvWebTech), and Learning Analytics and Visual Analytics (LAVA) courses offered at the SoCo Group, different LA applications were developed as part of student projects. The task in IDEA lab will be to improve, adapt, and integrate selected applications into the ELAS platform.

## 🚀 Get Started

1. Installation guide 🔨

	- Backend installation

    	- Download and install [Python](https://www.python.org/downloads/release/python-3912/)

    	- Download and install [Postgresql ver.14](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

    	- Open a command prompt, move inside `backend` folder, and follow the steps below by typing the commands in your command prompt.

    	- Install a python virtual environment

        	```sh
        	python -m venv venv
        	```

       	- Activate the python virtual environment

        	```sh
			.\venv\Scripts\activate
         	```

		- Upgrade the pip version

        	```sh
         	python -m pip install --upgrade pip
         	```

       	- Install the required packages from the `requirements.txt` file

        	```sh
         	pip install -r requirements.txt
         	```

       	- Install Flask 2.1.0

        	```sh
			pip	install Flask==2.1.0
         	```

    	- Rename the files `example.env` to `.env` and `example.flaskenv` to `.flaskenv` respectively

    	- Open `.env` file, find `POSTGRES_PASS`, and type the password of your postgresql database between the single quotation mark

    	- Type the following command in a command prompt to run server

    		```sh
    		python -m flask run --host=0.0.0.0
    		```

   	- Frontend installation

     	- Download and install [NodeJS](https://nodejs.org/en/)
     	- Move to `frontend` folder and rename the file `example.env` to `.env`
     	- Open command prompt/terminal and follow the steps below:

       	- Download and install node packages

         	```sh
			npm install
         	```

       	- Run the script and starts the application

         	```sh
         	npm start
         	```

       	- Stop the Frontend application by pressing `Cntl + c` inside the command prompt

     	- Application will open automatically in browser at [localhost:3000](http://localhost:3000)

   	- Scraping tool

     	- In the ELAS web application homepage, click `Login` button and create a new account
     	- After successful login, click the circle button at the top right corner, open the menu, and click `Settings`
     	- Click on `SCRAPE COURSES` button
     	- Copy and paste the following address links in the respective text fields
       		- Example link for [E3 courses SS22](https://campus.uni-due.de/lsf/rds?state=wtree&search=1&trex=step&root120221=303720%7C306477%7C306534&P.vx=kurz)
       		- Example link for [Engineering courses SS22](https://campus.uni-due.de/lsf/rds?state=wtree&search=1&trex=step&root120221=303720%7C306861%7C305477&P.vx=kurz)
     	- Click the `SCRAPE NOW` button, wait for the scraping to finish (check progress in the webserver command prompt)
     	- Once the scraping is finished, go to `backend\bin` directory, and copy all the files
     	- Go to `frontend\src\components\Projects\E3Selector\data` directory, and paste the files
     	- Restart the Frontend application by pressing `Cntl + c` inside the command prompt to terminate the server, and then type `npm start` to start the server
		- Read more about scrapers
			- [LSF scraper](backend\scrapers\lsf_scraper\README.md)
			- [Lecture database scraper](backend\scrapers\vdb_scraper\README.md)
			- [E3Selector scraper](frontend\src\components\Projects\E3Selector\README.md)
		- Read more about [ORM interface](backend\orm_interface\README.md)

<br/>
2. (OUTDATED!) Using Docker 🐳

- Download and install [Docker](https://www.docker.com/products/docker-desktop)
- Add your project folder `ELAS` in the file sharing settings of Docker as shown [here](img/docker-issue-windows.jpg)
- Download and install [NodeJS](https://nodejs.org/en/)
- Open a command prompt/terminal and move to the `ELAS\frontend` directory. Then type the following command:

  ```sh
  npm install
  ```

- Move back to `ELAS` directory and type the following command in the command prompt/terminal:

  ```sh
  docker-compose up --build
  ```

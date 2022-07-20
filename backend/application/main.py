from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from .extensions import bcrypt
from dotenv import load_dotenv
import os
load_dotenv()

from orm_interface.entities.user import User
from orm_interface.base import Base, Session, engine
from orm_interface.entities.e3_entity.e3_courses import E3_Courses, E3_Rating

main = Blueprint("main", __name__)

Base.metadata.create_all(engine)
session = Session()


@main.route("/", methods=["GET"])
def adminUser():
    email = os.environ.get('ADMIN')
    password = os.environ.get('ADMIN_PASS')
    firstname = "Admin"
    lastname = "Admin"

    user = session.query(User).filter(User.email == email).first()

    if user is None:
        hash_password = bcrypt.generate_password_hash(password).decode("utf-8")
        new_user = User(
            firstname=firstname, lastname=lastname, email=email, password=hash_password
        )
        session.add(new_user)
        session.commit()
        return jsonify({"success": "User registered"})

    else:
        return jsonify({"success": "Server initialized"})


@main.route("/login", methods=["POST"])
def login():
    email = request.get_json()["email"]
    password = request.get_json()["password"]
    user = session.query(User).filter(User.email == email).first()

    if user is None:
        return jsonify({"error": "User not registered"})

    else:
        if bcrypt.check_password_hash(user.password, password):
            access_token = create_access_token(
                identity={
                    "firstname": user.firstname,
                    "lastname": user.lastname,
                    "email": user.email,
                }
            )
            return jsonify({"token": access_token})
        else:
            return jsonify({"error": "Wrong password!"})


@main.route("/register", methods=["POST"])
def register():
    email = request.get_json()["email"]
    password = request.get_json()["password"]
    firstname = request.get_json()["firstname"]
    lastname = request.get_json()["lastname"]

    user = session.query(User).filter(User.email == email).first()

    if user is None:
        hash_password = bcrypt.generate_password_hash(password).decode("utf-8")
        new_user = User(
            firstname=firstname, lastname=lastname, email=email, password=hash_password
        )
        session.add(new_user)
        session.commit()
        return jsonify({"success": "User registered"})

    else:
        return jsonify({"error": "User is already registered"})


@main.route("/commence_scraping", methods=["GET", "POST"])
def scrape():
    import os
    import yaml
    from multiprocessing import Process
    from .scraper.scrape_control import run

    with open(
        os.path.join(os.path.dirname(__file__), "scraper", "config.yaml"), "r"
    ) as file:
        config = file.read()
    config = yaml.safe_load(config)

    if request.method == "GET":
        return {"statusMessage": config["statusMessage"]}

    e3_url = request.json["e3"]
    insight_url = request.json["insight"]

    config["statusMessage"] = "running..."
    with open(
        os.path.join(os.path.dirname(__file__), "scraper", "config.yaml"), "w"
    ) as file:
        file.write(yaml.dump(config))

    scraper = Process(
        target=run,
        args=(
            config,
            insight_url,
            e3_url,
        ),
    )
    scraper.start()
    return ""


@main.route("/e3_courses_and_rating", methods=['GET'])
def gete3course():
        #get all courses from database
 
    docs = session.query(E3_Courses).join(E3_Rating).all()
 
    response= []
    #get all the data from data base with join ! 
    for e3course in docs:
        for e3rating in e3course.e3_rating:
  
          response.append({
            "selected": e3course.selected,
            "Title": e3course.name,
            "Link": e3course.url,
            "catalog" : e3course.catalog,
            "Type" : e3course.type,
            "SWS" :e3course.sws,
            "Erwartete Teilnehmer" : e3course.num_expected_participants,
            "Max. Teilnehmer" : e3course.max_participants,
            "Credits" : e3course.credit,
            "Language" : e3course.language,
            "Description" :e3course.description,
            "Times_manual" :e3course.timetables,
            "Location" :e3course.location ,
            "Exam" :  e3course.exam_type,
            "Ausgeschlossen_Ingenieurwissenschaften_Bachelor" : e3course.ausgeschlossen_ingenieurwissenschaften_bachelor,
            "fairness" : e3rating.fairness,
            "support": e3rating.support,
            "material": e3rating.material,
            "fun": e3rating.fun,
            "comprehensibility": e3rating.comprehensibility,
            "interesting": e3rating.interesting,
            "grade_effort": e3rating.grade_effort
        })
    return jsonify(response)






    
   



import os
import csv
from flask import Blueprint, request, jsonify
from orm_interface.base import Base, Session, engine
from orm_interface.entities.e3_entity.e3_courses import E3_Courses, E3_Rating


Base.metadata.create_all(engine)
session = Session()

e3_selector = Blueprint("e3_selector", __name__)


@e3_selector.route("/home")
@e3_selector.route("/")
def course_insights_home():
    return "E3 Selector home"


@e3_selector.route("/shared/<slug>", methods=["GET", "POST"])
def share(slug):
    if request.method == "GET":
        with open(
            os.path.join(os.path.abspath(os.path.dirname(__file__)), "shared.csv"), "r"
        ) as file:
            filereader = csv.reader(file)
            for row in filereader:
                if row[0] == slug:
                    return {"e3selected": row[1], "e3filters": row[2]}
            return ""
    else:
        with open(
            os.path.join(os.path.abspath(os.path.dirname(__file__)), "shared.csv"), "a"
        ) as file:
            filewriter = csv.writer(file)
            filewriter.writerow(
                [slug, request.json["e3selected"], request.json["e3filters"]]
            )
        return ""


@e3_selector.route("/e3_courses_and_rating", methods=['GET'])
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






    
   



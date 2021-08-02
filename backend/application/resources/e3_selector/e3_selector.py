import os
import csv
from flask import Blueprint, request

e3_selector = Blueprint("e3_selector", __name__)


@e3_selector.route("/home")
@e3_selector.route("/")
def course_insights_home():
    return "E3 Selector home"


@e3_selector.route("/shared/<slug>", methods=["GET", "POST"])
def share(slug):
    if request.method == "GET":
        with open(os.path.join(os.path.abspath(os.path.dirname(__file__)), "shared.csv"), "r") as file:
            filereader = csv.reader(file)
            for row in filereader:
                if row[0] == slug:
                    return {"e3selected": row[1], "e3filters": row[2]}
            return ""
    else:
        with open(os.path.join(os.path.abspath(os.path.dirname(__file__)), "shared.csv"), "a") as file:
            filewriter = csv.writer(file)
            filewriter.writerow([slug, request.json["e3selected"], request.json["e3filters"]])
        return ""

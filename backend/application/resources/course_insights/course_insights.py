from flask import Blueprint

course_insights = Blueprint("course_insights", __name__)


@course_insights.route("/home")
@course_insights.route("/")
def course_insights_home():
    return "course insights home"

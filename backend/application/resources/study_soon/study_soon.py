from flask import Blueprint

study_soon = Blueprint("study_soon", __name__)


@study_soon.route("/home")
@study_soon.route("/")
def course_insights_home():
    return "Study Soon home"

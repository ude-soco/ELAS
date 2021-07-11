from flask import Blueprint

spoa = Blueprint("spoa", __name__)


@spoa.route("/home")
@spoa.route("/")
def course_insights_home():
    return "spoa home"

from flask import Blueprint

e3_selector = Blueprint("e3_selector", __name__)


@e3_selector.route("/home")
@e3_selector.route("/")
def course_insights_home():
    return "E3 Selector home"

from flask import Blueprint

intogen = Blueprint("intogen", __name__)


@intogen.route("/home")
@intogen.route("/")
def course_insights_home():
    return "intogen home"

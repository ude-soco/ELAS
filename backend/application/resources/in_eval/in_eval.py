from flask import Blueprint

in_eval = Blueprint("in_eval", __name__)


@in_eval.route("/home")
@in_eval.route("/")
def course_insights_home():
    return "In Eval home"

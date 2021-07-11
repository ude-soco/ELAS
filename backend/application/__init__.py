from flask import Flask
from flask_cors import CORS

from .extensions import mongo, jwt
from .main import main
from .resources.course_insights.course_insights import course_insights
from .resources.e3_selector.e3_selector import e3_selector
from .resources.in_eval.in_eval import in_eval
from .resources.intogen.intogen import intogen
from .resources.spoa.spoa import spoa
from .resources.study_soon.study_soon import study_soon


def create_app(config_object="application.settings"):
    app = Flask(__name__)
    CORS(app)

    app.config.from_object(config_object)

    mongo.init_app(app)
    jwt.init_app(app)

    app.register_blueprint(main)
    app.register_blueprint(course_insights, url_prefix="/courseinsights")
    app.register_blueprint(e3_selector, url_prefix="/e3selector")
    app.register_blueprint(in_eval, url_prefix="/ineval")
    app.register_blueprint(intogen, url_prefix="/intogen")
    app.register_blueprint(spoa, url_prefix="/spoa")
    app.register_blueprint(study_soon, url_prefix="/studysoon")

    return app

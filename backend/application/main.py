from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from .extensions import bcrypt

from orm_interface.entities.user import User
from orm_interface.base import Base, Session, engine

main = Blueprint("main", __name__)

Base.metadata.create_all(engine)
session = Session()

@main.route('/login', methods=['POST'])
def login():
    email = request.get_json()['email']
    password = request.get_json()['password']
    user = session.query(User).filter(User.email==email).first()

    if user is None:
        return jsonify({"error": "User not registered"})

    else:
        if bcrypt.check_password_hash(user.password, password):
            access_token = create_access_token(identity={
                'firstname': user.firstname,
                'lastname': user.lastname,
                'email': user.email,
            })
            return jsonify({'token': access_token})
        else:
            return jsonify({'error': 'Wrong password!'})


@main.route('/register', methods=['POST'])
def register():
    email = request.get_json()['email']
    password = request.get_json()['password']
    firstname = request.get_json()['firstname']
    lastname = request.get_json()['lastname']

    user = session.query(User).filter(User.email==email).first()

    if user is None:
        hash_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(
            firstname=firstname,
            lastname=lastname,
            email=email,
            password=hash_password
        )
        session.add(new_user)
        session.commit()
        return jsonify({"success": "User registered"})

    else:
        return jsonify({"error": "User is already registered"})


@main.route('/commence_scraping', methods=['GET', 'POST'])
def scrape():
    import os
    import yaml
    from multiprocessing import Process
    from .scraper.scrape_control import run

    with open(os.path.join(os.path.dirname(__file__), "scraper", "config.yaml"), "r") as file:
        config = file.read()
    config = yaml.safe_load(config)

    if request.method == 'GET':
        return {"statusMessage": config["statusMessage"]}

    e3_url = request.json["e3"]
    insight_url = request.json["insight"]

    config["statusMessage"] = "running..."
    with open(os.path.join(os.path.dirname(__file__), "scraper", "config.yaml"), "w") as file:
        file.write(yaml.dump(config))

    scraper = Process(target=run, args=(config, insight_url, e3_url,))
    scraper.start()
    return ""

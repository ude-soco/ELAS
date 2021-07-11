FROM python:3.8-slim-buster

EXPOSE 5000

WORKDIR /app

ENV FLASK_APP=application \
    FLASK_ENV=development \
    MONGO_URI='mongodb://mongoDB:27017/ELAS' \
    JWT_SECRET_KEY='secret'

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["python", "-m", "flask", "run", "--host=0.0.0.0"]

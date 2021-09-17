FROM python:3.8-slim-buster

EXPOSE 5000

WORKDIR /app

COPY requirements.txt .

RUN apt-get update && apt-get install curl -y && pip3 install -r requirements.txt && pip3 install Scrapy

COPY . .

CMD ["python", "-m", "flask", "run", "--host=0.0.0.0"]

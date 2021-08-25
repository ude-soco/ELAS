FROM python:3.8-slim-buster

EXPOSE 5000

WORKDIR /app

COPY requirements.txt .

RUN apt-get update && apt-get install curl -y && pip install -r requirements.txt

COPY . .

CMD ["python", "-m", "flask", "run", "--host=0.0.0.0"]
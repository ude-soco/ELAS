FROM python:3.10.4-slim

EXPOSE 5000

WORKDIR /app

COPY requirements.txt .

RUN apt-get update && apt-get install curl -y 

RUN python3 -m pip install --upgrade pip 
RUN pip3 install -r requirements.txt 
RUN pip3 install psycopg2-binary Flask==2.1.0 flask-jwt-extended flask-bcrypt flask-cors --upgrade

COPY . .

CMD ["python", "-m", "flask", "run", "--host=0.0.0.0"]

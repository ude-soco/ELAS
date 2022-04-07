import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()

DB_NAME = os.environ.get('POSTGRES_DB')
DB_PASSWORD = os.environ.get('POSTGRES_PASS')
DATABASE_URI = f'postgresql+psycopg2://postgres:{DB_PASSWORD}@localhost:5432/{DB_NAME}'
engine = create_engine(DATABASE_URI)
Session = sessionmaker(bind=engine)

Base = declarative_base()

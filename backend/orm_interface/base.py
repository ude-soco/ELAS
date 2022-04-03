from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DB_NAME = 'thesis_data'
DB_PASSWORD = 'password'
DATABASE_URI = f'postgresql+psycopg2://postgres:{DB_PASSWORD}@localhost:5432/{DB_NAME}'
engine = create_engine(DATABASE_URI)
Session = sessionmaker(bind=engine)

Base = declarative_base()
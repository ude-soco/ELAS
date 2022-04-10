from sqlalchemy import Column, String, ForeignKey
from orm_interface.base import Base


class Lecture_Professor(Base):
    __tablename__ = 'lecture_professor'
    __table_args__ = {"extend_existing": True}

    lecture_id = Column(String,
                        ForeignKey('lecture.id'),
                        primary_key=True)
    professor_id = Column(String,
                          ForeignKey('professor.id'),
                          primary_key=True)


class Professor(Base):
    __tablename__ = 'professor'
    __table_args__ = {"extend_existing": True}

    id = Column(String, primary_key=True)
    name = Column(String)
    url = Column(String)

    def __init__(self, id, name, url):
        self.id = id
        self.name = name
        self.url = url

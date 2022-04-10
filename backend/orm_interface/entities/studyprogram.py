from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from orm_interface.base import Base


class Lecture_Studyprogram(Base):
    __tablename__ = 'lecture_studyprogram'

    lecture_id = Column(String, ForeignKey('lecture.id'), primary_key=True)
    studyprogram_id = Column(String, ForeignKey('study_program.id'), primary_key=True)


class StudyProgram(Base):
    __tablename__ = 'study_program'
    id = Column(String, primary_key=True)
    name = Column(String)
    url = Column(String)
    lectures = relationship('Lecture', secondary='lecture_studyprogram', back_populates='root_id')

    def __init__(self, id, name, url):
        self.id = id
        self.name = name
        self.url = url

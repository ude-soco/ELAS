from sqlalchemy import Column, String, ARRAY
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB
from orm_interface.base import Base
from orm_interface.entities.timetable import Timetable
from orm_interface.entities.professor import Professor


class Lecture(Base):
    __tablename__ = 'lecture'

    id = Column(String, primary_key=True)
    url = Column(String)
    name = Column(String)
    subject_type = Column(String)
    semester = Column(String)
    sws = Column(String)
    longtext = Column(String)
    shorttext = Column(String)
    language = Column(String)
    hyperlink = Column(String)
    description = Column(String)
    timetables = relationship(Timetable)
    professors = relationship(Professor,
                              secondary='lecture_professor')
    root_id = relationship('StudyProgram',
                           secondary='lecture_studyprogram',
                           back_populates='lectures')
    keywords = Column(ARRAY(JSONB))

    def __init__(self, id, url, name, subject_type, semester, sws, longtext, shorttext, language, hyperlink,
                 description, keywords):
        self.id = id
        self.url = url
        self.name = name
        self.subject_type = subject_type
        self.semester = semester
        self.sws = sws
        self.longtext = longtext
        self.shorttext = shorttext
        self.language = language
        self.hyperlink = hyperlink
        self.description = description
        self.keywords = keywords

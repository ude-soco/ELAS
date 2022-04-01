from sqlalchemy import Column, String, ForeignKey, Integer, ARRAY, Date
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB
from orm_interface.base import Base

class Lecture_Professor(Base):
    __tablename__ = 'lecture_professor'

    lecture_id = Column(String,
                        ForeignKey('lecture.id'),
                        primary_key=True)
    professor_id = Column(String,
                          ForeignKey('professor.id'),
                          primary_key=True)

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
    timetables = relationship("Timetable")
    professors = relationship('Professor',
                              secondary='lecture_professor')
    root_id = relationship('StudyProgram',
                           secondary='lecture_studyprogram',
                           back_populates='lectures')
    keywords = Column(ARRAY(JSONB))

    def __init__(self, id, url, name, subject_type, semester, sws, longtext, shorttext, language, hyperlink, description, keywords):
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

class Professor(Base):
    __tablename__ = 'professor'

    id = Column(String, primary_key=True)
    name = Column(String)
    url = Column(String)

    def __init__(self, id, name, url):
        self.id = id
        self.name = name
        self.url = url

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

class Timetable(Base):
    __tablename__ = 'timetable'

    id = Column(String, primary_key=True)
    day = Column(String)
    time_from = Column(String)
    time_to = Column(String)
    rhythm = Column(String)
    duration = Column(String)
    duration_from = Column(Date)
    duration_to = Column(Date)
    room = Column(String)
    status = Column(String)
    comment = Column(String)
    elearn = Column(String)
    link = Column(String)
    lecture_id = Column(Integer, ForeignKey('lecture.id'))
    dates = Column(ARRAY(Date))

    def __init__(self, id, day, time_from, time_to, rhythm, duration, duration_from, duration_to, room, status, comment, elearn, link, lecture_id, dates=[""]):
        self.id = id
        self.day = day
        self.time_from = time_from
        self.time_to = time_to
        self.rhythm = rhythm
        self.duration = duration
        self.duration_from = duration_from
        self.duration_to = duration_to
        self.room = room
        self.status = status
        self.comment = comment
        self.elearn = elearn
        self.link = link
        self.lecture_id = lecture_id
        self.dates = dates
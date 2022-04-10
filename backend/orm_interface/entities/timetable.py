from sqlalchemy import Column, String, Date, ForeignKey, ARRAY
from orm_interface.base import Base


class Timetable(Base):
    __tablename__ = 'timetable'
    __table_args__ = {"extend_existing": True}

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
    lecture_id = Column(String, ForeignKey('lecture.id'))
    dates = Column(ARRAY(Date))

    def __init__(self, id, day, time_from, time_to, rhythm, duration, duration_from, duration_to, room, status, comment,
                 elearn, link, lecture_id, dates=[""]):
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

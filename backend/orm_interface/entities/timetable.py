from sqlalchemy import Column, String, Integer, Date, ForeignKey, ARRAY
from base import Base

# class Timetable(Base):
#     __tablename__ = 'timetable'
#
#     id = Column(String, primary_key=True)
#     day = Column(String)
#     fro = Column(String)
#     to = Column(String)
#     rhythm = Column(String)
#     duration = Column(String)
#     room = Column(String)
#     status = Column(String)
#     comment = Column(String)
#     elearn = Column(String)
#     link = Column(String)
#     lecture_id = Column(Integer, ForeignKey('lecture.id'))
#     dates = Column(ARRAY(Date))
#
#     def __init__(self, id, day, fro, to, rhythm, duration, room, status, comment, elearn, link, lecture_id, dates=[""]):
#         self.id = id
#         self.day = day
#         self.fro = fro
#         self.to = to
#         self.rhythm = rhythm
#         self.duration = duration
#         self.room = room
#         self.status = status
#         self.comment = comment
#         self.elearn = elearn
#         self.link = link
#         self.lecture_id = lecture_id
#         self.dates = dates
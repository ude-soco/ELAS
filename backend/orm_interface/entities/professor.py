from sqlalchemy import Column, String, Table, ForeignKey
from sqlalchemy.orm import relationship
from base import Base

# lecture_professor = Table('lecture_professor', Base.metadata,
#                           Column('lecture_id', ForeignKey('lecture.id'), primary_key=True),
#                           Column('professor_id', ForeignKey('professor.id'), primary_key=True))
#
# class Professor(Base):
#     __tablename__ = 'professor'
#
#     id = Column(String, primary_key=True)
#     name = Column(String)
#     url = Column(String)
#     lectures = relationship('lecture', secondary=lecture_professor, backref='professor')
#
#     def __init__(self, id, name, url):
#         self.id = id
#         self.name = name
#         self.url = url
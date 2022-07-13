from sqlalchemy import Boolean, Column, Integer, String, Float, ForeignKey
from orm_interface.base import Base
from sqlalchemy.orm import relationship


class E3_Rating(Base):
    __tablename__ = "e3_rating"
    id = Column(Integer, primary_key=True, autoincrement=True)
    fairness = Column(Float)
    support = Column(Float)
    material = Column(Float)
    fun = Column(Float)
    comprehensibility = Column(Float)
    interesting = Column(Float) 
    grade_effort = Column(Float)
    e3_course_id = Column(Integer, ForeignKey('e3_courses.id'))

    def __init__(self, fairness, support, 
        material, fun, comprehensibility, 
        interesting, grade_effort,e3_course_id ):
        self.fairness = fairness
        self.support = support
        self.material = material
        self.fun = fun
        self.comprehensibility = comprehensibility
        self.interesting = interesting
        self.grade_effort = grade_effort
        self.e3_course_id=e3_course_id
      

class E3_Courses(Base):
    __tablename__ = "e3_courses"
 
    id = Column(Integer, primary_key=True, autoincrement=True)
    selected = Column(Boolean)
    name = Column(String)
    url = Column(String)
    catalog = Column(String)
    type = Column(String)
    sws= Column(String) 
    num_expected_participants = Column(String) 
    max_participants = Column(String) 
    credit = Column(String) 
    language = Column(String)
    description = Column(String)
    location = Column(String)
    exam_type = Column(String)
    timetables = Column(String)
    ausgeschlossen_ingenieurwissenschaften_bachelor = Column(String)
    e3_rating = relationship(E3_Rating, backref="e3_courses")

    
    def __init__(self, selected, name, url, catalog, type, 
                sws, num_expected_participants, 
                max_participants, credit,language,
                description, location, exam_type, time_manual,
                ausgeschlossen_ingenieurwissenschaften_bachelor):
         self.selected = selected
         self.name = name
         self.url = url
         self.catalog = catalog
         self.type = type
         self.sws = sws
         self.num_expected_participants = num_expected_participants
         self.max_participants = max_participants
         self.credit = credit
         self.language = language
         self.description = description
         self.location = location
         self.exam_type = exam_type
         self.timetables = time_manual
         self.ausgeschlossen_ingenieurwissenschaften_bachelor = ausgeschlossen_ingenieurwissenschaften_bachelor

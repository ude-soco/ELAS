from sqlalchemy import Column, Float, Integer, String
from sqlalchemy.sql.sqltypes import Boolean
from orm_interface.base import Base

class Course(Base):
    __tablename__ = "course"
    id = Column (Integer, primary_key=True)
    selected = Column(Boolean)
    title = Column(String)
    link: Column(String)
    catalog: Column(String)
    type: Column(String)
    sws: Column(Integer)
    erwartete_teilnehmer:  Column(Integer)
    max_teilnehmer:  Column(Integer)
    credits:  Column(Integer)
    language: Column(String)
    description: Column(String)
    times_manual: Column(String)
    location: Column(String)
    exam: Column(String)
    ausgeschlossen_ingenieurwissenschaften_bachelor: Column(String)
    fairness: Column(Float)
    support: Column(Float)
    material: Column(Float)
    fun: Column(Float)
    comprehensibility: Column(Float)
    interesting: Column(Float)
    grade_effort: Column(Float)

    def __init__(self, id :int ,selected: bool, title: str, link: str, catalog: str, type: str, sws: int, erwartete_teilnehmer: int, max_teilnehmer: int, credits: int, language: str, description: str, times_manual: str, location: str, exam: str, ausgeschlossen_ingenieurwissenschaften_bachelor: str, fairness: float, support: float, material: float, fun: float, comprehensibility: float, interesting: float, grade_effort: float) -> None:
        self.id = id
        self.selected = selected
        self.title = title
        self.link = link
        self.catalog = catalog
        self.type = type
        self.sws = sws  
        self.erwartete_teilnehmer = erwartete_teilnehmer
        self.max_teilnehmer = max_teilnehmer
        self.credits = credits
        self.language = language
        self.description = description
        self.times_manual = times_manual
        self.location = location
        self.exam = exam
        self.ausgeschlossen_ingenieurwissenschaften_bachelor = ausgeschlossen_ingenieurwissenschaften_bachelor
        self.fairness = fairness
        self.support = support
        self.material = material
        self.fun = fun
        self.comprehensibility = comprehensibility
        self.interesting = interesting
        self.grade_effort = grade_effort
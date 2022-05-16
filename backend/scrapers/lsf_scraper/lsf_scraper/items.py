# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class CourseCatalogItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    id = scrapy.Field()
    parent_id = scrapy.Field()
    url = scrapy.Field()
    name = scrapy.Field()


class StudyProgram(CourseCatalogItem):
    type = "studyprogram"
    # string, one of Bachelor, Master
    program_type = scrapy.Field()
    # Category[]
    categories = scrapy.Field()
    # subjects that do not belong in any category
    subjects = scrapy.Field()


class Category(CourseCatalogItem):
    type = "category"
    root_id = scrapy.Field()
    subjects = scrapy.Field()  # Subject[]
    categories = scrapy.Field()  # Category[]


class Subject(CourseCatalogItem):
    type = "subject"
    root_id = scrapy.Field()
    subject_type = scrapy.Field()  # one of Vorlesung, Übung, Praktikum, Seminar, Kolloquium, Übung/Praktikum, Tutorium
    shorttext = scrapy.Field()  # string
    longtext = scrapy.Field()  # string
    sws = scrapy.Field()  # number
    semester = scrapy.Field()  # string
    persons = scrapy.Field()  # Link[]
    timetable = scrapy.Field()  # TimeEntry[]
    einzeltermine_links = scrapy.Field()  # array containing all the links of the einzeltermine
    language = scrapy.Field()  # string
    hyperlink = scrapy.Field()  # string
    description = scrapy.Field()  # string
    credits = scrapy.Field()  # string
    expected = scrapy.Field()  # string
    max = scrapy.Field()  # string
    catalog = scrapy.Field()  # string
    exam = scrapy.Field()  # string
    excluded = scrapy.Field()  # string


class TimeEntry(scrapy.Item):
    type = "time_entry"
    id = scrapy.Field()  # string
    day = scrapy.Field()  # string
    time = scrapy.Field()  # string
    rhythm = scrapy.Field()  # string
    room = scrapy.Field()  # string
    comment = scrapy.Field()
    duration = scrapy.Field()
    status = scrapy.Field()
    elearn = scrapy.Field()
    einzeltermine_link = scrapy.Field()


class Person(scrapy.Item):
    type = "person"
    id = scrapy.Field()
    name = scrapy.Field()
    url = scrapy.Field()


class Einzeltermin(scrapy.Item):
    type = scrapy.Field()
    subject_id = scrapy.Field()
    termin_id = scrapy.Field()
    einzeltermine = scrapy.Field()

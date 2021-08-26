# -*- coding: utf-8 -*-

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
    subjects = scrapy.Field() # Subject[]
    categories = scrapy.Field() # Category[]


class Subject(CourseCatalogItem):
    type = "subject"
    subject_type = scrapy.Field() # one of Vorlesung, Übung, Praktikum, Seminar, Kolloquium, Übung/Praktikum, Tutorium
    shorttext = scrapy.Field() # string
    longtext = scrapy.Field() # string
    sws = scrapy.Field() # number
    semester = scrapy.Field() # string
    persons = scrapy.Field() # Link[]
    timetable = scrapy.Field() # TimeEntry[]
    language = scrapy.Field() # string
    hyperlink = scrapy.Field() # string
    description = scrapy.Field() # string
    credits = scrapy.Field() # string
    expected = scrapy.Field() # string
    max = scrapy.Field() # string
    catalog = scrapy.Field() # string
    exam = scrapy.Field() # string
    excluded = scrapy.Field() # string

class TimeEntry(scrapy.Item):
    type = "time-entry"
    day = scrapy.Field() # string
    time = scrapy.Field() # string
    rhythm = scrapy.Field() # string
    room = scrapy.Field() #  string
    comment = scrapy.Field()
    duration = scrapy.Field()
    status = scrapy.Field()
    elearn = scrapy.Field()

class Person(scrapy.Item):
    type="person"
    name = scrapy.Field()
    url = scrapy.Field()

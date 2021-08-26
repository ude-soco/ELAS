# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class CourseRatingsItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    pass

class CourseRating(scrapy.Item):
    url = scrapy.Field()
    name = scrapy.Field()
    prof = scrapy.Field()
    ratings = scrapy.Field()

class Rating(scrapy.Item):
    # values between 1 and 5
    fairness = scrapy.Field()
    support = scrapy.Field()
    material = scrapy.Field()
    fun = scrapy.Field()
    understandability = scrapy.Field()
    interest = scrapy.Field()
    node_effort = scrapy.Field()

    #yes or no
    recommendation = scrapy.Field()

    # string (optional)
    comment = scrapy.Field()
    semester = scrapy.Field()
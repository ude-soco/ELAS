# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html
import re

class CourseCatalogPipeline(object):
    def process_item(self, item, spider):
       # remove unwanted symbols
       if len(item['name'].split('\n')) >= 2:
        item['name'] = str(item['name']).split('\n')[1].strip(' ')
       return item

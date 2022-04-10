# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
from scrapy.exceptions import DropItem
import re


class VdbScraperPipeline:
    def process_item(self, item, spider):
        descriptions = item['description']
        formatted_descriptions = {}
        for key, value in descriptions.items():
            formatted_descriptions[key] = self.remove_html_formatting(value)
        item['description'] = formatted_descriptions
        return item

    def remove_html_formatting(self, description):
        cleaner = re.compile('<.*?>')
        cleantext = re.sub(cleaner, '', description)
        return cleantext


class CorrectSpellingOfParentCourse:
    def process_item(self, item, spider):
        if 'sience' in item['parent_course']['name'].lower():
            item['parent_course']['name'] = item['parent_course']['name'].replace('Sience', 'Science')
        return item

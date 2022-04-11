# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
from datetime import date


class LsfPipeline:

    def process_item(self, item, spider):
        if 'type' in item.keys() and item['type'] == 'Einzeltermine':
            einzeltermine = item['einzeltermine']
            einzeltermine_new = []
            for termin in einzeltermine:
                termin = termin.replace('<li>', '').replace('</li>', '').replace('\\n', '').replace('\\t', '').strip()
                day_month_year = termin.split('.')
                day, month, year = int(day_month_year[0]), int(day_month_year[1]), int(day_month_year[2])
                termin_date = date(year, month, day)
                einzeltermine_new.append(termin_date)
            item['einzeltermine'] = einzeltermine_new
            return item
        else:
            return item

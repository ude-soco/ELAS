# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html


class CourseRatingsPipeline(object):
    rating_attributes = ['fairness','support','material','fun', 'understandability','interest','node_effort']

    def process_item(self, item, spider):
        #convert ratings into numbers
        ratings = item.get('ratings')
        for rating in ratings:
            print("rating")
            print(rating)
            for attribute in self.rating_attributes:
                rating[attribute] = self.convert_rating_classname_to_value(rating.get(attribute))

            rating['semester'] = self.remove_ratings_from_semester(rating['semester'])

        # trim names
        name = str(item.get('name')).strip()
        prof = str(item.get('prof')).strip()
        item['name'] = name
        item['prof'] = prof

        return item

    def remove_ratings_from_semester(self, semester_string):
        return str(semester_string).partition(' (')[0];

    def convert_rating_classname_to_value(self, class_string):
        converter = {
            "rating rating_1_full": 1,
            "rating rating_2_full": 2,
            "rating rating_3_full": 3,
            "rating rating_4_full": 4,
            "rating rating_5_full": 5,
        }
        return converter.get(class_string, "None")

# run following command to store results of scraping in temp_results.json
# scrapy crawl vdb-scraper -o temp_results.json
# -*- coding: utf-8 -*-
import scrapy
from ..items import StudyCourse, Lecture
import re


class CourseCatalogSpider(scrapy.Spider):
    name = 'vdb-scraper'
    allowed_domains = ['uni-due.de']
    start_urls = [
        'https://www.uni-due.de/vdb/en_EN/studiengang/liste'
    ]

    # start_url_en = https://www.uni-due.de/vdb/en_EN/studiengang/liste
    # start_url_de = 'https://www.uni-due.de/vdb/studiengang/liste'

    def __init__(self, keywords_DE=None,
                 keywords_EN=None, all_engineering_studyprograms=False, *args, **kwargs):
        if keywords_EN is None:
            keywords_EN = ['applied cognitive and media science', 'applied computer sience',
                           'computer engineering']
        if keywords_DE is None:
            keywords_DE = ["angewandte informatik", "angewandte kognitions- und medienwissenschaft",
                           "computer engineering"]

        self.all_engineering_studyprograms = all_engineering_studyprograms
        self.keywords = keywords_EN

    def parse(self, response):
        return self.get_links(response)

    def get_links(self, response):  # function called on startURL
        links = response.xpath("//div[@class='highlight-blue']/ul/li/a")  # extract links to study courses
        study_courses = []
        for link in links:
            name = link.css("::text").get()
            url = response.urljoin(link.attrib["href"])
            id_regex = "(studiengang/)(\d{1,})(/detail)"  # regex to detect id of study course from its URL
            url_groups = re.search(id_regex, url)
            id = url_groups.group(2)

            if self.all_engineering_studyprograms: # if we have to scrape all engineering study programs
                study_courses.append(StudyCourse(name=name, url=url, id=id, type="StudyCourse"))

            else: # if we only have to scrape the INKO group of study programs
                for phrase in self.keywords:
                    if phrase in name.lower():  # getting only those courses that we want, in this case: INKO courses
                        study_courses.append(StudyCourse(name=name, url=url, id=id, type="StudyCourse"))
                        break

        for study_course in study_courses:
            page = study_course['url']
            request = scrapy.Request(page, callback=self.extract_lectures_and_katalogs_from_study_course)
            request.meta["parent_course"] = study_course
            yield request
            yield study_course

    def extract_lectures_and_katalogs_from_study_course(self, response):
        try:
            parent_course = response.meta["parent_course"]
        except:
            parent_course = {
                "name": "UNKNOWN",
                "url": "UNKNOWN",
                "id": "UNKNOWN",
                "type": "StudyCourse"
            }
        all_links = response.xpath("//a")  # getting all links from a study course page
        filtered_links = self.filter_links_by_lecture_katalog(all_links)  # getting only lecture links
        lecture_links = filtered_links["lecture_links"]
        katalog_links = filtered_links["katalog_links"]

        for lecture_link in lecture_links:
            request = scrapy.Request(response.urljoin(lecture_link.attrib["href"]),
                                     callback=self.extract_lecture_details)
            request.meta["parent_course"] = parent_course
            yield request

        for katalog_link in katalog_links:
            request = scrapy.Request(response.urljoin(katalog_link.attrib['href']),
                                     callback=self.extract_katalog_details)
            request.meta['parent_course'] = parent_course
            yield request

    def extract_lecture_details(self, response):
        try:
            parent_course = response.meta["parent_course"]
        except:
            parent_course = {
                "name": "UNKNOWN",
                "url": "UNKNOWN",
                "id": "UNKNOWN",
                "type": "StudyCourse"
            }
        lecture_title = str(response.xpath("//h1/text()").get()).strip()
        lecture_url = str(response.url)
        id_regex = "(pruefung/)(\d{1,})(/detail)"
        url_groups = re.search(id_regex, lecture_url)
        try:
            lecture_id = url_groups.group(2)
        except:
            lecture_id = "UNKNOWN"
        de = response.xpath("//div[@id='de_DE']/table[1]/tr")  # collection of all the rows in the german description
        en = response.xpath("//div[@id='en_EN']/table[1]/tr")  # collection of all the rows in the english description
        description_DE = self.extract_descriptions(de)
        description_EN = self.extract_descriptions(en)
        description = {
            "de": description_DE,
            "en": description_EN
        }
        yield Lecture(name=lecture_title, url=lecture_url, id=lecture_id, description=description, type="Lecture",
                      parent_course=parent_course)

    def extract_katalog_details(self, response):
        try:
            parent_course = response.meta["parent_course"]
        except:
            parent_course = {
                "name": "UNKNOWN",
                "url": "UNKNOWN",
                "id": "UNKNOWN",
                "type": "StudyCourse"
            }
        fieldset_xpath = "//fieldset[@class='highlight-blue']"
        fieldsets = response.xpath(fieldset_xpath)
        needed_fieldset = fieldsets[1]
        ahref_links = needed_fieldset.xpath('ul/li/a')
        module_links = ahref_links.getall()
        for module_link in ahref_links:
            request = scrapy.Request(response.urljoin(module_link.attrib['href']),
                                     callback=self.extract_lectures_from_module)
            request.meta['parent_course'] = parent_course
            yield request

    def extract_lectures_from_module(self, response):
        try:
            parent_course = response.meta["parent_course"]
        except:
            parent_course = {
                "name": "UNKNOWN",
                "url": "UNKNOWN",
                "id": "UNKNOWN",
                "type": "StudyCourse"
            }
        fieldset_xpath = "//fieldset[@class='highlight-blue']"
        fieldsets = response.xpath(fieldset_xpath)
        needed_fieldset = fieldsets[3]
        ahref_links = needed_fieldset.xpath('ul/li/a')
        lecture_links = ahref_links.getall()

        for lecture_link in ahref_links:
            request = scrapy.Request(response.urljoin(lecture_link.attrib['href']),
                                     callback=self.extract_lecture_details)
            request.meta['parent_course'] = parent_course
            yield request

    def filter_links_by_lecture_katalog(self, link_elements):
        lecture_links = []
        katalog_links = []
        unknown_links = []
        lecture_regex = "(pruefung/)(\d{1,})(/detail)"
        katalog_regex = "(katalog/)(\d{1,})(/detail)"
        for link in link_elements:
            try:
                link_text = link.attrib["href"]
                if re.search(lecture_regex, link_text) is not None:
                    lecture_links.append(link)
                elif re.search(katalog_regex, link_text) is not None:
                    katalog_links.append(link)
                else:
                    unknown_links.append(link)
            except:
                unknown_links.append(link)
        return {
            "lecture_links": lecture_links,
            "katalog_links": katalog_links,
            "unknown_links": unknown_links
        }

    def extract_descriptions(self, description_rows):
        description = []
        for row in description_rows:
            data_cells = row.xpath(".//td")
            for cell in data_cells:
                description.append(cell.get())

        return " ".join(description)

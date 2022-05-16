# run following command to store results of scraping in temp_results.json
# scrapy crawl main -o temp_results.json
# -*- coding: utf-8 -*-
import scrapy
import re
from ..items import StudyProgram, Category, Subject, TimeEntry, Person, Einzeltermin


class CourseCatalogSpider(scrapy.Spider):
    name = 'main'
    allowed_domains = ['campus.uni-due.de']
    # start_urls = [
    #     'https://campus.uni-due.de/lsf/rds?state=wtree&search=1&trex=step&root120212=288350%7C292081%7C290850&P.vx=kurz'
    # ]
    table_summary_for_time = "Übersicht über alle Veranstaltungstermine"
    table_summary_for_persons = "Verantwortliche Dozenten"
    table_summary_for_basics = "Grunddaten zur Veranstaltung"
    table_summary_for_more = "Weitere Angaben zur Veranstaltung"

    def __init__(self, url="", all_engineering_faculties=False, *args, **kwargs):
        self.start_urls = [url]
        self.all_engineering_faculties = all_engineering_faculties
        super(CourseCatalogSpider, self).__init__(*args, **kwargs)

    def parse(self, response):
        if self.all_engineering_faculties:  # if we want to scrape all engineering faculties
            return self.extract_faculties(response)
        return self.extract_studyprograms(response)

    def extract_faculties(self,
                          response):  # if we want to scrape all engineering faculties, we need to scrape all the study programs first
        links = response.xpath("//a")
        number_of_layers = response.url.count("%7C")
        faculty_links = self.filter_links_by_layer(links, "%7C", number_of_layers + 1)
        for faculty_link in faculty_links:
            faculty_name = faculty_link.css('::text').get().strip()
            page = response.urljoin(faculty_link.attrib['href'])
            request = scrapy.Request(page, callback=self.extract_studyprograms)
            request.meta["faculty_name"] = faculty_name
            yield request

    def extract_studyprograms(self, response):
        # width = 60
        links = response.xpath('//a')
        number_of_layers = response.url.count("%7C")
        filtered_links = self.filter_links_by_layer(links, "%7C", number_of_layers + 1)
        try:
            parent_faculty_name = response.meta["faculty_name"]
        except Exception:
            parent_faculty_name = "INKO"

        for link in filtered_links:
            page = response.urljoin(link.attrib['href'])
            name = link.css('::text').get().strip()
            request = scrapy.Request(page, callback=self.extract_categories)
            request.meta["catalog"] = parent_faculty_name
            request.meta['faculty'] = link
            request.meta["id"] = self.extract_category_id(page)
            request.meta["name"] = name
            request.meta["root_id"] = self.extract_category_id(page)
            yield request

    def extract_categories(self, response):
        try:
            parent = response.meta['parent']
        except Exception:  # main study programs (first layer in the lecture tree)
            parent = {
                "url": response.meta['faculty'].attrib['href'],
                "catalog": response.meta["catalog"],
                "id": response.meta["id"],
                "name": response.meta["name"],
                "root_id": response.meta["root_id"]
            }
        number_of_layers = parent['url'].count('%7C')
        links = response.xpath("//a")

        # extract categories
        categories = []
        category_links = self.filter_links_by_layer(links, '%7C', number_of_layers + 1)
        for category_link in category_links:
            if "Raumbuchung" not in category_link.css('::text').get():
                url = category_link.attrib['href']
                name = category_link.css('::text').get()
                id = self.extract_category_id(url)
                category = Category(url=url, name=name, categories=[], id=id, parent_id=parent['id'],
                                    root_id=parent['root_id'])
                page = response.urljoin(url)
                request = scrapy.Request(page, callback=self.extract_categories)
                request.meta['parent'] = category
                res = yield request
                self.log(res)
                categories.append(category['id'])

        parent['categories'] = categories

        # filter all subjects and add them to the category
        subjects = []
        subject_links = self.filter_links_by_subjects(links)
        for link in subject_links:
            url = link.attrib['href']
            page = response.urljoin(url)
            if link.css('::text').get().strip() not in ["belegen/abmelden", "Raumbuchung"]:
                name = link.css('::text').get()
                id = self.extract_subject_id(url)
                subject = Subject(url=url, name=name, id=id, parent_id=parent['id'], root_id=parent['root_id'])
                request = scrapy.Request(page, callback=self.extract_subject, dont_filter=True)
                request.meta['subject'] = subject
                subjects.append(subject['id'])
            yield request

        parent['subjects'] = subjects
        yield parent

    def extract_subject(self, response):
        subject = response.meta['subject']
        # extract Grunddaten - table
        subject_type = response.xpath("//table[1]//tr[1]/td[1]/text()").get()
        semester = response.xpath("//table[1]//tr[3]/td[1]/text()").get()
        sws = response.xpath("//table[1]//tr[3]/td[2]/text()").get()
        longtext = response.xpath("//table[1]//tr[1]/td[2]/text()").get()
        shorttext = response.xpath("//table[1]//tr[2]/td[2]/text()").get()
        language = response.xpath("//table[1]//tr[8]/td[1]/text()").get()
        hyperlink = response.xpath("//table[1]//tr[7]/td[1]/text()").get()

        # timetable links
        table_xpath = "//table[@summary=\"" + self.table_summary_for_time + "\"]"
        tables = response.xpath(table_xpath)
        for table_index, table in enumerate(tables):
            timetable_links = []
            number_entries = int(float(table.xpath("count(tr)").get()) - 1)
            for index in range(2, 2 + number_entries):
                link = table.xpath('tr[' + str(index) + ']/td[1]/a[1]')
                timetable_links.append(link.attrib['href'])

            for index, link in enumerate(timetable_links):
                request = scrapy.Request(link, callback=self.extract_einzeltermine)
                request.meta['index'] = index
                request.meta['table_index'] = table_index
                request.meta['subject_id'] = subject['id']
                yield request

        # adding table data ot subject
        subject['subject_type'] = subject_type
        subject['semester'] = semester
        subject['sws'] = sws
        subject['longtext'] = longtext
        subject['shorttext'] = shorttext
        subject['language'] = language
        subject['hyperlink'] = hyperlink

        # provide timetable entries
        subject['timetable'] = self.extract_timetable(response)

        # provide persons
        subject['persons'] = self.extract_persons(response)

        path = "//table[@summary=\"" + self.table_summary_for_more + "\"]"
        subject['description'] = " ".join(
            response.xpath(path + "/*/th[contains(text(),'Kommentar')]/following-sibling::*//text()").getall())

        yield subject

    def extract_timetable(self, response):
        '''
        Extracts all entries from the timetable of a subject
        :param response:
        :return: list of time entries
        '''
        entries = []
        table_xpath = "//table[@summary=\"" + self.table_summary_for_time + "\"]"
        tables = response.xpath(table_xpath)
        einzeltermine_links = []
        for table in tables:
            number_entries = int(float(table.xpath("count(tr)").get()) - 1)
            for index in range(2, 2 + number_entries):
                entry_element_str = "tr[" + str(index) + "]"
                link_selector = table.xpath(entry_element_str + "/td[1]/a[1]")
                id = self.extract_einzeltermin_id(link_selector.attrib['href'])
                day = self.clear_string(table.xpath(entry_element_str + "/td[2]/text()").get())
                time = self.clear_string(table.xpath(entry_element_str + "/td[3]/text()").get())
                rhythm = self.clear_string(table.xpath(entry_element_str + "/td[4]/text()").get())
                duration = self.clear_string(table.xpath(entry_element_str + "/td[5]/text()").get())
                room = self.clear_string(table.xpath(entry_element_str + "/td[6]/text()").get())
                status = self.clear_string(table.xpath(entry_element_str + "/td[8]/text()").get())
                comment = self.clear_string(table.xpath(entry_element_str + "/td[9]/text()").get())
                elearn = self.clear_string(table.xpath(entry_element_str + "/td[12]/text()").get())
                einzeltermine_link = ''
                if "expand" in table.xpath(entry_element_str + "/td[1]/a[1]/@href").get():
                    einzeltermine_link = table.xpath(entry_element_str + "/td[1]/a[1]/@href").get()
                entries.append(TimeEntry(id=id,
                                         day=day,
                                         time=time,
                                         rhythm=rhythm,
                                         duration=duration,
                                         room=room,
                                         status=status,
                                         comment=comment,
                                         elearn=elearn,
                                         einzeltermine_link=einzeltermine_link)
                               )
                einzeltermine_links.append(einzeltermine_link)
        return {'entries': entries, 'links': einzeltermine_links}

    def extract_einzeltermine(self, response):
        url = response.url
        termin_id = url.split('=')[-1]
        index = response.meta['index']
        table_index = response.meta['table_index']
        subject_id = response.meta['subject_id']

        table_xpath = "//table[@summary=\"" + self.table_summary_for_time + "\"]"
        tables = response.xpath(table_xpath)
        table = tables[table_index]
        table_index = index + 3
        entry_element_str = "tr[" + str(table_index) + "]"
        rows = table.xpath(entry_element_str)
        needed_cells = rows[0].xpath('td/div/ul/li')
        einzeltermine = needed_cells.getall()

        scraped_einzeltermine = Einzeltermin(
            type='Einzeltermine',
            subject_id=subject_id,
            termin_id=termin_id,
            einzeltermine=einzeltermine
        )
        yield scraped_einzeltermine

    def extract_persons(self, response):
        '''
        Extracts all listed persons for a subject
        :param response:
        :return: list of persons
        '''
        persons = []
        table_xpath = "//table[@summary=\"" + self.table_summary_for_persons + "\"]"
        number_persons = int(float(response.xpath("count(" + table_xpath + "/tr)").get()) - 1)

        for index in range(2, 2 + number_persons):
            person = response.xpath(table_xpath + "/tr[" + str(index) + "]/td/a")
            uid = self.extract_professor_id(person.attrib['href'])
            name = self.clear_string(person.css("::text").get())
            url = person.attrib['href']
            persons.append(Person(id=uid, name=name, url=url))

        return persons

    def filter_links_by_layer(self, links, symbol, count):
        filtered_links = []
        link_elements_without_href = []
        for link in links:
            try:
                href = str(link.attrib['href'])
                if href.count(symbol) >= count and href.endswith("&P.vx=kurz"):
                    filtered_links.append(link)
            except:
                # self.log('excluded link with no href')
                # do nothing
                link_elements_without_href.append(link)

        # self.log("links without href: " +str(len(link_elements_without_href)))
        return filtered_links

    def filter_links_by_subjects(self, link_elements):
        filtered_links = []
        link_elements_without_href = []
        for link in link_elements:
            try:
                href = str(link.attrib['href'])
                if href.find("publishSubDir=veranstaltung") > 0:
                    filtered_links.append(link)
            except:
                # self.log('excluded link with no href')
                link_elements_without_href.append(link)
                # do nothing

        # self.log("links without href: " + str(len(link_elements_without_href)))
        return filtered_links

    def extract_category_id(self, href):
        return str(href).split('%7C')[-1].split('&')[0]

    def extract_subject_id(self, href):
        return re.findall(r'\d+', str(href))[0]

    def extract_professor_id(self, href):
        return str(href).split('=')[-1]

    def clear_string(self, string_to_clear):
        return string_to_clear.replace("\t", "").replace("\n", "").strip(' ')

    def extract_einzeltermin_id(self, einzeltermin_link: str):
        if einzeltermin_link.split('#')[-1].isnumeric():
            return einzeltermin_link.split('#')[-1]
        return ''

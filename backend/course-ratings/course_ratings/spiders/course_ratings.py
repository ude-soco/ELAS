# -*- coding: utf-8 -*-
import scrapy
from ..items import Rating, CourseRating

# start it with scrapy crawl -a email = "..." -a password = "..."
class CourseRatingsSpider(scrapy.Spider):
    name = 'course-ratings'
    allowed_domains = ['www.meinprof.de','www.meinprof.de/login']
    start_urls = ['https://www.meinprof.de/login']
    course_url = 'https://www.meinprof.de/unis/nordrhein-westfalen/uni-duisburg-essen/kurse/'

    def __init__(self, email = None, password = None, *args, **kwargs):
        super(CourseRatingsSpider, self).__init__(*args, **kwargs)
        self.http_user = email
        self.http_password = password

    def parse(self, response):
        '''
        Login is needed to see the detailed ratings, so this function logs in a user
        :param response:
        :return:
        '''
        return [scrapy.FormRequest.from_response(
            response,
            formxpath='//form[@id="login_form"]',
            formdata = {'user[email]': self.http_user, 'user[password]': self.http_password},
            callback=self.after_login
        )]

    def after_login(self, response):
        '''
        Checks if the user is logged in. If so it will start with the parsing of the courses. Otherwise the program ends
        :param response:
        :return:
        '''
        self.log('after login:')
        self.log(response.url)
        notice = response.css('#flash_notice').get()
        if notice is None or str(notice).lower().find('login erfolgreich') == -1:
            self.error("not logged in")
            return

        else:
            self.log('logged in!')
            return scrapy.Request(self.course_url, callback=self.parse_courselist)

    def parse_courselist(self, response):
        '''
        Extracts for each course the name, prof and url for ratings, and scrapes the ratings for each course
        :param response:
        :return:
        '''
        for courseElement in response.css('#coursesTable tr'):
            linkElement = courseElement.css('td:first-child')
            url = 'https://www.meinprof.de' + str(linkElement.css('a::attr(href)').get())
            name = str(linkElement.css('a::text').get())
            prof = str(courseElement.css('td:nth-child(4) a::text').get())

            course = CourseRating(url = url, name = name, prof = prof, ratings = [])
            if url is not None:
                rating_page = response.urljoin(url+'/bewertungen')
                request = scrapy.Request(rating_page, callback=self.parse_page_with_ratings)
                request.meta['course'] = course
                yield request

    def parse_page_with_ratings(self, response):
        '''
        Extracts all ratings of a course and adds them to the course object. The course object has to be provided as meta data in the request!
        :param response:
        :return:
        '''
        course = response.meta['course']
        ratings = course['ratings']
        surrounding_div = response.css('div[class="break"]')
        # extract title of the semesters the ratings are in
        semesters_title = surrounding_div.css('h2::text').getall()
        #extract overall (left side) of ratings per semester
        semesters_rating_tables = surrounding_div.css('table[class="notrhover ratings full"]')

        # extract all ratings for each semester that is provided
        for index, semester_rating_table in enumerate(semesters_rating_tables):
            semester = semesters_title[index]
            # left tables with ratings for recommendation and node effort for this semester
            rating_comprehension_tables = semester_rating_table.css('tr td>table')
            # right tables with details of ratings (fairness, support, understandability, fun and interests) for this semester
            detail_rating_tables = semester_rating_table.css('td>div>table')

            # iterate through all rating entries for the given semester with ratings for average, recommendation and effort and create a new rating item for each
            semester_ratings = self.extract_rating_comprehension(semester, rating_comprehension_tables)

            # extract detailed rating information for each rating entry and add them to the rating object created before
            ratings.extend(self.extract_rating_details(detail_rating_tables, semester_ratings))

            # todo: extract comments

        return course

    def extract_rating_comprehension(self, semester, tables_with_rating_comprehensions):
        '''
        Extracts ratings for recommendation and node effort from the comprehension table of the course rating page
        :param semester:
        :param tables_with_rating_comprehensions:
        :return:
        '''
        semester_ratings = []
        for table in tables_with_rating_comprehensions:
            # elements 0 = average, 1 = recommendation, 2 = effort
            comprehensionElements = table.css('tr td:nth-child(2)')
            recommendation = comprehensionElements[1].css('::text').get()
            node_effort = comprehensionElements[2].css('div::attr(class)').get()

            # create new rating and add it to the ratings
            rating = Rating(semester=semester, recommendation=recommendation, node_effort=node_effort)
            semester_ratings.append(rating)

        return semester_ratings

    def extract_rating_details(self, tables_with_rating_details, semester_ratings):
        '''
        Extracts values for fairness, support, material, understandabilty, fun and interest that are provided in a table element
        :param tables_with_rating_details: SelectorList that contains all tables with ratings
        :return: A list of detailed ratings
        '''
        ratings = []
        for index, row in enumerate(tables_with_rating_details):
            # 1. td  are names
            # 2. td extracts Fairness, support and material
            fa_su_ma_row = row.css('tr>td:nth-child(2)')
            # 3. td is always empty
            # 4. td are names
            # 5. td extracts understandability, fun and interest
            un_fu_in_row = row.css('tr>td:nth-child(5)')

            rating = semester_ratings[index]
            rating['fairness'] = fa_su_ma_row[0].css('div::attr(class)').get()
            rating['support'] = fa_su_ma_row[1].css('div::attr(class)').get()
            rating['material'] = fa_su_ma_row[2].css('div::attr(class)').get()
            rating['understandability'] = un_fu_in_row[0].css('div::attr(class)').get()
            rating['fun'] = un_fu_in_row[1].css('div::attr(class)').get()
            rating['interest'] = un_fu_in_row[2].css('div::attr(class)').get()
            ratings.append(rating)

        return ratings
import json
import io
from orm_interface.entities.e3_entity.e3_courses import E3_Courses, E3_Rating
from orm_interface.entities.lecture import Lecture
from orm_interface.entities.studyprogram import StudyProgram
from orm_interface.entities.professor import Professor
from orm_interface.entities.timetable import Timetable
from orm_interface.base import Base, Session, engine
import datetime
import os

backend_directory = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

DATA_DIRECTORY = os.path.abspath(os.path.join(backend_directory, "scrapers", "merged_data.json"))
STUDYPROGRAMS_DIRECTORY = os.path.abspath(os.path.join(backend_directory, "scrapers", "study_programs.json"))
E3_COURSES = os.path.abspath(os.path.join(backend_directory, "bin", "e3_courses.json"))

Base.metadata.create_all(engine)
session = Session()

class Uploader:    
      
    def delete_all_lectures(self):
        all_lectures = session.query(Lecture).all()
        for lecture in all_lectures:
            session.delete(lecture)
        session.commit()

    def delete_all_timetables(self):
        all_timetables = session.query(Timetable).all()
        for timetable in all_timetables:
            session.delete(timetable)
        session.commit()

    def delete_all_professors(self):
        all_professors = session.query(Professor).all()
        for professor in all_professors:
            session.delete(professor)
        session.commit()

    def delete_all_studyprograms(self):
        all_studyprograms = session.query(StudyProgram).all()
        for study_program in all_studyprograms:
            session.delete(study_program)
        session.commit()

    #newly added method to clear the contents of e3_courses table and rating table
    def delete_all_e3_courses(self):
        self.delete_e3_rating()
        all_e3_courses = session.query(E3_Courses).all()
        for e3_courses in all_e3_courses:
            session.delete(e3_courses)
        session.commit()

    def delete_e3_rating(self):
        all_ratings = session.query(E3_Rating).all()
        for rating in all_ratings:
            session.delete(rating)
        session.commit()



    def upload_courses(self):
        self.delete_all_e3_courses()
        with io.open(E3_COURSES, 'r', encoding='utf8') as temp_e3_courses:
            
                json_e3_courses = json.load(temp_e3_courses)
        #preparing the data to be persisted to the database
        for e3_course in json_e3_courses:
                selected = e3_course["selected"] 
                name = e3_course["Title"]   
                url = e3_course["Link"]    
                catalog = e3_course["catalog"] 
                type = e3_course["Type"]   
                sws = e3_course["SWS"]    
                num_part = e3_course["Erwartete Teilnehmer"]    
                max_part = e3_course["Max. Teilnehmer"]    
                credit = e3_course["Credits"]    
                language = e3_course["Language"]    
                description = e3_course["Description"]    
                location = e3_course["Location"]    
                exam_type = e3_course["Exam"]    
                timetables = e3_course["Times_manual"]    
                aus_ing_bach = e3_course["Ausgeschlossen_Ingenieurwissenschaften_Bachelor"]    
               
                #The data is being laoded for commit
                e3_course_db = E3_Courses(
                    selected,
                    name,
                    url,
                    catalog,
                    type,
                    sws,
                    num_part,
                    max_part,
                    credit,
                    language,
                    description,
                    location,
                    exam_type,
                    timetables,
                    aus_ing_bach
                

                )
                #add the e3Course data to the session for a future commit
                session.add(e3_course_db)
                #We performed this step in order to get the id of the e3courses
                session.flush()
                
                fairness = e3_course["fairness"]    
                support = e3_course["support"]    
                material = e3_course["material"]    
                fun = e3_course["fun"]    
                comprehensibility = e3_course["comprehensibility"]    
                interesting = e3_course["interesting"]    
                grade_effort = e3_course["grade_effort"]

                ##The scrapping algorithm return float and an empty string incase the float value is 0.
                #The scrapping api has to be make better to store only float numbers
                if fairness == "":
                    fairness = 0.0

                if support == "":
                    support = 0.0

                if material == "":
                    material = 0.0
                if fun == "":
                    fun = 0.0
                if comprehensibility == "":
                    comprehensibility = 0.0

                if interesting == "":
                    interesting = 0.0
                if grade_effort == "":
                    grade_effort = 0.0
        


                e3_Rating_db = E3_Rating(
                    fairness = fairness,
                    support = support,
                    material = material,
                    fun = fun,
                    comprehensibility = comprehensibility,
                    interesting = interesting,
                    grade_effort = grade_effort,
                    e3_course_id=e3_course_db.id)
             
                session.add(e3_Rating_db)
                
        temp_e3_courses.close()
       
        try:
            session.commit()
        except Exception as e :
            print(str(e))
            session.rollback()
        finally:
            session.close()
            ## Delete the e3_course.json file if it exists
            try:
                open(E3_COURSES, "w").close()
                #os.remove(E3_COURSES)
              
            except FileNotFoundError:
                 print("File Does not exist")

    def upload_data(self):
        self.delete_all_lectures()
        self.delete_all_timetables()
        self.delete_all_professors()
        self.delete_all_studyprograms()
        professors_dict = {}
        studyprograms_dict = {}

        with io.open(STUDYPROGRAMS_DIRECTORY, 'r') as studyprograms_data:
            studyprograms_json = json.load(studyprograms_data)
            for studyprogram in studyprograms_json:
                if studyprogram['id'] not in studyprograms_dict.keys():
                    studyprograms_dict[studyprogram['id']] = StudyProgram(studyprogram['id'], studyprogram['name'],
                                                                          studyprogram['url'])
            
            studyprograms_data.close()

        with io.open(DATA_DIRECTORY, 'r', encoding='utf8') as data_file:
            data_json = json.load(data_file)
            print(len(data_json))
            for lecture in data_json:
                professors = lecture['persons']
                for professor in professors:
                    if professor['id'] not in professors_dict.keys():
                        professors_dict[professor['id']] = Professor(professor['id'], professor['name'],
                                                                     professor['url'])

            count = 0
            date_regex = "\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$"
            for lecture in data_json:
                lecture_id = lecture['id']
                lecture_url = lecture['url']
                lecture_name = lecture['name']
                lecture_subject_type = lecture['subject_type']
                lecture_semester = lecture['semester']
                lecture_sws = lecture['sws']
                lecture_longtext = lecture['longtext']
                lecture_shorttext = lecture['shorttext']
                lecture_language = lecture['language']
                lecture_hyperlink = lecture['hyperlink']
                lecture_description = lecture['description']
                lecture_keywords = lecture["keywords"]

                if lecture_subject_type == 'Übung' and 'Übung' not in lecture_name:
                    lecture_name = 'Übung zu ' + lecture_name
                elif lecture_subject_type == 'Übung/mit Tutorien' and 'Übung/mit Tutorien' not in lecture_name:
                    lecture_name = 'Übung/mit Tutorien zu ' + lecture_name
                elif lecture_subject_type == 'Tutorium' and 'Tutorium' not in lecture_name:
                    lecture_name = 'Tutorium zu ' + lecture_name
                elif lecture_subject_type == 'Einführung' and 'Einfürhrung' not in lecture_name:
                    lecture_name = 'Einführung zu ' + lecture_name

                temp_lecture = Lecture(id=lecture_id, name=lecture_name, url=lecture_url,
                                       subject_type=lecture_subject_type,
                                       semester=lecture_semester, sws=lecture_sws, longtext=lecture_longtext,
                                       shorttext=lecture_shorttext,
                                       language=lecture_language, hyperlink=lecture_hyperlink,
                                       description=lecture_description,
                                       keywords=lecture_keywords)

                professors = lecture['persons']
                for professor in professors:
                    temp_lecture.professors.append(professors_dict[professor['id']])

                root_id = lecture['root_id']
                for root in root_id:
                    temp_lecture.root_id.append(studyprograms_dict[root])

                timetable_entries = lecture['timetable']
                for timetable_entry in timetable_entries:
                    if timetable_entry['id'] == "":
                        timetable_entry['id'] = str(count)
                        count += 1

                    duration = ''
                    duration_from = duration_to = datetime.date(1999, 2, 4)
                    if type(timetable_entry['duration']) == str:
                        if 'am' in timetable_entry['duration']:
                            duration = 'AM'
                        elif 'von' in timetable_entry['duration']:
                            duration = 'VON'
                        elif len(timetable_entry['duration']) == 0:
                            duration = 'EMPTY'

                    dates = []
                    if 'dates' in timetable_entry.keys():
                        dates = timetable_entry['dates']
                        if len(dates) > 0:
                            duration_from = dates[0]
                            duration_to = dates[-1]

                    temp_entry = Timetable(timetable_entry['id'], timetable_entry['day'],
                                           timetable_entry['time']['from'],
                                           timetable_entry['time']['to'], timetable_entry['rhythm'], duration,
                                           duration_from, duration_to,
                                           timetable_entry['room'], timetable_entry['status'],
                                           timetable_entry['comment'],
                                           timetable_entry['elearn'], timetable_entry['einzeltermine_link'],
                                           lecture['id'],
                                           dates)
                    temp_lecture.timetables.append(temp_entry)
                session.add(temp_lecture)
               

            data_file.close()

        session.commit()
        session.close()




    

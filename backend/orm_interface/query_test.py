from entities.lecture import Lecture, Professor, StudyProgram, Timetable
from base import Base, Session, engine
from Keyword_Extractor.graph_based.singlerank import SingleRank
DATA_DIRECTORY = 'D:\\Thesis scraper\\scrapers\\merged_data.json'

Base.metadata.create_all(engine)

session = Session()

all_lectures = session.query(Lecture).all()
lecture_description = all_lectures[1].description
print(lecture_description)

num = 15
pos = {'NOUN', 'PROPN', 'ADJ'}
extractor = SingleRank()
extractor.load_document(input=lecture_description, language='en_core_web_sm')
extractor.candidate_selection(pos=pos)
extractor.candidate_weighting(window=10, pos=pos)
keyphrases = extractor.get_n_best(n=num)
print(keyphrases)

session.close()
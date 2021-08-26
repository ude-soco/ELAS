CURRENT_SEMESTER = "SoSe 2019"

#todo hier das erstellen neuer subject machen?
def create_dict_from_lists(first_list, second_list):
    '''
    Creates one dictionary from two lists. The objects in the list need to have "name" as attribute.
    It will be used as key in the dictionary.
    :param first_list:
    :param second_list:
    :return:
    '''
    dictionary = dict()
    for obj in first_list:
        dictionary[obj['name']] = [obj]
    for obj in second_list:
        if obj['name'] in dictionary:
            objs = dictionary[obj['name']]
            objs.append(obj)
            dictionary[obj['name']] = objs
        else:
            dictionary[obj['name']] = [obj]

    return dictionary


def merge_list_of_categories(categories_dict):
    '''
        Merges all categories that has the same title
        :param categories_dict: a dict with the name of categories as key and a list of subjects as value
        :return: a list of merged categories
        '''
    # merging subcategories
    processed_categories = []
    for category_list in categories_dict.values():
        first_cat = category_list[0]
        if len(category_list) == 2:
            second_cat = category_list[1]
            merged_cat = merge_categories(first_cat, second_cat)
            processed_categories.append(merged_cat)
        else:
            processed_categories.append(create_new_category(first_cat))

    return processed_categories


def merge_dict_of_subjects(subjects_dict):
    '''
    Merges all subjects that has the same title
    :param subjects_dict: a dict with the name of the subject as key and a list of subjects as value
    :return: a list of merged subjects
    '''
    # merging subjects
    processed_subjects = []
    for subject_list in subjects_dict.values():
        first_subject = subject_list[0]
        if len(subject_list) == 2:
            second_subject = subject_list[1]
            merged_subject = merge_subjects(first_subject, second_subject)
            processed_subjects.append(merged_subject)
        else:
            processed_subjects.append(create_new_subject(first_subject))

    return processed_subjects


def merge_categories(first_category, second_category):
    '''
    Merges two categories into one
    :param first_category: this category will be used as base category
    :param second_category: this category will be merged into the first one
    :return: merges category
    '''
    merged_category = create_new_category(first_category)
    sec_category = create_new_category(second_category)
    merged_category['ids'].extend(sec_category['ids'])
    merged_category['parent_ids'].extend(sec_category['parent_ids'])
    merged_category['type'] = "category"

    #add all categories by their name to the dict
    categories_dict = create_dict_from_lists(first_category['categories'], sec_category['categories'])
    subjects_dict = create_dict_from_lists(first_category['subjects'], sec_category['subjects'])

    # merging subcategories
    processed_categories = merge_list_of_categories(categories_dict)

    #merging subjects
    processed_subjects = merge_dict_of_subjects(subjects_dict)

    # set categories and subjects of merged category
    merged_category['categories'] = processed_categories
    merged_category['subjects'] = processed_subjects

    return merged_category


def merge_subjects(first_subject, second_subject):
    '''
    Combine two equal subjects into one
    :param first_subject:
    :param second_subject:
    :return:
    '''
    merged_subject = dict()
    first_subject = create_new_subject(first_subject)
    second_subject = create_new_subject(second_subject)
    if first_subject['semesters'][0] == CURRENT_SEMESTER:
        merged_subject = first_subject
    else:
        merged_subject = second_subject

    merged_subject['semesters'] = []
    merged_subject['semesters'].extend(first_subject['semesters'])
    merged_subject['semesters'].extend(second_subject['semesters'])
    merged_subject['ids'] = first_subject['ids']
    merged_subject['ids'].extend(second_subject['ids'])
    merged_subject['studyprograms'] = [first_subject['studyprograms'],second_subject['studyprograms']]
    merged_subject['parent_ids'] = [first_subject['parent_ids'], second_subject['parent_ids']]

    return merged_subject


def create_new_subject(old_subject):
    '''
    Create a new subject and copy all attributes from old one except the semester
    :param old_subject:
    :return:
    '''
    if 'id' in old_subject:
        new_subject = dict()

        attribute_list = ['name','url','subject_type', 'shorttext', 'longtext', 'sws', 'persons','timetable','language','hyperlink','studyprograms']
        for attribute in attribute_list:
            new_subject[attribute] = old_subject[attribute]

        new_subject['semesters'] = [old_subject['semester']]
        new_subject['ids'] = [old_subject['id']]
        new_subject['parent_ids'] = [old_subject['parent_id']]

    else:
        new_subject = old_subject # already a new one
    return new_subject

def create_new_category(old_category):
    '''
    Creates a new category and replaces parent_id and id
    :param old_category:
    :return:
    '''
    if 'id' in old_category:
        new_cat = dict()

        attribute_list = ['name', 'url']
        for attribute in attribute_list:
            new_cat[attribute] = old_category[attribute]

        new_cat['ids'] = [old_category['id']]
        new_cat['parent_ids'] = [old_category['parent_id']]
        new_cat['type'] = 'categories'

        # merging subcategories
        processed_categories = merge_list_of_categories(
            create_dict_from_lists(old_category['categories'],[])
        )

        # merging subjects
        processed_subjects = merge_dict_of_subjects(
            create_dict_from_lists(old_category['subjects'],[])
        )

        # set categories and subjects of merged category
        new_cat['categories'] = processed_categories
        new_cat['subjects'] = processed_subjects
    else:
        new_cat = old_category #already a new one

    return new_cat

def process_timetable_of_subject(subject):

    processed_timetable = []
    for entry in subject['timetable']:
        times = entry['time'].split('\xa0bis\xa0')
        if len(times) == 2:
            time = {
                'from': times[0].replace('\xa0',''),
                'to': times[1].replace('\xa0',''),
            }
            entry['time'] = time

        durations = entry['duration'].split('\xa0bis\xa0')
        if len(durations) == 2:
            duration = {
                'from': durations[0].replace('\xa0',''),
                'to': durations[1].replace('\xa0','')
            }
            entry['duration'] = duration

        processed_timetable.append(entry)

    subject['timetable'] = processed_timetable
    print("Processed subject: "+str(subject))
    return subject


def merge_studyprograms(first_studyprogram, second_studyprogram):
    merged_studyprogram = first_studyprogram

    # merging categories
    categories_dict = create_dict_from_lists(first_studyprogram['categories'], second_studyprogram['categories'])
    merged_categories = merge_list_of_categories(categories_dict)
    merged_studyprogram['categories'] = merged_categories

    # merging subjects which are at the root of a studyprogram
    if 'subjects' in first_studyprogram and 'subjects' in second_studyprogram:
        subjects_dict = create_dict_from_lists(first_studyprogram['subjects'], second_studyprogram['subjects'])
        merged_subjects = merge_dict_of_subjects(subjects_dict)
        merged_studyprogram['subjects'] = merged_subjects

    return merged_studyprogram


def transform_categories_and_subjects_of_studyprogram(studyprogram):
    '''
    Transforms categories and subjects for the given studyprogram.
    For more information see create_new_subject and create_new_category
    :param studyprogram:
    :return:
    '''
    categories = create_dict_from_lists(studyprogram['categories'], [])
    studyprogram['categories'] = merge_list_of_categories(categories)

    # merging subjects which are at the root of a studyprogram
    if 'subjects' in studyprogram:
        subjects = create_dict_from_lists(studyprogram['subjects'], [])
        merged_subjects = merge_dict_of_subjects(subjects)
        studyprogram['subjects'] = merged_subjects

    return studyprogram
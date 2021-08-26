import json
import sys

INPUT_FILE_ = sys.argv[1]
OUTPUT_FILE = sys.argv[2]

with open(INPUT_FILE_, 'r') as input_file:
    data = json.load(input_file)

    # iterate over all ratings and collect stats
    for subject in data:
        attribute_dict = {
            'fairness' : [],
            'support' : [],
            'material' : [],
            'fun' : [],
            'understandability' : [],
            'interest' : [],
            'node_effort' : [],
            'recommendation' : []
        }

        for rating in subject['ratings']:
            for attrib in attribute_dict:
                try:
                    value = rating[attrib]
                    if value is not None:
                        if attrib == "recommendation":
                            if str(value).lower() == "ja":
                                value = 5
                            else:
                                value = 0

                        #normalize and add value: value range between 0 - 5
                        attribute_dict[attrib].append(float(value)*100/5 )
                except:
                    # do nothing
                    print(attrib)

        #add stats to course
        for attrib in attribute_dict:
            if len(attribute_dict[attrib]) != 0:
                subject[attrib] = sum(attribute_dict[attrib])/len(attribute_dict[attrib])
            else:
                subject[attrib] = None

    with open(OUTPUT_FILE, "w") as output_file:
        json.dump(data, output_file,ensure_ascii=False)
        output_file.close()
    input_file.close()

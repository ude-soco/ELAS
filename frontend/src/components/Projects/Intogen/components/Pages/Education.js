import React, {useState} from 'react';
import '../../Intogen.css'
import LearningCards from '../Cards/LearningCards'
import Footer from '../Reusable/Footer'
import Diagram from '../Diagrams/Diagram'
import data, {studyData} from '../Diagrams/Data/out';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import {dataCollection} from "../Reusable/functions";

export default function Education() {
  const [females, setFemales] = useState([]);
  const [males, setMales] = useState([]);

  const [others, setOthers] = useState([]);

  const [average, setAverage] = useState([]);
  const [amountMales, setAmountMales] = useState();
  const [amountFemales, setAmountFemales] = useState();

  // Comment: unnecessary usage of state
  // const [category, setCategory] = useState([]);
  const category = ['Activist', 'Reflector', 'Theorist', 'Pragmatist'];
  const [studyType, setStudyType] = useState({
    type: "",
    programs: []
  });
  const [studyMajor, setStudyMajor] = useState([]);
  const [selectMajor, setSelectMajor] = useState("")
  const [studyProgram, setStudyProgram] = useState([]);

  const [popUp, setPopUp] = useState([]);
  const uniqueStudyPrograms = getUnique(data, 'Study_program');
  const major = getUnique(data, 'Major');
  const ise = [{ise: 'International Studies in Engineering'}];
  const [value, setValue] = useState('master');

  function getUnique(arr, index) {
    const unique = arr
      .map(e => e[index])
      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)
      // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e]);
    return unique;
  }

  const handleSelectType = (events, values) => {
    /*
    const allFemales = data.filter(a=>a.Gender === 'Female');
    const allMales = data.filter(a=>a.Gender === 'Male');
    const amountAllFemales = allFemales.length;
    const amountAllMales = allMales.length;

    // Male, Activist Average (ISE)
    let activistSumMales = 0;
    for(let i = 0; i<amountAllMales; i++) {
        activistSumMales += allMales[i].Activist
    }
    let activistAverageMales = activistSumMales / amountAllMales

    // Female, Activist Average (ISE)
    let activistSumFemales = 0;
    for(let i = 0; i<amountAllFemales; i++) {
        activistSumFemales += allFemales[i].Activist
    }
    let activistAverageFemales = activistSumFemales / amountAllFemales

    // Male, Reflector Average (ISE)
    let reflectorSumMales = 0;
    for(let i = 0; i<amountAllMales; i++) {
        reflectorSumMales += allMales[i].Reflector
    }
    let reflectorAverageMales = reflectorSumMales / amountAllMales

    // Female, Reflector Average (ISE)
    let reflectorSumFemales = 0;
    for(let i = 0; i<amountAllFemales; i++) {
        reflectorSumFemales += allFemales[i].Reflector
    }
    let reflectorAverageFemales = reflectorSumFemales / amountAllFemales

    // Male, Theorist Average (ISE)
    let theoristSumMales = 0;
    for(let i = 0; i<amountAllMales; i++) {
        theoristSumMales += allMales[i].Theorist
    }
    let theoristAverageMales = theoristSumMales / amountAllMales

    // Female, Theorist Average (ISE)
    let theoristSumFemales = 0;
    for(let i = 0; i<amountAllFemales; i++) {
        theoristSumFemales += allFemales[i].Theorist
    }
    let theoristAverageFemales = theoristSumFemales / amountAllFemales

    // Male, Pragmatist Average (ISE)
    let pragmatistSumMales = 0;
    for(let i = 0; i<amountAllMales; i++) {
        pragmatistSumMales += allMales[i].Pragmatist
    }
    let pragmatistAverageMales = pragmatistSumMales / amountAllMales

    // Female, Pragmatist Average (ISE)
    let pragmatistSumFemales = 0;
    for(let i = 0; i<amountAllFemales; i++) {
        pragmatistSumFemales += allFemales[i].Pragmatist
    }
    let pragmatistAverageFemales = pragmatistSumFemales / amountAllFemales

    // Average Activist
    let averageActivist = (activistAverageMales + activistAverageFemales) / 2

    // Average Reflector
    let averageReflector = (reflectorAverageMales + reflectorAverageFemales) / 2

    // Average Theorist
    let averageTheorist = (theoristAverageMales + theoristAverageFemales) / 2

    // Average Pragmatist
    let averagePragmatist = (pragmatistAverageMales + pragmatistAverageFemales) / 2

    setMales([activistAverageMales, reflectorAverageMales, theoristAverageMales, pragmatistAverageMales])
    setFemales([activistAverageFemales, reflectorAverageFemales, theoristAverageFemales, pragmatistAverageFemales])
    setAverage([averageActivist, averageReflector, averageTheorist, averagePragmatist])
    setAmountmales(amountAllMales)
    setAmountfemales(amountAllFemales)

     */
    setStudyMajor([]);
    setStudyProgram([]);
    if (values === null) {
      setStudyType({
        type: "",
        programs: []
      });
    } else {
      setStudyType(values);
      let array = [];
      values.programs.map(program => array.push(program.Major));
      setStudyMajor(array.filter((item, pos) =>
        array.indexOf(item) === pos).sort((a, b) =>
        a.localeCompare(b)));
    }

    // Comment: Unnecessary set value of category
    // setCategory(['Activist', 'Reflector', 'Theorist', 'Pragmatist'])
  }

  const handleSelectMajor = (events, values) => {
    setStudyProgram([]);
    const filteredData = studyType.programs.filter(a => a.Major === values);
    setSelectMajor(values);
    let studyProgram = [];
    filteredData.map(program => studyProgram.push(program.Study_program));
    setStudyProgram(studyProgram.filter((item, pos) =>
      studyProgram.indexOf(item) === pos).sort((a, b) =>
      a.localeCompare(b)));

    // const array = dataCollection(filteredData);
    //
    // setMales(array.malesArray);
    // setFemales(array.femalesArray);
    // setOthers(array.othersArray);
    // setAverage(array.averageArray);
    // setAmountmales(array.countMale);
    // setAmountfemales(array.countFemale);

    /*
    setPopUp(values)
    setValue(events.target.value);

    const filter = data.filter(a => a.Major === values.Major)
    const uniqueStudyPrograms = getUnique(filter, 'Study_program');

    let studyPrograms = [];
    for (let i = 0; i < uniqueStudyPrograms.length; i++) {
      studyPrograms.push({label: uniqueStudyPrograms[i].Study_program})
    }
    setStudyProgram(studyPrograms)

    const males = filter.filter(b => b.Gender === 'Male');
    const females = filter.filter(b => b.Gender === 'Female');

    let amountMales = males.length
    let amountFemales = females.length

    // Male, Activist Average (Major)
    let activistSumMales = 0;
    for (let i = 0; i < amountMales; i++) {
      activistSumMales += males[i].Activist
    }
    let activistAverageMales = activistSumMales / amountMales

    // Female, Activist Average (Major)
    let activistSumFemales = 0;
    for (let i = 0; i < amountFemales; i++) {
      activistSumFemales += females[i].Activist
    }
    let activistAverageFemales = activistSumFemales / amountFemales

    // Male, Reflector Average (Major)
    let reflectorSumMales = 0;
    for (let i = 0; i < amountMales; i++) {
      reflectorSumMales += males[i].Reflector
    }
    let reflectorAverageMales = reflectorSumMales / amountMales

    // Female, Reflector Average (Major)
    let reflectorSumFemales = 0;
    for (let i = 0; i < amountFemales; i++) {
      reflectorSumFemales += females[i].Reflector
    }
    let reflectorAverageFemales = reflectorSumFemales / amountFemales

    // Male, Theorist Average (Major)
    let theoristSumMales = 0;
    for (let i = 0; i < amountMales; i++) {
      theoristSumMales += males[i].Theorist
    }
    let theoristAverageMales = theoristSumMales / amountMales

    // Female, Theorist Average (Major)
    let theoristSumFemales = 0;
    for (let i = 0; i < amountFemales; i++) {
      theoristSumFemales += females[i].Theorist
    }
    let theoristAverageFemales = theoristSumFemales / amountFemales

    // Male, Pragmatist Average (Major)
    let pragmatistSumMales = 0;
    for (let i = 0; i < amountMales; i++) {
      pragmatistSumMales += males[i].Pragmatist
    }
    let pragmatistAverageMales = pragmatistSumMales / amountMales

    // Female, Pragmatist Average (Major)
    let pragmatistSumFemales = 0;
    for (let i = 0; i < amountFemales; i++) {
      pragmatistSumFemales += females[i].Pragmatist
    }
    let pragmatistAverageFemales = pragmatistSumFemales / amountFemales

    // Average Activist
    let averageActivist = (activistAverageMales + activistAverageFemales) / 2

    // Average Reflector
    let averageReflector = (reflectorAverageMales + reflectorAverageFemales) / 2

    // Average Theorist
    let averageTheorist = (theoristAverageMales + theoristAverageFemales) / 2

    // Average Pragmatist
    let averagePragmatist = (pragmatistAverageMales + pragmatistAverageFemales) / 2

    setMales([activistAverageMales, reflectorAverageMales, theoristAverageMales, pragmatistAverageMales])
    setFemales([activistAverageFemales, reflectorAverageFemales, theoristAverageFemales, pragmatistAverageFemales])
    setAverage([averageActivist, averageReflector, averageTheorist, averagePragmatist])
    setAmountmales(amountMales)
    setAmountfemales(amountFemales)

     */

    // Comment: Unnecessary set value of category
    // setCategory(['Activist', 'Reflector', 'Theorist', 'Pragmatist'])
  }

  const handleSelectStudyProgram = (events, values) => {
    let major = studyType.programs.filter(a => a.Major === selectMajor);
    let program = major.filter(a => a.Study_program === values);
    const array = dataCollection(program);
    setMales(array.malesArray);
    setFemales(array.femalesArray);
    setOthers(array.othersArray);
    setAverage(array.averageArray);
    setAmountMales(array.countMale);
    setAmountFemales(array.countFemale);

    /*
    const filter = data.filter(a => a.Study_program === values.label)
    const study_programMales = filter.filter(t=>t.Gender ==='Male');
    const study_programFemales = filter.filter(t=>t.Gender ==='Female');

    let amountMales = study_programMales.length
    let amountFemales = study_programFemales.length

    // Male, Activist Average (Study Program)
    let activistSumMales = 0;
    let activistAverageMales = 0;
    if (amountMales !== 0) {
        for(let i = 0; i<amountMales; i++) {
            activistSumMales += study_programMales[i].Activist
        }
        activistAverageMales = activistSumMales / amountMales
    }

    // Female, Activist Average (Study Program)
    let activistSumFemales = 0;
    let activistAverageFemales = 0;
    if (amountFemales !== 0) {
        for(let i = 0; i<study_programFemales.length; i++) {
            activistSumFemales += study_programFemales[i].Activist
        }
        activistAverageFemales = activistSumFemales / amountFemales
    }

    // Male, Reflector Average (Study Program)
    let reflectorSumMales = 0;
    let reflectorAverageMales = 0;
    if (amountMales !== 0) {
        for(let i = 0; i<amountMales; i++) {
            reflectorSumMales += study_programMales[i].Reflector
        }
        reflectorAverageMales = reflectorSumMales / amountMales
    }

    // Female, Reflector Average (Study Program)
    let reflectorSumFemales = 0;
    let reflectorAverageFemales = 0;
    if (amountFemales !== 0) {
        for(let i = 0; i<amountFemales; i++) {
            reflectorSumFemales += study_programFemales[i].Reflector
        }
        reflectorAverageFemales = reflectorSumFemales / amountFemales
    }

    // Male, Theorist Average (Study Program)
    let theoristSumMales = 0;
    let theoristAverageMales = 0;
    if (amountMales !== 0) {
        for(let i = 0; i<amountMales; i++) {
            theoristSumMales += study_programMales[i].Theorist
        }
        theoristAverageMales = theoristSumMales / amountMales
    }

    // Female, Theorist Average (Study Program)
    let theoristSumFemales = 0;
    let theoristAverageFemales = 0;
    if (amountFemales !== 0) {
        for(let i = 0; i<amountFemales; i++) {
            theoristSumFemales += study_programFemales[i].Theorist
        }
        theoristAverageFemales = theoristSumFemales / amountFemales
    }

    // Male, Pragmatist Average (Study Program)
    let pragmatistSumMales = 0;
    let pragmatistAverageMales = 0;
    if (amountMales !== 0) {
        for(let i = 0; i<amountMales; i++) {
            pragmatistSumMales += study_programMales[i].Pragmatist
        }
        pragmatistAverageMales = pragmatistSumMales / amountMales
    }

    // Female, Pragmatist Average (Study Program)
    let pragmatistSumFemales = 0;
    let pragmatistAverageFemales = 0;
    if (amountFemales !== 0) {
        for(let i = 0; i<amountFemales; i++) {
            pragmatistSumFemales += study_programFemales[i].Pragmatist
        }
        pragmatistAverageFemales = pragmatistSumFemales / amountFemales
    }

    // Average Activist
    let averageActivist = (activistAverageMales + activistAverageFemales) / 2

    // Average Reflector
    let averageReflector = (reflectorAverageMales + reflectorAverageFemales) / 2

    // Average Theorist
    let averageTheorist = (theoristAverageMales + theoristAverageFemales) / 2

    // Average Pragmatist
    let averagePragmatist = (pragmatistAverageMales + pragmatistAverageFemales) / 2

    if (amountFemales == 0) {
        averageActivist = activistAverageMales
        averageReflector = reflectorAverageMales
        averageTheorist = theoristAverageMales
        averagePragmatist = pragmatistAverageMales
    }

    if (amountMales == 0) {
        averageActivist = activistAverageFemales
        averageReflector = reflectorAverageFemales
        averageTheorist = theoristAverageFemales
        averagePragmatist = pragmatistAverageFemales
    }

    setMales([activistAverageMales, reflectorAverageMales, theoristAverageMales, pragmatistAverageMales])
    setFemales([activistAverageFemales, reflectorAverageFemales, theoristAverageFemales, pragmatistAverageFemales])
    setAverage([averageActivist, averageReflector, averageTheorist, averagePragmatist])
    setAmountmales(amountMales)
    setAmountfemales(amountFemales)
    setCategory(['Activist','Reflector','Theorist','Pragmatist'])

     */
  }

  return (
    <>
      <hr class="border2" data-content="Education"/>
      <div className="page-container">
        <div className="leftSide">
          <h4>Choose your <b>Education Degree:</b></h4>
          <div class="boxes">
            <Autocomplete
              className="autocomplete"
              options={studyData}
              getOptionLabel={(option) => option.type}
              style={{width: 600, marginRight: 10}}
              size={"small"}
              onChange={handleSelectType}
              renderInput={(params) =>
                <TextField
                  {...params}
                  // label="ISE"
                  label="Study Type"
                  variant="outlined"
                />
              }
            />
            {/*{females.length !== 0 ? <> */}
            {studyMajor.length ?
              <Autocomplete
                className="autocomplete"
                // options={major}
                options={studyMajor}
                getOptionLabel={(option) => option}
                style={{width: 600, marginRight: 10}}
                size={"small"}
                onChange={handleSelectMajor}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    label="Major"
                    variant="outlined"
                  />
                }
              /> : <> </>}
            {studyProgram.length && studyMajor.length ?
              <Autocomplete
                className="autocomplete"
                options={studyProgram}
                getOptionLabel={(option) => option}
                style={{width: 600, marginRight: 10}}
                size={"small"}
                onChange={handleSelectStudyProgram}
                renderInput={(params) =>
                  <TextField
                    {...params}
                    label="Study program"
                    variant="outlined"
                  />}
              /> : <> </>}
          </div>
          <p className="subtitlesDiagram">
            Following are the learning types' averages of your study program.
          </p>
          <hr class="border"/>
          <div className="diagram-container">
            <Diagram
              females={females}
              males={males}
              others={others}
              average={average}
              amountmales={amountMales}
              amountfemales={amountFemales}
              categories={category}
            />
          </div>
        </div>
        <div className="rightSide">
          <h4>Kolb's Learning Styles</h4>
          <hr class="border1"/>
          <div className="cards1">
            <LearningCards/>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}


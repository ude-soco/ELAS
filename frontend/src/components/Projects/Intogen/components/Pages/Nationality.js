import React, {useState} from 'react';
import '../../Intogen.css'
import Footer from '../Reusable/Footer'
import LearningCards from '../Cards/LearningCards'
import Diagram from '../Diagrams/Diagram'
import data from '../Diagrams/Data/out';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {dataCollection} from "../Reusable/functions";

export default function Nationality() {
  const [females, setFemales] = useState([]);
  const [males, setMales] = useState([]);
  const [others, setOthers] = useState([]);
  const [average, setAverage] = useState([]);

  // Comment: JS naming convention should be camelCase
  // const [amountmales, setAmountmales] = useState();
  // const [amountfemales, setAmountfemales] = useState();
  const [amountMales, setAmountMales] = useState();
  const [amountFemales, setAmountFemales] = useState();

  // Comment: unnecessary usage of state
  // const [category, setCategory] = useState([]);
  const category = ['Activist', 'Reflector', 'Theorist', 'Pragmatist'];

  const uniqueNationalities = getUnique();
  // const uniqueNationalities = getUnique(data, 'Nationality');

  // Comment: Sorting is done inside the getUnique function
  // uniqueNationalities.sort((a, b) => (a.Nationality > b.Nationality) ? 1 : -1)

  // eliminates all duplicate countries
  // function getUnique(arr, index) {
  function getUnique() {
    // Comment: This returns a list of js object
    // const unique = arr
    //   .map(e => e[index])
    //   // store the keys of the unique objects
    //   .map((e, i, final) => final.indexOf(e) === i && i)
    //   // eliminate the dead keys & store unique objects
    //   .filter(e => arr[e]).map(e => arr[e]);
    // return unique;

    let array = [];
    data.map(d => array.push(d.Nationality));
    return array.filter((item, pos) => array.indexOf(item) === pos).sort((a, b) => a.localeCompare(b));
  }

  const handleSelect = (events, values) => {
    // Comment: Poor for loop usage, called multiple time to retrieve only once data at a time
    /*
    // const filter = data.filter(a => a.Nationality == values.Nationality)
    const filter = data.filter(a => a.Nationality === values)
    const nationalityMales = filter.filter(t => t.Gender === 'Male');
    const nationalityFemales = filter.filter(t => t.Gender === 'Female');

    let amountMales = nationalityMales.length
    let amountFemales = nationalityFemales.length

    // Male Average Nationality Activist
    let activistSumMales = 0;
    let activistAverageMales = 0;
    if (amountMales !== 0) {
      for (let i = 0; i < amountMales; i++) {
        activistSumMales += nationalityMales[i].Activist
      }
      activistAverageMales = activistSumMales / amountMales
    }

    // Female Average Nationality Activist
    let activistSumFemales = 0;
    let activistAverageFemales = 0;
    if (amountFemales !== 0) {
      for (let i = 0; i < amountFemales; i++) {
        activistSumFemales += nationalityFemales[i].Activist
      }
      activistAverageFemales = activistSumFemales / amountFemales
    }

    // Male Average Nationality Reflector
    let reflectorSumMales = 0;
    let reflectorAverageMales = 0;
    if (amountMales !== 0) {
      for (let i = 0; i < amountMales; i++) {
        reflectorSumMales += nationalityMales[i].Reflector
      }
      reflectorAverageMales = reflectorSumMales / amountMales
    }

    // Female Average Nationality Reflector
    let reflectorSumFemales = 0;
    let reflectorAverageFemales = 0;
    if (amountFemales !== 0) {
      for (let i = 0; i < amountFemales; i++) {
        reflectorSumFemales += nationalityFemales[i].Reflector
      }
      reflectorAverageFemales = reflectorSumFemales / amountFemales
    }

    // Male Average Nationality Theorist
    let theoristSumMales = 0;
    let theoristAverageMales = 0;
    if (amountMales !== 0) {
      for (let i = 0; i < amountMales; i++) {
        theoristSumMales += nationalityMales[i].Theorist
      }
      theoristAverageMales = theoristSumMales / amountMales
    }

    // Female Average Nationality Theorist
    let theoristSumFemales = 0;
    let theoristAverageFemales = 0;
    if (amountFemales !== 0) {
      for (let i = 0; i < amountFemales; i++) {
        theoristSumFemales += nationalityFemales[i].Theorist
      }
      theoristAverageFemales = theoristSumFemales / amountFemales
    }

    // Male Average Nationality Pragmatist
    let pragmatistSumMales = 0;
    let pragmatistAverageMales = 0;
    if (amountMales !== 0) {
      for (let i = 0; i < amountMales; i++) {
        pragmatistSumMales += nationalityMales[i].Pragmatist
      }
      pragmatistAverageMales = pragmatistSumMales / amountMales
    }

    // Female Average Nationality Pragmatist
    let pragmatistSumFemales = 0;
    let pragmatistAverageFemales = 0;
    if (amountFemales !== 0) {
      for (let i = 0; i < amountFemales; i++) {
        pragmatistSumFemales += nationalityFemales[i].Pragmatist
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
    */
    const filteredData = data.filter(a => a.Nationality === values);

    const array = dataCollection(filteredData);

    setMales(array.malesArray);
    setFemales(array.femalesArray);
    setOthers(array.othersArray);
    setAverage(array.averageArray);
    setAmountMales(array.countMale);
    setAmountFemales(array.countFemale);
    // Comment: Unnecessary set value of category
    // setCategory(['Activist', 'Reflector', 'Theorist', 'Pragmatist'])
  }

  return (
    <>
      <hr class="border2" data-content="Nationality"/>
      <div className="page-container">
        <div className="leftSide">
          <h4>Choose your <b>Nationality:</b></h4>
          <div class="boxes">
            <Autocomplete
              id="combo-box-demo"
              options={uniqueNationalities}
              getOptionLabel={(option) => option}
              style={{width: 200}}
              size={"small"}
              onChange={handleSelect}
              renderInput={(params) =>
                <TextField {...params} label="Nationality" variant="outlined"/>}
            />
          </div>
          <p className="subtitlesDiagram">
            Following are the learning types' averages of your nationality.
          </p>
          <hr class="border"/>
          <div className="diagram-container">
            <Diagram females={females}
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





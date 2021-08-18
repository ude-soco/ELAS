import React, {useState} from 'react';
import '../../Intogen.css'
import Footer from '../Reusable/Footer'
import LearningCards from '../Cards/LearningCards'
import Diagram from '../Diagrams/Diagram'
import data from '../Diagrams/Data/out';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function Nationality() {
  const [females, setFemales] = useState([]);
  const [males, setMales] = useState([]);
  const [others, setOthers] = useState([]);
  const [average, setAverage] = useState([]);
  // Comment: Naming convention should be camelCase
  // const [amountales, setAmountmales] = useState();
  // const [amountfemales, setAmountfemales] = useState();
  const [amountMales, setAmountMales] = useState();
  const [amountFemales, setAmountFemales] = useState();
  // const [category, setCategory] = useState([]);
  const category = ['Activist', 'Reflector', 'Theorist', 'Pragmatist'];
  // const uniqueNationalities = getUnique(data, 'Nationality');
  const uniqueNationalities = getUnique();
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

    const nationalityData = data.filter(a => a.Nationality === values);
    const amountMale = nationalityData.filter(a => a.Gender === 'Male').length;
    const amountFemale = nationalityData.filter(a => a.Gender === 'Female').length;
    const amountOther = nationalityData.filter(a => a.Gender === 'Other').length;

    let activistSumMale = 0;
    let reflectorSumMales = 0;
    let theoristSumMales = 0;
    let pragmatistSumMales = 0;
    let activistAverageMales = 0;
    let reflectorAverageMales = 0;
    let theoristAverageMales = 0;
    let pragmatistAverageMales = 0;

    let activistSumFemales = 0;
    let reflectorSumFemales = 0;
    let theoristSumFemales = 0;
    let pragmatistSumFemales = 0;
    let activistAverageFemales = 0;
    let reflectorAverageFemales = 0;
    let theoristAverageFemales = 0;
    let pragmatistAverageFemales = 0;

    let activistSumOther = 0;
    let reflectorSumOther = 0;
    let theoristSumOther = 0;
    let pragmatistSumOther = 0;
    let activistAverageOther = 0;
    let reflectorAverageOther = 0;
    let theoristAverageOther = 0;
    let pragmatistAverageOther = 0;


    for (let i = 0; i < nationalityData.length; i++) {
      if (nationalityData[i].Gender === "Male") {
        activistSumMale += nationalityData[i].Activist;
        reflectorSumMales += nationalityData[i].Reflector;
        theoristSumMales += nationalityData[i].Theorist;
        pragmatistSumMales += nationalityData[i].Pragmatist;
      } else if (nationalityData[i].Gender === "Female") {
        activistSumFemales += nationalityData[i].Activist;
        reflectorSumFemales += nationalityData[i].Reflector;
        theoristSumFemales += nationalityData[i].Theorist;
        pragmatistSumFemales += nationalityData[i].Pragmatist;
      } else {
        activistSumOther += nationalityData[i].Activist;
        reflectorSumOther += nationalityData[i].Reflector;
        theoristSumOther += nationalityData[i].Theorist;
        pragmatistSumOther += nationalityData[i].Pragmatist;
      }
    }

    if (amountMale) {
      activistAverageMales = activistSumMale / amountMale;
      reflectorAverageMales = reflectorSumMales / amountMale;
      theoristAverageMales = theoristSumMales / amountMale;
      pragmatistAverageMales = pragmatistSumMales / amountMale;
    }
    if (amountFemale) {
      activistAverageFemales = activistSumFemales / amountFemale;
      reflectorAverageFemales = reflectorSumFemales / amountFemale;
      theoristAverageFemales = theoristSumFemales / amountFemale;
      pragmatistAverageFemales = pragmatistSumFemales / amountFemale;
    }
    if (amountOther) {
      activistAverageOther = activistSumOther / amountOther;
      reflectorAverageOther = reflectorSumOther / amountOther;
      theoristAverageOther = theoristSumOther / amountOther;
      pragmatistAverageOther = pragmatistSumOther / amountOther;
    }

    let averageActivist = (activistAverageMales + activistAverageFemales + activistAverageOther) / 3;
    let averageReflector = (reflectorAverageMales + reflectorAverageFemales + reflectorAverageOther) / 3;
    let averageTheorist = (theoristAverageMales + theoristAverageFemales + theoristAverageOther) / 3;
    let averagePragmatist = (pragmatistAverageMales + pragmatistAverageFemales + pragmatistAverageOther) / 3;

    setMales([activistAverageMales, reflectorAverageMales, theoristAverageMales, pragmatistAverageMales]);
    setFemales([activistAverageFemales, reflectorAverageFemales, theoristAverageFemales, pragmatistAverageFemales]);
    setOthers([activistAverageOther, reflectorAverageOther, theoristAverageOther, pragmatistAverageOther]);
    setAverage([averageActivist, averageReflector, averageTheorist, averagePragmatist]);
    setAmountMales(amountMale);
    setAmountFemales(amountFemale);
    // Comment: Unnecessary setting of category
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





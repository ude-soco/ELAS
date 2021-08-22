import data from "../Diagrams/Data/out";

export const dataCollection = (filteredData) => {
  const amountMale = filteredData.filter(a => a.Gender === 'Male').length;
  const amountFemale = filteredData.filter(a => a.Gender === 'Female').length;
  const amountOther = filteredData.filter(a => a.Gender === 'Other').length;

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


  for (let i = 0; i < filteredData.length; i++) {
    if (filteredData[i].Gender === "Male") {
      activistSumMale += filteredData[i].Activist;
      reflectorSumMales += filteredData[i].Reflector;
      theoristSumMales += filteredData[i].Theorist;
      pragmatistSumMales += filteredData[i].Pragmatist;
    } else if (filteredData[i].Gender === "Female") {
      activistSumFemales += filteredData[i].Activist;
      reflectorSumFemales += filteredData[i].Reflector;
      theoristSumFemales += filteredData[i].Theorist;
      pragmatistSumFemales += filteredData[i].Pragmatist;
    } else {
      activistSumOther += filteredData[i].Activist;
      reflectorSumOther += filteredData[i].Reflector;
      theoristSumOther += filteredData[i].Theorist;
      pragmatistSumOther += filteredData[i].Pragmatist;
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

  return {
    malesArray: [activistAverageMales, reflectorAverageMales, theoristAverageMales, pragmatistAverageMales],
    femalesArray: [activistAverageFemales, reflectorAverageFemales, theoristAverageFemales, pragmatistAverageFemales],
    othersArray: [activistAverageOther, reflectorAverageOther, theoristAverageOther, pragmatistAverageOther],
    averageArray: [averageActivist, averageReflector, averageTheorist, averagePragmatist],
    countMale: amountMale,
    countFemale: amountFemale,
    countOther: amountOther
  };
}

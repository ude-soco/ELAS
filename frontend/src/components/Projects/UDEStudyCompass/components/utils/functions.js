export const validateSubjectType = (subject_type) => {
  if (subject_type === "Vorlesung") return "Lecture";
  else if (subject_type === "Übung") return "Exercise";
  else if (subject_type === "Praxisprojekt") return "Lab project";
  else if (subject_type === "Vorlesung/Übung") return "Lecture / Exercise";
  else if (subject_type === "Tutorium") return "Tutorial";
  else if (subject_type === "Praktikum") return "Lab";
  else if (subject_type === "Einzelveranstaltung") return "One time Event";
  else if (subject_type === "Einführung") return "Introductory Event";
  else if (subject_type === "Übung/Praktikum") return "Exercise / Lab";
  else return subject_type;
};

export const validateLanguage = (language) => {
  if (language === "Englisch") return "English";
  else if (language === "Deutsch") return "German";
  else if (language === "mehrsprachig") return "Multilingual";
  else return "Other";
};

export const validateSWS = (sws) => {
  const min = Math.min(...sws.map((item) => item.sws));
  const max = Math.max(...sws.map((item) => item.sws));
  return [min, max];
};

export const getRandomColor = () => {
  const colors = [
    "#303F9F",
    "#453187",
    "#A52885",
    "#F4888B",
    "#F39617",
    "#2EB2A5",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const parseDate = (date, time) => {
  let temp = time.split(":");
  let hours = temp[0];
  let minutes = temp[1];

  let setHours = new Date(new Date(date).setHours(hours));
  let setMinutes = new Date(new Date(setHours).setMinutes(minutes));
  return new Date(setMinutes);
};

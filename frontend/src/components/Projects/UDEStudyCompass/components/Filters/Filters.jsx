import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Slider from "@material-ui/core/Slider";
import RestoreIcon from "@material-ui/icons/Restore";
import Timetable from "./Timetable";
import {
  validateLanguage,
  validateSubjectType,
  validateSWS,
} from "../utils/functions";
import { loading } from "../../StudyCompassHomepage";

const Filters = (props) => {
  const { courses, applyFilters } = props;

  const [state, setState] = useState({
    filteredSchedule: [],
    courseType: [],
    sws: [],
    swsMin: 0,
    swsMax: 0,
    language: [],
  });
  const [reset, setReset] = useState(false);

  useEffect(() => {
    let filters = prepareFilters(courses);
    setState({
      ...state,
      courseType: filters.defaultCourseTypes,
      sws: filters.defaultSWS,
      swsMin: filters.defaultSWS[0],
      swsMax: filters.defaultSWS[1],
      language: filters.defaultLanguages,
    });
  }, []);

  const handleSWS = (event, newValue) => {
    setState({ ...state, sws: newValue });
  };

  const handleFilterSchedule = (timeData) => {
    let tempSchedule = [...state.filteredSchedule];
    if (tempSchedule.some((item) => item.id === timeData.id)) {
      let filter = tempSchedule.filter((item) => item.id !== timeData.id);
      setState({ ...state, filteredSchedule: filter });
    } else {
      tempSchedule.push(timeData);
      setState({ ...state, filteredSchedule: tempSchedule });
    }
  };

  const handleFilterCourseType = (event, newValue, type) => {
    let tempCourseType = [...state.courseType];
    let index = tempCourseType.findIndex((item) => item.id === type.id);
    tempCourseType[index].value = newValue;
    setState({ ...state, courseType: tempCourseType });
  };

  const handleFilterLanguage = (event, lang) => {
    let tempLanguage = [...state.language];
    let index = tempLanguage.findIndex((item) => item.id === lang.id);
    tempLanguage[index].value = !tempLanguage[index].value;
    setState({ ...state, language: tempLanguage });
  };

  const handleReset = () => {
    let filters = prepareFilters(courses);
    setState({
      ...state,
      filteredSchedule: [],
      courseType: filters.defaultCourseTypes,
      sws: filters.defaultSWS,
      swsMin: filters.defaultSWS[0],
      swsMax: filters.defaultSWS[1],
      language: filters.defaultLanguages,
    });
    setReset((prevState) => !prevState);
  };

  const handleSelectedFilters = (event) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    let tempLang = state.language.filter((item) => item.value !== false);
    let tempType = state.courseType.filter((item) => item.value !== false);
    applyFilters(event, {
      filteredSchedule: state.filteredSchedule,
      courseType: tempType,
      sws: state.sws,
      language: tempLang,
    });
  };

  return (
    <>
      <Paper elevation={0} style={{ padding: 16 }}>
        <Grid container justify="space-between" alignItems="center">
          <Typography color="textSecondary" gutterBottom>
            Filters
          </Typography>

          <Button
            style={{ color: "#FB9B0E" }}
            startIcon={<RestoreIcon />}
            onClick={handleReset}
          >
            Reset
          </Button>
        </Grid>
        {state.courseType.length !== 0 ? (
          <>
            <Grid container>
              <Grid
                item
                style={{
                  border: "1px solid #C4C4C4",
                  borderRadius: 8,
                  padding: 24,
                  margin: 8,
                }}
              >
                <Timetable
                  reset={reset}
                  handleFilterSchedule={handleFilterSchedule}
                />
              </Grid>

              <Grid
                item
                style={{
                  border: "1px solid #C4C4C4",
                  borderRadius: 8,
                  padding: 24,
                  margin: 8,
                }}
              >
                <FormControl component="fieldset">
                  <FormLabel component="legend">Course Type</FormLabel>
                  <FormGroup>
                    {state.courseType.map((type, index) => {
                      return (
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              checked={type.value}
                              color="primary"
                              onChange={(event, newValue) =>
                                handleFilterCourseType(event, newValue, type)
                              }
                              name={type.name}
                            />
                          }
                          label={type.name}
                        />
                      );
                    })}
                  </FormGroup>
                </FormControl>
              </Grid>

              <Grid item xs>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    style={{
                      border: "1px solid #C4C4C4",
                      borderRadius: 8,
                      padding: 24,
                      margin: 8,
                    }}
                  >
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Language</FormLabel>
                      <FormGroup>
                        {state.language.map((lang, index) => {
                          return (
                            <FormControlLabel
                              key={index}
                              control={
                                <Checkbox
                                  checked={lang.value}
                                  color="primary"
                                  onClick={(event) =>
                                    handleFilterLanguage(event, lang)
                                  }
                                  name={lang.name}
                                />
                              }
                              label={lang.name}
                            />
                          );
                        })}
                      </FormGroup>
                    </FormControl>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    style={{
                      border: "1px solid #C4C4C4",
                      borderRadius: 8,
                      padding: 24,
                      margin: 8,
                    }}
                  >
                    <Typography color="textSecondary">SWS</Typography>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography>{state.sws[0]}</Typography>
                      </Grid>

                      <Grid
                        item
                        xs
                        style={{ paddingLeft: 16, paddingRight: 16 }}
                      >
                        <Slider
                          value={state.sws}
                          min={state.swsMin}
                          max={state.swsMax}
                          step={1}
                          onChange={(event, value) => handleSWS(event, value)}
                          valueLabelDisplay="auto"
                        />
                      </Grid>

                      <Grid item>
                        <Typography>{state.sws[1]}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        ) : (
          <>{loading}</>
        )}

        <Grid container justify="flex-end">
          <Button
            style={{ backgroundColor: "#FB9B0E", color: "white" }}
            onClick={handleSelectedFilters}
          >
            Apply
          </Button>
        </Grid>
      </Paper>
    </>
  );
};

export default Filters;

const prepareFilters = (courses) => {
  const languages = [...new Set(courses.map((item) => item.language))];
  const defaultLanguages = [];
  languages.forEach((language, index) => {
    let lang = validateLanguage(language);
    if (lang) {
      defaultLanguages.push({
        id: index + 1,
        name: lang,
        value: false,
      });
    }
  });
  defaultLanguages.sort((a, b) =>
    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
  );

  const subjectTypes = [...new Set(courses.map((item) => item.subject_type))];
  const defaultCourseTypes = [];
  subjectTypes.forEach((type, index) => {
    let sType = validateSubjectType(type);
    if (sType) {
      defaultCourseTypes.push({
        id: index + 1,
        name: sType,
        value: false,
      });
    }
  });
  defaultCourseTypes.sort((a, b) =>
    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
  );

  const defaultSWS = validateSWS(courses);

  return {
    defaultLanguages,
    defaultCourseTypes,
    defaultSWS,
  };
};

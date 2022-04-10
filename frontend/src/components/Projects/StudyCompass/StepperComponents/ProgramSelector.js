import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import {Autocomplete} from "@material-ui/lab";
import {Button, Grid, makeStyles, createMuiTheme, ThemeProvider} from "@material-ui/core";
import BarChartApex from "../Charts/BarChartApex";
import Backend from "../../../../assets/functions/Backend";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3f51b5"
    },
    secondary: {
      main: "#ef6c00"
    }
  },
});
const useStyles = makeStyles(theme => ({

  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    height: 35,
  },
}))

export default function ProgramSelector(props) {

  /* all state variables*/
  const [programObject, setValue] = React.useState(undefined);
  const classes = useStyles();
  const [sem, setSem] = useState(false);
  const [prog, setProg] = useState(false);
  const [studyPrograms, setStudyPrograms] = useState([]);

  useEffect(() => {
    Backend.get("/studycompass/get_studyprograms")
        .then(response => {
          setStudyPrograms(response.data);
        })
  }, []);

  /* Retrieving all semester to which data is contained in the data file(studyprograms), stored in semesters */
  const createSemesters = () => {
    const testsemester = [];
    for (let study of props.studyprograms) {
      for (let subject of study.categories) {
        for (let sub of subject.subjects) {
          if (!testsemester.includes(sub.semesters[0]))
            testsemester.push(sub.semesters[0])
        }

        for (let cat of subject.categories) {
          for (let sub2 of cat.subjects) {
            if (!testsemester.includes(sub2.semesters[0])) {
              testsemester.push(sub2.semesters[0])
            }

          }
          for (let cats of cat.categories) {
            for (let sub3 of cats.subjects) {
              if (!testsemester.includes(sub3.semesters[0])) {
                testsemester.push(sub3.semesters[0])
              }
            }
          }
        }
      }
    }
    return testsemester;
  }
  const [semesters, setSemesters] = useState(createSemesters);

  /* Setting the the state of sem to true when a semester is selected (as indicator for the next button) and false when no semester is selected*/
  const handleSemesterSet = (newValue) => {
    props.changeSem(newValue);
    if (newValue) {
      setSem(true);
    } else {
      setSem(false);
    }
  }
  /* Setting the the state of prog to true when a studyprogram is selected(as indicator for the next button) and false when no prog is selected*/
  const handleProgSet = (newValue) => {
    setValue(newValue);
    props.changeProgram(newValue);
    if (newValue) {
      setProg(true);
    } else {
      setProg(false);
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Grid container direction="column" justify="flex-start" className={classes.all}>
        <Grid item style={{width: "80%", alignSelf: "center"}}>
          <Grid container direction="column" alignItems="center" justify="center" style={{margin: 15}}>
            <Grid item style={{width: "75%", marginBottom: 25}}>
              <Autocomplete
                value={programObject}
                onChange={(event, newValue) => {
                  handleProgSet(newValue);
                }}
                style={{fontVariant: "small-caps", width: "100%"}}
                id="search-box"
                options={studyPrograms}
                // options={props.studyprograms}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params}
                                                    label="Search for your studyprogram here"
                                                    variant="outlined" color="secondary"/>}
              />
            </Grid>


            <Grid item style={{width: "75%", marginBottom: 25}}>
              <Autocomplete
                onChange={(event, newValue) => {
                  handleSemesterSet(newValue);
                }}
                style={{fontVariant: "small-caps", width: "100%"}}
                id="semester-selection"
                options={semesters}
                getOptionLabel={(option) => option}
                renderInput={(params) => <TextField {...params}
                                                    label="Select your Semester"
                                                    variant="outlined" color="secondary"/>}
              />
            </Grid>
            <Grid item>
              <BarChartApex studyprogram={programObject}/>
            </Grid>

          </Grid>
        </Grid>
        <Grid item style={{width: "100%", marginTop: 20}}>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={props.handleBack()}
                className={classes.button}>
                Back
              </Button>
            </Grid>
            <Grid item>
              <Button
                disabled={prog !== true}
                variant="contained"
                color="primary"
                onClick={props.handleNext()}
                className={classes.button}>
                Next
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

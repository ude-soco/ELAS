import React from 'react';
import {Button, Box, Grid, makeStyles, Typography, createMuiTheme, ThemeProvider} from "@material-ui/core";

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

  leftA: {
    width: "50%",
  },
  b1: {
    fontSize: 36,
  },
  b4: {
    fontSize: 18,
    paddingTop: 8,
    fontWeight: 'normal',
  },
  buttons2: {
    paddingTop: 20,
  },
  button: {
    height: 35,
  },
}))

export default function Startpage(props) {

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Grid container justify="space-around">
        <Grid item className={classes.leftA} style={{width: "60%"}}>
          <Box>
            <Typography color="secondary"
                        style={{fontVariant: "small-caps"}}
                        className={classes.b1}>
              About StudyCompass:
            </Typography>
            <Typography style={{
              textAlign: "justify",
              paddingLeft: 10,
              paddingRight: 10,
              fontVariant: "small-caps"
            }} className={classes.b4}>
              This tool helps you in planning of subjects that you can take in one semester.

              You will get an overview of all the courses offered by your study program in that
              semester.

              Afterwards you can select the courses you like and see their comparison based on
              course
              rating and time overlapping.
            </Typography>
            <Typography color="secondary"
                        style={{
                          fontVariant: "small-caps",
                          textAlign: "justify",
                          paddingLeft: 10
                        }} className={classes.b4}>
              This Tool Offers:
            </Typography>
            <Typography style={{
              textAlign: "justify",
              paddingLeft: 10,
              paddingRight: 10,
              fontVariant: "small-caps"
            }}>
              <li style={{paddingTop: 10}}>
                Visual analysis to support decision making on the selection of the courses
              </li>
              <li style={{paddingTop: 10}}>
                Based on course catalog data
              </li>
              <li style={{paddingTop: 10}}>
                Planning courses according to the semesters
              </li>
              <li style={{paddingTop: 10}}>
                Students can select the courses and be able to compare them based on various
                aspects
                such as
                recommendation, understandability and so on which are done by those who have
                already
                passed the listed
                course
              </li>
            </Typography>
          </Box>
        </Grid>
        <Grid item style={{padding: 0, width: "30%"}}>
          <Grid container direction='column' alignItems="center" style={{height: "100%"}}>
            <Grid item style={{height: "15%"}}>
              <Typography
                color="secondary"
                style={{fontVariant: "small-caps"}}
                className={classes.b1}>
                Useful Links:
              </Typography>
            </Grid>
            <Grid item className={classes.buttons2} style={{height: "15%"}}>
              <Button variant="outlined" color="secondary"
                      href="https://www.uni-due.de/en/university.php"
                      style={{backgroundColor: "#fff", color: "#3f51b5", width: 210, height: 30}}>
                About University
              </Button>
            </Grid>
            <Grid item className={classes.buttons2} style={{height: "15%"}}>
              <Button variant="outlined" color="secondary"
                      href="https://www.uni-due.de/en/study_courses.php"
                      style={{backgroundColor: "#fff", color: "#3f51b5", width: 210, height: 30}}>
                Study Courses
              </Button>
            </Grid>
            <Grid item className={classes.buttons2} style={{height: "15%"}}>
              <Button variant="outlined" color="secondary"
                      href="https://www.uni-due.de/en/faculties.php"
                      style={{backgroundColor: "#fff", color: "#3f51b5", width: 210, height: 30}}>
                Faculties
              </Button>
            </Grid>
            <Grid item className={classes.buttons2} style={{height: "15%"}}>
              <Button variant="outlined" color="secondary"
                      href="https://www.uni-due.de/international/index_en.shtml"
                      style={{backgroundColor: "#fff", color: "#3f51b5", width: 210, height: 30}}>
                international Office
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{width: "100%", marginTop: 40}}>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                disabled
                className={classes.button}>
                Back
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={props.handleNext()}
                className={classes.button}>
                Begin
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

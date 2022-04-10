import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import {Grid, Box, Card, CardContent, createMuiTheme, ThemeProvider} from '@material-ui/core';
import Startpage from './StepperComponents/Startpage';
import ProgramSelector from './StepperComponents/ProgramSelector';
import CourseSelector from './StepperComponents/CourseSelector';
import ComparePage from './StepperComponents/ComparePage';
import {studyprogram} from "./data/studyprograms";

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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    fontVariant: 'small-caps',
    alignContent: 'center',
  },
  card: {
    borderRadius: 15,
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  label: {
    fontSize: 18,
  },
  box: {
    background: "#3c56ba",
    height: "220px",
    display: "block",
    alignContent: "center",
    width: "100%",
  },
  courseinsights: {
    color: "#ffffff",
    display: "block",
    justify: "center",
    fontSize: 50,
    textAlign: "center",
    fontVariant: "small-caps",
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
    alignItems: "center",
  },
  buttons: {
    marginTop: 10,
    width: 50,
    fontVariant: "small-caps"
  },
}));

function getSteps() {
  return ['Welcome to StudyCompass!', 'Select your studyprogram!', 'Select your subjects!', 'Compare your selected subjects!'];
}

export default function StudyCompass() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [program, setProgram] = React.useState(undefined);
  const [sem, setSem] = React.useState(undefined);
  const [subs, setSubs] = React.useState([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (activeStep === 2) {
      setSubs([]);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    if (activeStep === 3) {
      setSubs([]);
    }
  };


  return (
    <ThemeProvider theme={theme}>
      {/* Comment: Style property "all" was not defined in StudyCompass component */}
      <Grid container direction="column" justify="center" alignItems="center" className={classes.all}>
        <Box className={classes.box}>
          <Grid container direction="column" alignItems="center" justify="space-evenly"
                style={{height: "100%"}}>
            <Grid item>
              <Typography className={classes.courseinsights}>StudyCompass</Typography>
            </Grid>
          </Grid>
        </Box>
        <Grid item style={{width: "80%", marginTop: 25, alignSelf: "center"}}>
          <Card classes={{root: classes.card}}
                style={{marginBottom: 100, marginTop: 25, width: "100%", alignSelf: "center"}} variant="outlined">
            <CardContent style={{alignItems: "center", margin: 50, padding: 0}}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel> <Typography style={{fontSize: 18}}>{label}</Typography> </StepLabel>
                    <StepContent>
                      <Grid container direction="column">
                        <Grid item style={{marginTop: 25, marginBottom: 25, width: "100%"}}>
                          {index === 0 ? <Startpage
                            handleNext={() => handleNext}
                            handleBack={() => handleBack}/> : <></>}

                          {index === 1 ? <ProgramSelector studyprograms={studyprogram}
                                                          changeProgram={elem => setProgram(elem)}
                                                          changeSem={elem => setSem(elem)}
                                                          handleNext={() => handleNext}
                                                          handleBack={() => handleBack}/> : <></>}

                          {index === 2 ? <CourseSelector studyprogram={program}
                                                         semester={sem}
                                                         selected={subs}
                                                         changeSubs={elem => setSubs(elem)}
                                                         handleNext={() => handleNext}
                                                         handleBack={() => handleBack}/> : <></>}

                          {index === 3 ? <ComparePage studyprogram={program}
                                                      semester={sem}
                                                      selected={subs}
                                                      changeSubs={elem => setSubs(elem)}
                                                      handleNext={() => handleNext}
                                                      handleBack={() => handleBack}
                                                      handleReset={() => handleReset}/> : <></>}
                        </Grid>

                      </Grid>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

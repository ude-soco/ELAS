import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Wordcloud from "./Wordcloud";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const timetableRow = (timetable) => {
    return(
        <tr>
            <td>{timetable.day}</td>
            <td>{timetable.elearn}</td>
            <td>{timetable.rhythm}</td>
            <td>{timetable.elearn}</td>
            <td>{"TIME"}</td>
        </tr>
    )
}

export default function Popup(props) {
    const lecture = props.popupLecture;
    const professors = lecture.professors;
    const timetables = lecture.timetables;
    const studyPrograms = lecture.study_programs;
    const classes = useStyles();
    return (
        <Dialog open={props.openPopup}
                onClose={props.closePopup}
                maxWidth={"lg"}
                fullWidth={true}
                >
            <MuiDialogTitle>
                {lecture.name}
            </MuiDialogTitle>
            <MuiDialogContent>
                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Wordcloud keywords={lecture.keywords}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} style={{"margin": "auto"}}>
                            <Paper className={classes.paper} style={{"text-align": "-webkit-center"}}>
                                <div>
                                    <table>
                                        <tr>
                                            <th>Professors:</th>
                                            {professors?.map(professor => {
                                                return <tr>{professor.name}</tr>;
                                            })}
                                        </tr>
                                        <br></br>
                                        <tr>
                                            <th>Course Type:</th>
                                            <td>{lecture.subject_type}</td>
                                        </tr>
                                        <br></br>
                                        <tr>
                                            <th>Weekly hours (SWS):</th>
                                            <td>{lecture.sws}</td>
                                        </tr>
                                        <tr>
                                            <th>Language:</th>
                                            <td>{lecture.language}</td>
                                        </tr>
                                    </table>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} style={{"margin": "auto"}}>
                            <Paper className={classes.paper} style={{"text-align": "-webkit-center"}}>
                                <table>
                                    <th>Assigned study courses</th>
                                    {studyPrograms?.map(studyProgram => {
                                        return <tr>{studyProgram.name}</tr>;
                                    })}
                                </table>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container spacing={0} style={{"paddingTop": "10px"}}>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>Day</Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>Rhythm</Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>Elearn</Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>Time</Paper>
                        </Grid>
                    </Grid>
                </div>
            </MuiDialogContent>
        </Dialog>
    );
}

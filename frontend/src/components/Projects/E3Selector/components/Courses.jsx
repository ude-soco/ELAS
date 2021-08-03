/* Courses.jsx gets passed the full list of courses,
 * and exports two components "Courses" and "SelectedCourses",
 * which display a list of (un-)selected courses, respectively.
 */

import React, { useState } from 'react';
import { Collapse, Icon } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import Schedule from './partials/Schedule'
import RChart from "./partials/Chart";

import "../res/extraStyles.sass";
import { muiStyles } from "../res/muiStyles";
import classNames from 'classnames';

import German from "../res/German.png";
import English from "../res/English.png";
import Turkish from "../res/Turkish.png";
import Dutch from "../res/Dutch.png";

//quick translation
const ExamType = (e) => {
    switch(e){
        case "Präsentation": return "Presentation"
        case "Schriftliche Ausarbeitung" : return "Essay"
        case "Mündliche Prüfung":  return "Oral"
        case "Klausur": return "Exam"
        default: return e
    }
}

const fType = (e) => {
    switch(e){
        case  "Vorlesung" : return "Lecture"
        case "Blockseminar": return "Block Seminar"
        case "VL/Übung" : return "Lecture/Exercise"
        default: return e
    }
}

const maxParts = (max, exp) => {
    if (parseInt(exp) > 0) {
        return exp
    }

    if (parseInt(max.split(";")[0]) > 0) {
        return max.split(";")[0];
    }

    return "-";
}

//quick translation
const langFlag = (language) =>{
    switch(language.split(";")[0]){
        case 'Türkisch': return Turkish
        case 'Deutsch': return German
        case 'Englisch': return English
        case 'Niederländisch': return Dutch
        default: return ''
    }
}

//Each Type has its own Border color
const borderSelect = (type) => {
    switch(type) {
        case "VL/Übung": return "lecExBorder";
        case "Vorlesung": return "lectureBorder";
        case "Blockseminar": return "blockBorder";
        case "Seminar": return "seminarBorder";
        case "E-Learning": return "elearnBorder";
        case "Projektseminar" : return "seminarBorder";
        case "Hauptseminar" : return "seminarBorder";
        default: return "";
    }
}

//For displaying a not-too-long excerpt of the description of a course
const breakDescription = (desc) => {
    var maxLength = 500;
    var maxParagraphs = 3;
    var trimmed = desc.length > maxLength ? desc.substring(0, maxLength) + "..." : desc;
    var paragraphs = trimmed.split("\n").map(function(paragraph) {
        return (
            <p>{paragraph}</p>
        );
    });
    return paragraphs.length > maxParagraphs ? paragraphs.slice(0, maxParagraphs) : paragraphs
}

/* This is a container for all the filtered courses passed on from the E3Selector
 * HandleSel is the function HandleSelection from E3Selector, meant to handle the event of selecting a course
 * Sort is the function setSorting from E3Selector, meant to trigger upon clicking on the table headers
 */
const Courses = (props) => {
    const list = props.list
    const handleSel = props.handleSel
    const selectedList = props.selectedList
    const sort = props.sort
    const booked = props.booked

    const classes = muiStyles();

    return(
        <Grid container spacing={1} direction="row" alignItems="stretch" justify="center">
            <Grid item xs={12} className={classes.mobileHidden}>
                <Paper elevation={6} style={{padding: 24}}>
                    <Grid container spacing={3} direction="row" alignItems="center" justify="space-evenly" style={{ paddingLeft: 60 }}>
                        <Grid item xs={1} className={classes.sorter} onClick={() => sort("Credits")}>Credits</Grid>
                        <Grid item xs={1} className={classes.sorter} onClick={() => sort("SWS")}>Workload</Grid>
                        <Grid item xs={6} className={classes.sorter} onClick={() => sort("Title")}>Title</Grid>
                        <Grid item xs={2} className={classes.sorter} onClick={() => sort("Location")}>Location</Grid>
                        <Grid item xs={1} className={classes.sorter} onClick={() => sort("Language")}>Language</Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                </Paper>
            </Grid>
            {
                //Selecting a course doesn't delete it from the "list"
                //it pushs a copy of it to the "selectedList"
                //So we stop displaying a course in the main table if the selectedlist contains that course
                //we filter based on that principal
                list.filter(c => !selectedList.map(s => s.Title).includes(c.Title)).map( entry => {
                    return(
                        <Grid item xs={12}>
                            <Course component={Paper} key={entry.Link} {...entry} handleSel={handleSel} booked={booked}/>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

//The container component for the SelectedCourses which reuse the <Course> component
const SelectedCourses = (props) => {
    const classes = muiStyles();

    if (!props.selectedList.length) {
        return(
            <Paper className={classes.paperSelected} elevation={2}>
                click + to add courses
            </Paper>
        );
    } else {
        return(
            <Grid container spacing={1} direction="row" alignItems="stretch" justify="center">
            {
            props.selectedList.map( c => {
                return (
                <Grid item xs={12}>
                    <Course key ={c.Link} {...c} selected={true} booked={props.booked} overBooked={props.overBooked} handleSel={props.handleSel}/>
                </Grid>
                )
            })
            }
            </Grid>
        )
    }
}

//The Course component implemented as a row with an additional collapsable row.
//Grid heavily utilized for different resolutions.
const Course = (props) => {
    const {Credits,
        Title,
        SWS: timeCom,
        Location,
        Type,
        Language,
        Description,
        Times_manual :schedule,
        Exam,
        Link:link,
        handleSel,
        booked,
        overBooked,
        selected,
        fairness,
        support,
        material,
        comprehensibility,
        fun,
        interesting,
        grade_effort: gradefort,
        "Max. Teilnehmer": max,
        "Erwartete Teilnehmer": exp
        } = props
    const [isOpen, toggle] = useState(false);
    const classes = muiStyles();

        return (

            <Paper elevation={3} style={{padding: "3px 24px", position: "relative"}} className={classes[borderSelect(Type.split(";")[0])]}>
                <div class="select-icon"><IconButton  onClick={() => handleSel(props)}>{selected ? <RemoveIcon/> : <AddIcon/>}</IconButton></div>
                <Grid item xs={12}>
                    <Grid container spacing={3} direction="row" alignItems="center" justify="space-evenly">
                        <Grid item xs={1} lg={1} className={classNames(classes.emphasis, classes.mobileHidden, classes[selected ? "mdSelectedHidden" : ""])} onClick={() => toggle(!isOpen)}>{Credits + " Cr."}</Grid>
                        <Grid item xs={1} className={classNames(classes.emphasis, classes.mobileHidden, classes[selected ? "mdSelectedHidden" : ""])} onClick={() => toggle(!isOpen)}>{timeCom.length !== 0 ? timeCom + " hrs." : "-"}</Grid>
                        <Grid item xs={10} md={selected ? 11 : 6} lg={selected ? 7 : 6} className={classes.emphasis} onClick={() => toggle(!isOpen)}>{Title}</Grid>
                        <Grid item xs={selected ? 1: 2} className={classNames(classes.emphasis, classes.mobileHidden, classes[selected ? "mdSelectedHidden" : ""])} onClick={() => toggle(!isOpen)}>{(Location.split(";").length > 1) ? selected ? "va" : "various" : selected ? Location.slice(0, 2) : Location}</Grid>
                        <Grid item xs={1} className={classNames(classes.emphasis, classes.mobileHidden, classes[selected ? "mdSelectedHidden" : ""])} onClick={() => toggle(!isOpen)}><img class="lang-flag" alt={Language} src={langFlag(Language)}/></Grid>
                        <Grid item xs={1} className={classes.emphasis}><div class="expand-icon"><Icon aria-label="expand row" onClick={() => toggle(!isOpen)}>{isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</Icon></div></Grid>
                    </Grid>
                </Grid>

                {/* Collapsible for all additional information */}
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <hr class="hr-lighter"></hr>
                    <Grid item xs={12} style={{padding: 24}}>
                        <Grid container spacing={3} direction="row" alignItems="center" justify="space-evenly">
                            <Grid item xs={12} md={selected ? 12 : 6} xl={selected ? 6 : 3}><RChart fairness={fairness} support={support} material={material} comprehensibility={comprehensibility} fun={fun} interesting={interesting} gradefort={gradefort}/></Grid>
                            <Grid item xs={12} md={selected ? 12 : 6} xl={selected ? 6 : 4}><Schedule schedule={schedule} booked={booked} overBooked={overBooked}/></Grid>
                            <Grid item xs={12} md={selected ? 12 : 6} xl={selected ? 6 : 3}><strong>Description (excerpt):</strong>{ breakDescription(Description) }</Grid>
                            <Grid item xs={12} md={selected ? 12 : 6} xl={selected ? 6 : 2}>
                                <div class="info-table">
                                    <table>
                                        <tr><th>Location:</th><td>{Location.split(";").join(", ")}</td></tr>
                                        <tr><th>Language:</th><td>{Language}</td></tr><br></br>
                                        <tr><th>Course Type:</th><td class={borderSelect(Type.split(";")[0])}>{Type.split(";").map(e => fType(e)).join(", ")}</td></tr>
                                        <tr><th>Seats:</th><td>{maxParts(max, exp)}</td></tr>
                                        <br></br>
                                        <tr><th>Credits:</th><td>{Credits}</td></tr>
                                        <tr><th>Exam Type:</th><td>{Exam.split(";").map(e => ExamType(e)).join(", ")}</td></tr>
                                    </table><br></br>
                                    <a href={link} target="_blank" rel="noreferrer">visit the course page</a>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Collapse>
            </Paper>
    )}

export default Courses;
export {SelectedCourses};

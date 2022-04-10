import React, {useEffect, useState} from 'react';
import {
  Button, Card, makeStyles, Typography, TableBody, TableCell, TableContainer,
  createMuiTheme, ThemeProvider, lighten, Table, TableHead, TablePagination,
  TableRow, TableSortLabel, Toolbar, Paper, Checkbox, IconButton, Tooltip, FormControlLabel, Switch,
  Grid, CardContent, Collapse, CardActionArea, TextField
} from "@material-ui/core";
import ApexColumnChart from "../Charts/ApexColumnChart";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Backend from "../../../../assets/functions/Backend";
import SubjectIcon from '@material-ui/icons/Subject';
import Popup from "./DetailsPage";
import {studyprogram} from "../data/studyprograms";


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#ef6c00",
    }
  },
});


const useStyles = makeStyles({
  all: {
    fontVariant: "small-caps",
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    borderRadius: 15,
  },
  card: {
    borderRadius: 15,
  },
  border: {
    width: "45%",
    marginTop: 25,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  lilcaptions: {
    display: "block",
    justify: "center",
    textAlign: "justify",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 24,
  },
  caption: {
    display: "block",
    justify: "center",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 26,
    fontWeight: "bold",
  },
  content: {
    color: "#000",
    display: "block",
    justify: "center",
    textAlign: "justify",
    marginTop: 10,
    fontSize: 18,
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    height: 35,
  },
});


/* Sort functions for both tables. Switch mode between asc and desc */
function descendingComparator(a, b, orderBy) {

  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


/* Column head infos (id,padding,label)  */
const headCellsSub = [
  {id: 'name', numeric: true, disablePadding: true, label: 'Subject-name'},
  {id: 'subject_type', numeric: false, disablePadding: true, label: 'Subject-type'},
  {id: 'details', numeric: false, disablePadding: false, label: 'More details'},
];

/* TableHead, TableToolbar and Toolbar Styles for All-Subjects-Table */

function EnhancedTableHead(props) {
  const {classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{'aria-label': 'select all subjects'}}
          />
        </TableCell>
        {headCellsSub.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {numSelected} = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Available Subjects:
        </Typography>
      )}

    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

/* TableHead, TableToolbar and Toolbar Styles for Selected-Table */
function EnhancedTableHeadSel(props) {
  const {classes, order, orderBy, onRequestSort} = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">

        </TableCell>
        {headCellsSub.slice(0,2).map((headCell) => (

          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>

        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHeadSel.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};
const EnhancedTableToolbarSel = () => {
  const classes = useToolbarStyles();

  return (
    <Toolbar
      className={clsx(classes.root)}
    >

      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        Your selected Subjects :
      </Typography>

    </Toolbar>
  );
};


export default function CourseSelector(props) {


  /* Variables for all Subjects Table */

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState(props.selected);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  /* Variables for selected Subjects Table */

  const [orderSel, setOrderSel] = React.useState('asc');
  const [orderBySel, setOrderBySel] = React.useState('name');
  const [pageSel, setPageSel] = React.useState(0);
  const [denseSel, setDenseSel] = React.useState(false);
  const [rowsPerPageSel, setRowsPerPageSel] = React.useState(5);

  /* variable for popup */

  const [openPopup, setOpenPopup] = React.useState(false);
  const [popupLecture, setPopupLecture] = React.useState([]);

  /* contains all the subjects that are fetched when the component is initially loaded. This always remains the same through the whole program*/
  const [subjects, setSubjects] = React.useState([]);

  /* this contains all subjects matching the current criteria, i.e. filters and studyprogram + semester from props  */
  const [displayedLectures, setDisplayedLectures] = React.useState([]);

  /* this is called when the component is loaded. It gets all lectures and sets the subjects and displayedLectures */
  useEffect(() => {
    Backend.get("/studycompass/get_lectures_with_root_id", {params: {"id": props.studyprogram.id}})
        .then(response => {
          setSubjects(response.data);
          setDisplayedLectures(response.data);
        });
  }, []);

  useEffect(() => {
    console.log('selected lectures: ', selected);
  }, []);

  /* All functions for the All-Subjects-Table */

  /* sorting function for Table-Head (when clicking on label)  */

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  /* function for select-all-button in Table-Head */

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = subjects;
      setSelected(newSelecteds);
      props.changeSubs(newSelecteds);
      return;
    }
    setSelected([]);
    props.changeSubs([]);
  };

  /* function for handling a click on row
    1. when row is already selected delete from selected var, where
    all current selected subjects are in
    2. when not already selected concat row to selected var */

  const handleClick = (event, row) => {
    const matchingLecture = selected.filter(lecture => {
      return lecture.id === row.id;
    });
    let newSelected = [];
    if (matchingLecture.length === 0) { // if the lecture is not already in the selected lectures array
      newSelected = newSelected.concat(selected, row); // then add it to the selected lectures
    }
    else { // if the lecture is already there, that means it needs to be deleted from the selected lectures
      let indices = [];
      selected.forEach(lecture => {
        indices.push(lecture.id);
      });
      const selectedIndex = indices.indexOf(row.id); // get the index of the clicked lecture
      if (selectedIndex === 0) { // if the lecture is the first element in the selected array
        newSelected = newSelected.concat(selected.slice(1)); // select all lectures except the first one
      }
      else if (selectedIndex === selected.length - 1) { // if the lecture is the last element in the selected array
        newSelected = newSelected.concat(selected.slice(0, -1)); // select all the lectures except the last one
      }
      else if (selectedIndex > 0) { // if the lecture is somewhere in the middle
        newSelected = newSelected.concat(
            selected.slice(0, selectedIndex), // select all the lectures until one index before the lecture
            selected.slice(selectedIndex + 1), // select all the lectures after the index
        );
      }
    }
    setSelected(newSelected); // at the end, set the new selected lectures to the selected lectures
    props.changeSubs(newSelected); // change the props as well
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /* changes the amount of rows displayed per page */

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /* function for switching between dense padding on/off */

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  function isSelected (row) {
    let indices = []
    selected.forEach(lecture => {
      indices.push(lecture.id);
    });
    return indices.indexOf(row.id) !== -1;
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, displayedLectures.length - page * rowsPerPage);

  /* All functions for the Subject Table with all selected subjects from the other table */

  /* sorting function for Table-Head (when clicking on label)  */

  const handleRequestSortSel = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderSel(isAsc ? 'desc' : 'asc');
    setOrderBySel(property);
  };


  const handleChangePageSel = (event, newPage) => {
    setPageSel(newPage);
  };

  /* changes the amount of rows displayed per page */

  const handleChangeRowsPerPageSel = (event) => {
    setRowsPerPageSel(parseInt(event.target.value, 10));
    setPageSel(0);
  };

  /* function for switching between dense padding on/off */

  const handleChangeDenseSel = (event) => {
    setDenseSel(event.target.checked);
  };

  /* handling the event when delete button in a row is clicked
     -> deleting the row from the selected var from All-Subjects-Table
     -> will no longer be displayed in Selected-Table
     -> will no longer be marked as selected in All-Subjects-Table */

  const handleDelete = (event, row) => {
    const selectedIndex = selected.indexOf(row);
    let newSelected = [];

    if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    props.changeSubs(newSelected);
  }

  const handleClickDetails = (event, lecture) => {
    setOpenPopup(true);
    // setPopupLecture(response.data);
    Backend.get("/studycompass/get_lecture_with_id", {params: {"id": lecture.id}})
        .then(response => {
          console.log(response.data);
          setPopupLecture(response.data);
        });
  }

  const closePopup = () => {
    setOpenPopup(false);
  }

  const emptyRowsSel = rowsPerPageSel - Math.min(rowsPerPageSel, selected.length - pageSel * rowsPerPageSel);

  /* Open State (true/false) for filter card true when opened false when closed  */

  const [open, setOpen] = useState(false);

  /* Check State for checking whether the last input in the search filter was longer or shorter
      -> contains the length of the last input of the search filter*/

  const [check, setCheck] = useState(0);

  /* filterN contains the string with the current input of the search filter */

  const [filterN, setFilterN] = useState(undefined);

  /* errorS is true when theres no match for current input in the search filter*/

  const [errorS, setErrorS] = useState(false);

  /*Switch-States for all possible subject-types*/

  const [state, setState] = React.useState({
    einzelveranstaltung: true,
    kolloquium: true,
    kurs: true,
    labor: true,
    vorlesung: true,
    uebung: true,
    uebungMitTutorien: true,
    pflichtveranstaltung: true,
    praktikum: true,
    projekt: true,
    vorlesungUebung: true,
    uebungPraktikum: true,
    seminar: true,
    seminarOberseminar: true,
    blockseminar: true,
    seminarUebung: true,
    tutorium: true,
    vorlesungSeminar: true,
    propädeutikum: true,
    praxisprojekt: true,
    selbstaendigesarbeiten: true,
    wahlpflichtVeranstaltung: true,
    keineAngabe: true,
  });

  /*@params subtype: an arbitrary subject-type
    @return count: the amount of courses to the given subject type */

  const findCount = (subtype) => {
    const count = displayedLectures.filter(el => el.subject_type === subtype).length
    return count;
  }

  /*
    filter function for the switches
    @param event: an onClick-event from one of the switches
    @param  cond: the switchState of the asssociated switch
    @param  comp: the String containing the subject type asssociated to the switch
                  to filter the subjects array
  */

  const filterSubjects = (event, cond, comp) => {
    // console.log("cond: " +  cond);
    // console.log("comp: " + comp);
    // console.log("state: " + event.target.name + " checked: " + event.target.checked);
    setState({...state, [event.target.name]: event.target.checked});
    if (cond === true) {
      const filteredArray = displayedLectures.filter(subject => subject.subject_type !== comp);
      setDisplayedLectures(filteredArray);
    }
    else {
      const oldLectures = subjects.filter(subject => subject.subject_type === comp); // lectures that were removed by the filter earlier, now they need to be added back to the displayed lectures
      if (filterN) { // if there is text in the search box below the filters
        const toBeDisplayedLectures = displayedLectures.concat(oldLectures.filter(lecture => lecture.name.toUpperCase().includes(filterN)));
        // if there is text in the search box, then only those lectures should be added back that contain the search text AND were removed by the filter earlier
        setDisplayedLectures(toBeDisplayedLectures);

      }
      else {
        const toBeDisplayedLectures = displayedLectures.concat(oldLectures);
        // if there is no text in the search box, just add all the lectures back that were removed earlier
        setDisplayedLectures(toBeDisplayedLectures);
      }
    }
    setPage(0);
  };

  /*
    filter function for the search filter (textfield)
    when deleting input -> resetting all filter switches to return to all available subjects
  */

  const filterSName = (event) => {
    const input = event.target.value.toUpperCase();
    if (input.length > 0) {
      setFilterN(input);
    }
    else {
      setFilterN(undefined);
    }
    setFilterN(input);
    if (input.length > check) {
      const filtered = subjects.filter(subject => subject.name.toUpperCase().includes(input));
      setDisplayedLectures(filtered);
      if (filtered < 1) {
        setErrorS(true);
      } else {
        setErrorS(false);
      }
    } else {
      setState({
        einzelveranstaltung: true,
        kolloquium: true,
        kurs: true,
        labor: true,
        vorlesung: true,
        uebung: true,
        uebungMitTutorien: true,
        pflichtveranstaltung: true,
        praktikum: true,
        projekt: true,
        vorlesungUebung: true,
        uebungPraktikum: true,
        seminar: true,
        seminarOberseminar: true,
        blockseminar: true,
        seminarUebung: true,
        tutorium: true,
        vorlesungSeminar: true,
        propädeutikum: true,
        praxisprojekt: true,
        selbstaendigesarbeiten: true,
        wahlpflichtVeranstaltung: true,
        keineAngabe: true,
      });
      const old = subjects.filter(el => el.name.toUpperCase().includes(input));
      setDisplayedLectures(old);
      if (old < 1) {
        setErrorS(true);
      } else {
        setErrorS(false);
      }
    }
    setCheck(input.length);
    setPage(0);
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container direction="column" className={classes.all}>
        <Grid item style={{margin: 20, alignSelf: "center", width: "100%"}}>
          <Grid container justify="space-between">
            <Grid item style={{width: "45%"}}>
              <Card variant="outlined" classes={{root: classes.card}}>
                <CardContent style={{margin: 10}}>
                  <Typography color="secondary" className={classes.caption}> Your
                    selection:</Typography>
                  <Typography color="secondary" className={classes.lilcaptions}> Your
                    selected studyprogram: </Typography>
                  <Typography
                    className={classes.content}>{props.studyprogram.name}</Typography>
                  <Typography color="secondary" className={classes.lilcaptions}> Your selected
                    semester: </Typography>
                  <Typography
                    className={classes.content}>{props.semester}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item style={{width: "47.5%"}}>
              <ApexColumnChart selected={selected}/>
            </Grid>
          </Grid>
          <Card className={classes.border} elevation={1}>
            <CardActionArea onClick={() => setOpen(!open)}>
              <Grid container style={{marginTop: 20, marginLeft: 20, marginRight: 20, width: "92.5%", marginBottom: 20}}
                    justify="space-between" alignContent="center">
                <Grid item>
                  <Typography variant="body2"> Filters </Typography>
                </Grid>
                <Grid item>
                  {open ? (
                    <KeyboardArrowUpIcon color="inherit"/>
                  ) : (
                    <KeyboardArrowDownIcon color="inherit"/>
                  )}
                </Grid>

              </Grid>
            </CardActionArea>
            <Collapse in={open}>
              <Grid container style={{marginBottom: 15, marginLeft: 15, marginRight: 15, width: "95%",}}
                    justify="flex-start" alignContent="baseline" spacing={2}>

                {findCount("Anleitung zum selbständigen Arbeiten") > 0 || state.selbstaendigesarbeiten === false ?
                  <Grid item xs={6}>
                    <FormControlLabel control={
                      <Switch
                        checked={state.selbstaendigesarbeiten}
                        onChange={(event) => filterSubjects(event, state.selbstaendigesarbeiten, "Anleitung zum selbständigen Arbeiten")}
                        name="selbstaendigesarbeiten"
                        color="secondary"/>}
                                      label="Anleitung zum selbständigen Arbeiten"

                    /></Grid>
                  : <></>}

                {findCount("Blockseminar") > 0 || state.blockseminar === false ? <Grid item xs={6}>
                  <FormControlLabel control={<Switch
                    checked={state.blockseminar}
                    onChange={(event) => filterSubjects(event, state.blockseminar, "Blockseminar")}
                    name="blockseminar"
                    color="secondary"/>}
                                    label="Blockseminar"
                  /></Grid> : <></>}


                {findCount("Einzelveranstaltung") > 0 || state.einzelveranstaltung === false ? <Grid item xs={6}>
                  <FormControlLabel control={<Switch
                    checked={state.einzelveranstaltung}
                    onChange={(event) => filterSubjects(event, state.einzelveranstaltung, "Einzelveranstaltung")}
                    name="einzelveranstaltung"
                    color="secondary"/>}
                                    label="Einzelveranstaltung"
                  /></Grid> : <></>}


                {findCount("Kolloquium") > 0 || state.kolloquium === false ? <Grid item xs={6}>
                  <FormControlLabel control={<Switch
                    checked={state.kolloquium}
                    onChange={(event) => filterSubjects(event, state.kolloquium, "Kolloquium")}
                    name="kolloquium"
                    color="secondary"/>}
                                    label="Kolloquium"
                  /></Grid> : <></>}


                {findCount("Kurs") > 0 || state.kurs === false ? <Grid item xs={6}>
                  <FormControlLabel control={<Switch
                    checked={state.kurs}
                    onChange={(event) => filterSubjects(event, state.kurs, "Kurs")}
                    name="kurs"
                    color="secondary"/>}
                                    label="Kurs"
                  /></Grid> : <></>}


                {findCount("Labor") > 0 || state.labor === false ? <Grid item xs={6}>
                  <FormControlLabel control={<Switch
                    checked={state.labor}
                    onChange={(event) => filterSubjects(event, state.labor, "Labor")}
                    name="labor"
                    color="secondary"/>}
                                    label="Labor"
                  /></Grid> : <></>}


                {findCount("Pflichtveranstaltung") > 0 || state.pflichtveranstaltung === false ? <Grid item xs={6}>
                  <FormControlLabel control={<Switch
                    checked={state.pflichtveranstaltung}
                    onChange={(event) => filterSubjects(event, state.pflichtveranstaltung, "Pflichtveranstaltung")}
                    name="pflichtveranstaltung"
                    color="secondary"/>}
                                    label="Pflichtveranstaltung"
                  /></Grid> : <></>}


                {findCount("Praktikum") > 0 || state.praktikum === false ? <Grid item xs={6}>
                  <FormControlLabel control={<Switch
                    checked={state.praktikum}
                    onChange={(event) => filterSubjects(event, state.praktikum, "Praktikum")}
                    name="praktikum"
                    color="secondary"/>}
                                    label="Praktikum"
                  /></Grid> : <></>}


                {findCount("Praxisprojekt") > 0 || state.praxisprojekt === false ? <Grid item xs={6}>
                  <FormControlLabel control={<Switch
                    checked={state.praxisprojekt}
                    onChange={(event) => filterSubjects(event, state.praxisprojekt, "Praxisprojekt")}
                    name="praxisprojekt"
                    color="secondary"/>}
                                    label="Praxisprojekt"
                  /> </Grid> : <></>}


                {findCount("Projekt") > 0 || state.projekt === false ? <Grid item xs={6}>
                  <FormControlLabel control={<Switch
                    checked={state.projekt}
                    onChange={(event) => filterSubjects(event, state.projekt, "Projekt")}
                    name="projekt"
                    color="secondary"/>}
                                    label="Projekt"
                  /></Grid> : <></>}


                {findCount("Propädeutikum") > 0 || state.propädeutikum === false ? <Grid item xs={6}>
                  <FormControlLabel control={<Switch
                    checked={state.propädeutikum}
                    onChange={(event) => filterSubjects(event, state.propädeutikum, "Propädeutikum")}
                    name="propädeutikum"
                    color="secondary"/>}
                                    label="Propädeutikum"
                  /> </Grid> : <></>}


                {findCount("Seminar") > 0 || state.seminar === false ? <Grid item xs={6}>
                  <FormControlLabel control={<Switch
                    checked={state.seminar}
                    onChange={(event) => filterSubjects(event, state.seminar, "Seminar")}
                    name="seminar"
                    color="secondary"/>}
                                    label="Seminar"
                  /> </Grid> : <></>}


                {findCount("Seminar/Oberseminar") > 0 || state.seminarOberseminar === false ? <Grid item xs={6}>
                  <FormControlLabel control={<Switch
                    checked={state.seminarOberseminar}
                    onChange={(event) => filterSubjects(event, state.seminarOberseminar, "Seminar/Oberseminar")}
                    name="seminarOberseminar"
                    color="secondary"/>}
                                    label="Seminar/Oberseminar"
                  /> </Grid> : <></>}


                {findCount("Seminar/Übung") > 0 || state.seminarUebung === false ? <Grid item xs={6}>
                  <FormControlLabel control={<Switch
                    checked={state.seminarUebung}
                    onChange={(event) => filterSubjects(event, state.seminarUebung, "Seminar/Übung")}
                    name="seminarUebung"
                    color="secondary"/>}
                                    label="Seminar/Übung"
                  /> </Grid> : <></>}


                {findCount("Tutorium") > 0 || state.tutorium === false ? <Grid item xs={6}>
                  <FormControlLabel control={<Switch
                    checked={state.tutorium}
                    onChange={(event) => filterSubjects(event, state.tutorium, "Tutorium")}
                    name="tutorium"
                    color="secondary"/>}
                                    label="Tutorium"
                  /> </Grid> : <></>}


                {findCount("Übung") > 0 || state.uebung === false ? <Grid item xs={6}>
                  <FormControlLabel control={<Switch
                    checked={state.uebung}
                    onChange={(event) => filterSubjects(event, state.uebung, "Übung")}
                    name="uebung"
                    color="secondary"/>}
                                    label="Übung"
                  /> </Grid> : <></>}


                {findCount("Übung/mit Tutorien") > 0 || state.uebungMitTutorien === false ? <Grid item xs={6}>
                  <FormControlLabel control={<Switch
                    checked={state.uebungMitTutorien}
                    onChange={(event) => filterSubjects(event, state.uebungMitTutorien, "Übung/mit Tutorien")}
                    name="uebungMitTutorien"
                    color="secondary"/>}
                                    label="Übung/mit Tutorien"
                  /> </Grid> : <></>}


                {findCount("Übung/Praktikum") > 0 || state.uebungPraktikum === false ? <Grid item xs={6}>
                  <FormControlLabel control={<Switch
                    checked={state.uebungPraktikum}
                    onChange={(event) => filterSubjects(event, state.uebungPraktikum, "Übung/Praktikum")}
                    name="uebungPraktikum"
                    color="secondary"/>}
                                    label="Übung/Praktikum"
                  /> </Grid> : <></>}


                {findCount("Vorlesung") > 0 || state.vorlesung === false ? <Grid item xs={6}>
                  <FormControlLabel control={<Switch
                    checked={state.vorlesung}
                    onChange={(event) => filterSubjects(event, state.vorlesung, "Vorlesung")}
                    name="vorlesung"
                    color="secondary"/>}
                                    label="Vorlesung"
                  /> </Grid> : <></>}


                {findCount("Vorlesung/Seminar") > 0 || state.vorlesungSeminar === false ? <Grid item xs={6}>
                  <FormControlLabel control={<Switch
                    checked={state.vorlesungSeminar}
                    onChange={(event) => filterSubjects(event, state.vorlesungSeminar, "Vorlesung/Seminar")}
                    name="vorlesungSeminar"
                    color="secondary"/>}
                                    label="Vorlesung/Seminar"
                  /> </Grid> : <></>}


                {findCount("Vorlesung/Übung") > 0 || state.vorlesungUebung === false ? <Grid item xs={6}>
                  <FormControlLabel control={<Switch
                    checked={state.vorlesungUebung}
                    onChange={(event) => filterSubjects(event, state.vorlesungUebung, "Vorlesung/Übung")}
                    name="vorlesungUebung"
                    color="secondary"/>}
                                    label="Vorlesung/Übung"
                  /> </Grid> : <></>}


                {findCount("Wahlpflichtveranstaltung") > 0 || state.wahlpflichtVeranstaltung === false ?
                  <Grid item xs={6}>
                    <FormControlLabel control={<Switch
                      checked={state.wahlpflichtVeranstaltung}
                      onChange={(event) => filterSubjects(event, state.wahlpflichtVeranstaltung, "Wahlpflichtveranstaltung")}
                      name="wahlpflichtVeranstaltung"
                      color="secondary"/>}
                                      label="Wahlpflichtveranstaltung"
                    /> </Grid> : <></>}


                {findCount("Keine Angabe") > 0 || state.keineAngabe === false ? <Grid item xs={6}>
                  <FormControlLabel control={<Switch
                    checked={state.keineAngabe}
                    onChange={(event) => filterSubjects(event, state.keineAngabe, "Keine Angabe")}
                    name="keineAngabe"
                    color="secondary"/>}
                                    label="Keine Angabe"
                  /> </Grid> : <></>}

              </Grid>
              <Grid container style={{width: "95%", margin: 20}} justify="center">
                <Grid item xs={6}>
                  <TextField id="outlined-basic" error={errorS} label="subject-name" size="small" variant="outlined"
                             color="secondary" autoComplete onChange={(event => filterSName(event))}/>
                </Grid>
              </Grid>
            </Collapse>
          </Card>
          <Grid container justify="space-between" style={{marginTop: 25}}>
            <Grid item style={{width: "45%"}}>
              <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length}/>
                <TableContainer>
                  <Table
                    /* style={{minWidth:400}} */
                    aria-labelledby="tableTitle"
                    size={dense ? "small" : "medium"}
                    aria-label="enhanced table"
                  >
                    <EnhancedTableHead
                      classes={classes}
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={displayedLectures.length}
                    />
                    <TableBody>
                      {stableSort(displayedLectures, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          const isItemSelected = isSelected(row);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              // onClick={(event) => handleClick(event, row)}
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.name}
                              selected={isItemSelected}
                            >
                              <TableCell padding="checkbox"
                                         onClick={(event) => handleClick(event, row)}>
                                <Checkbox
                                  checked={isItemSelected}
                                  inputProps={{"aria-labelledby": labelId}}
                                />
                              </TableCell>
                              <TableCell
                                  onClick={(event) => handleClick(event, row)}
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                              >
                                {row.name}
                              </TableCell>
                              <TableCell align="left"
                                         onClick={(event) => handleClick(event, row)}>{row.subject_type}</TableCell>
                              <TableCell>
                                <Tooltip title="More details">
                                  <IconButton aria-label="delete" style={{padding: 0}}
                                              onClick={(event) => handleClickDetails(event, row)}>
                                    < SubjectIcon/>
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow style={{height: (dense ? 33 : 53) * emptyRows}}>
                          <TableCell colSpan={6}/>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={displayedLectures.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Paper>
              <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense}/>}
                label="Dense padding"
              />
            </Grid>
            <Grid item style={{width: "45%"}}>
              <Paper className={classes.paper}>
                <EnhancedTableToolbarSel/>
                <TableContainer>
                  <Table
                    aria-labelledby="tableTitle"
                    size={denseSel ? "small" : "medium"}
                    aria-label="enhanced table"
                  >
                    <EnhancedTableHeadSel
                      classes={classes}
                      order={orderSel}
                      orderBy={orderBySel}
                      onRequestSort={handleRequestSortSel}
                    />
                    <TableBody>
                      {stableSort(selected, getComparator(orderSel, orderBySel))
                        .slice(pageSel * rowsPerPageSel, pageSel * rowsPerPageSel + rowsPerPageSel)
                        .map((row, index) => {
                          const isItemSelected = isSelected(row);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              tabIndex={-1}
                              key={row.name}
                            >
                              <TableCell padding="checkbox"></TableCell>
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                              >
                                {row.name}
                              </TableCell>
                              <TableCell align="center">
                                {row.subject_type}


                              </TableCell>
                              <TableCell>
                                <Tooltip title="Delete">
                                  <IconButton aria-label="delete" style={{padding: 0}}
                                              onClick={(event) => {
                                                handleDelete(event, row);
                                                console.log('clicked delete');
                                              }}>
                                    < DeleteIcon/>
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRowsSel > 0 && (
                        <TableRow style={{height: (denseSel ? 33 : 53) * emptyRowsSel}}>
                          <TableCell colSpan={6}/>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={selected.length}
                  rowsPerPage={rowsPerPageSel}
                  page={pageSel}
                  onChangePage={handleChangePageSel}
                  onChangeRowsPerPage={handleChangeRowsPerPageSel}
                />
              </Paper>
              <FormControlLabel
                control={<Switch checked={denseSel} onChange={handleChangeDenseSel}/>}
                label="Dense padding"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{width: "100%", marginTop: 40}}>
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
                disabled={selected.length === 0}
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
      <Popup
        openPopup={openPopup}
        closePopup={closePopup}
        popupLecture={popupLecture}>
      </Popup>
    </ThemeProvider>
  );
}

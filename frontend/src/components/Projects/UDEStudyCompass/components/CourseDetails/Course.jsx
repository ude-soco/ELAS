import React, {useEffect, useMemo, useState} from "react";
import {
  Avatar,
  Collapse,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CourseDescription from "./CourseDescription";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import {loading} from "../../StudyCompassHomepage";
import {getRandomColor, validateSubjectType} from "../utils/functions";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CourseTimetable from "./CourseTimetable";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from "@material-ui/icons/Delete";
import MoreIcon from '@material-ui/icons/More';
import CloseIcon from "@material-ui/icons/Close";

const Course = (props) => {
  const {course, handleCourse, selected, resolveConflict, handleResolvedConflict, handleUpdateSelectedCourses} = props;

  const [courseDetails, setCourseDetails] = useState({
    description: "",
    id: "",
    keywords: [],
    language: "",
    longtext: "",
    name: "",
    professors: [],
    shorttext: "",
    study_programs: [],
    subject_type: "",
    sws: "",
    timetable: [],
    url: "",
  });
  const [selectedTime, setSelectedTime] = useState({
    time: "",
    value: {},
  });
  const [expand, setExpand] = useState(false);
  const [more, setMore] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const avatarColor = useMemo(() => getRandomColor(), []);

  useEffect(() => {
    setCourseDetails(course);
    if (course.timetable.length !== 0) {
      if (course.selectedTime) {
        setSelectedTime(course.selectedTime);
      } else {
        setSelectedTime({
          ...selectedTime,
          time: `${course.timetable[0].day} ${course.timetable[0].time.from}-${course.timetable[0].time.to}`,
          elearn: course.timetable[0].elearn,
          room: course.timetable[0].room,
          value: course.timetable[0],
        });
      }
    }
    if (resolveConflict === course.id) {
      setExpand(prevState => !prevState);
    }
  }, [course, resolveConflict]);

  const handleToggleMenu = (event) => {
    setOpenMenu(prevState => {
      if (prevState !== null) {
        return null
      }
      return event.currentTarget
    })
  }

  const handleSelectedTime = (time) => {
    let timeItem = {
      time: `${time[0].day} ${time[0].time.from}-${time[0].time.to}`,
      elearn: time[0].elearn,
      room: time[0].room,
      value: time[0],
    };
    setSelectedTime(timeItem);

    if (selected) {
      handleUpdateSelectedCourses(course.id, timeItem);
    }
  };

  return (
    <>
      <Grid item xs={12} style={{paddingBottom: 8}}>
        <Paper style={{padding: "16px 8px 16px 4px"}}>
          <Grid container alignItems="center">
            <Grid item xs={1}>
              <Grid container justify="center">
                <IconButton
                  onClick={() =>
                    handleCourse({...course, selectedTime: selectedTime})
                  }
                >
                  {selected ? (
                    <RemoveCircleIcon style={{color: "red"}}/>
                  ) : (
                    <AddBoxIcon style={{color: "orange"}}/>
                  )}
                </IconButton>
              </Grid>
            </Grid>

            <Grid item xs={2}>
              <Grid container>
                <Grid item style={{paddingRight: 8}}>
                  <Typography color="textSecondary" variant="button">
                    {selectedTime.time}
                  </Typography>
                </Grid>
                {course.timetable.length > 1 ? (
                  <>
                    <Grid item>
                      <Tooltip
                        title={
                          <Typography>More time slots available!</Typography>
                        }
                      >
                        <InfoOutlinedIcon color="disabled"/>
                      </Tooltip>
                    </Grid>
                  </>
                ) : (
                  <></>
                )}
              </Grid>
            </Grid>

            <Grid item xs={1}>
              <Grid container style={{paddingLeft: 12}}>
                <Typography color="textSecondary" variant="button">
                  {course.sws}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              item
              xs={5}
              onClick={() => setExpand((prevState) => !prevState)}
              style={{cursor: "pointer"}}
            >
              <Grid container>
                <Typography
                  color="textSecondary"
                  style={{fontWeight: "bold"}}
                >
                  {course.name}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={2}>
              <Grid container>
                <Typography color="textSecondary" variant="button">
                  {validateSubjectType(course.subject_type)}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={1}>
              <Grid container justify="center">
                <IconButton
                  style={{transform: expand ? "rotate(180deg)" : ""}}
                  onClick={() => {
                    if (handleResolvedConflict) {
                      handleResolvedConflict("");
                    }
                    setExpand((prevState) => !prevState);
                  }}
                >
                  <ExpandMoreIcon/>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

          <Collapse in={expand} timeout="auto" unmountOnExit>
            <Grid container>
              {!courseDetails && !expand ? (
                <> {loading} </>
              ) : (
                <>
                  <Grid item xs={12} style={{paddingTop: 16}}>
                    <Divider/>
                  </Grid>
                  <Grid
                    container
                    spacing={3}
                    style={{padding: "36px 40px 40px 40px"}}
                  >
                    <Grid item xs={12}>
                      <Typography variant="h5" gutterBottom>
                        {courseDetails.name}
                      </Typography>
                    </Grid>

                    {/* Left side*/}
                    <Grid item xs={selected ? 12 : 4}>
                      <Grid container>
                        <Grid container style={{paddingBottom: 24}}>
                          <Grid item xs={12} style={{paddingBottom: 8}}>
                            <Typography style={{fontWeight: "bold"}}>
                              Professor(s) / Assistant(s)
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            {courseDetails.professors.map((prof) => {
                              return (
                                <Grid
                                  container
                                  style={{paddingBottom: 8}}
                                  alignItems="center"
                                >
                                  <Grid item style={{marginRight: 16}}>
                                    <Avatar
                                      style={{
                                        backgroundColor: avatarColor,
                                      }}
                                    >
                                      {prof.name.split(" ")[0].charAt(0)}
                                    </Avatar>
                                  </Grid>
                                  <Grid item xs={8}>
                                    <Typography>{prof.name}</Typography>
                                  </Grid>
                                </Grid>
                              );
                            })}
                          </Grid>
                        </Grid>

                        {/* Timetable */}
                        <CourseTimetable
                          selectedTime={selectedTime}
                          timetable={courseDetails.timetable}
                          handleSelectedTime={handleSelectedTime}
                        />
                        {!selected ? (
                          <Grid container style={{marginTop: 24}}>
                            <Button onClick={() => handleCourse({...course, selectedTime: selectedTime})}
                                    startIcon={<AddIcon/>} variant="contained"
                                    style={{backgroundColor: "#FB9B0E", color: "white"}}>
                              Add course
                            </Button>
                          </Grid>
                        ) : <></>}
                      </Grid>
                    </Grid>

                    {selected ? (
                      <>
                        <Grid container justify="space-between" alignItems="center" style={{paddingTop: 8}}>
                          <Button style={{color: "#FB9B0E"}} onClick={() => {
                            if (handleResolvedConflict) {
                              handleResolvedConflict("");
                            }
                            setExpand((prevState) => !prevState);
                          }} startIcon={<CloseIcon/>}>
                            Close
                          </Button>
                          <Tooltip title={<Typography>Show menu</Typography>} arrow>
                            <IconButton onClick={handleToggleMenu}>
                              <MoreVertIcon/>
                            </IconButton>
                          </Tooltip>
                          <Menu anchorEl={openMenu} open={Boolean(openMenu)} onClose={handleToggleMenu}
                                getContentAnchorEl={null}
                                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                                transformOrigin={{vertical: "top", horizontal: "right"}}>
                            <MenuItem onClick={() => {
                              setMore((prevState) => !prevState)
                              handleToggleMenu()
                            }}>
                              <ListItemIcon>
                                <MoreIcon fontSize="small" style={{color: "#FB9B0E"}}/>
                              </ListItemIcon>
                              <Typography variant="inherit">{more ? "Hide details" : "More details"}</Typography>
                            </MenuItem>
                            <Divider style={{marginTop: 4, marginBottom: 4}}/>
                            <MenuItem onClick={() => {
                              handleCourse({...course, selectedTime: selectedTime})
                              handleToggleMenu()
                            }}>
                              <ListItemIcon>
                                <DeleteIcon fontSize="small" style={{color: "red"}}/>
                              </ListItemIcon>
                              <Typography variant="inherit">Remove</Typography>
                            </MenuItem>
                          </Menu>
                        </Grid>

                        {/*<Grid*/}
                        {/*  container*/}
                        {/*  justify="space-between"*/}
                        {/*  style={{paddingTop: 16}}*/}
                        {/*>*/}
                        {/*  <Grid item>*/}
                        {/*    <Button onClick={() => handleCourse({...course, selectedTime: selectedTime})}*/}
                        {/*            startIcon={<DeleteIcon/>} variant="outlined"*/}
                        {/*            style={{borderColor: "red", color: "red"}}>*/}
                        {/*      Remove course*/}
                        {/*    </Button>*/}
                        {/*  </Grid>*/}
                        {/*  <Grid item>*/}
                        {/*    <Button*/}
                        {/*      variant={more ? "outlined" : "contained"}*/}
                        {/*      style={{*/}
                        {/*        borderColor: more ? "#FB9B0E" : "",*/}
                        {/*        backgroundColor: more ? "#FFFFFF" : "#FB9B0E",*/}
                        {/*        color: more ? "#FB9B0E" : "#FFFFFF",*/}
                        {/*      }}*/}
                        {/*      onClick={() => setMore((prevState) => !prevState)}*/}
                        {/*    >*/}
                        {/*      {more ? "Hide details" : "More details"}*/}
                        {/*    </Button>*/}
                        {/*  </Grid>*/}
                        {/*</Grid>*/}


                        {more ? (
                          <>
                            <Grid item xs={selected ? 12 : 8}>
                              <CourseDescription
                                courseDetails={courseDetails}
                                expand={expand}
                              />
                            </Grid>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}

                    {/* Right side */}
                    {selected ? (
                      <></>
                    ) : (
                      <>
                        <Grid item xs={selected ? 12 : 8}>
                          <CourseDescription
                            courseDetails={courseDetails}
                            expand={expand}
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>
                </>
              )}
            </Grid>
          </Collapse>
        </Paper>
      </Grid>
    </>
  );
};

export default Course;

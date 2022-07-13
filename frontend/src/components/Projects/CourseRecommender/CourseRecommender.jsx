import React, { useEffect, useState } from "react";
import {
  Divider,
  Grid,
  InputAdornment,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SelectedKeywords from "./components/SelectedKeywords";
import RecommendedKeywords from "./components/RecommendedKeywords";
import Backend from "../../../assets/functions/Backend";
import Course from "../UDEStudyCompass/components/CourseDetails/Course";
import SelectedCourses from "./components/SelectedCourses";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Button from "@material-ui/core/Button";
import Header from "../UDEStudyCompass/components/Header";

const CourseRecommender = () => {
  const [courses, setCourses] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [selectedCourses, setSelectedCourse] = useState([]);
  const [swsCount, setSwsCount] = useState(0);

  const selectedKeywords = [
    { name: "Machine Learning", value: 2 },
    { name: "Artificial Intelligence", value: 4 },
    { name: "Recommender Systems", value: 4 },
  ];

  const recommendedKeywords = ["Natural Language Processing", "Deep Learning"];

  useEffect(() => {
    if (courses.length === 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      Backend.get("/studycompass/get_lectures_with_root_id", {
        params: { id: "304760" },
      }).then((response) => {
        let tempCourses = [...response.data];
        tempCourses.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        setCourses(tempCourses);
      });
    }
  }, []);

  const handleSelectCourse = (course) => {
    let courseIndex = courses.findIndex((key) => key.id === course.id);
    let tempSelected = [...selectedCourses];
    let tempCourses = [...courses];

    tempSelected.push(course);
    setSelectedCourse(tempSelected);
    if (Boolean(parseInt(course.sws))) {
      setSwsCount((prevState) => prevState + parseInt(course.sws));
    }
    tempCourses.splice(courseIndex, 1);
    setCourses(tempCourses);
  };

  const handleDeselectCourse = (course) => {
    let selectedIndex = selectedCourses.findIndex(
      (key) => key.id === course.id
    );
    let tempSelected = [...selectedCourses];
    let tempCourses = [...courses];

    tempSelected.splice(selectedIndex, 1);
    setSelectedCourse(tempSelected);
    if (Boolean(parseInt(course.sws))) {
      setSwsCount((prevState) => prevState - parseInt(course.sws));
    }
    tempCourses.push(course);
    tempCourses.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
    setCourses(tempCourses);
  };

  return (
    <Grid container style={{ padding: 32 }}>
      <Grid container justify="center">
        <Grid item style={{ paddingBottom: 50 }}>
          <img
            src="/images/course-recommender.svg"
            height="45"
            alt="CourseRecommender Logo"
          />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={4}>
          <SelectedCourses />

          {selectedCourses?.map((course) => {
            return (
              <Course
                key={course.id}
                selected={true}
                course={course}
                handleCourse={handleDeselectCourse}
              />
            );
          })}
        </Grid>

        <Grid item xs={8}>
          <Grid container>
            <Grid container>
              <Typography
                gutterBottom
                color="textSecondary"
                style={{ fontWeight: "bold" }}
              >
                Search for keywords
              </Typography>
            </Grid>

            <Grid item xs={12} style={{ paddingBottom: 24 }}>
              <TextField
                fullWidth
                variant="outlined"
                style={{ backgroundColor: "#fff" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid container>
              <Typography
                gutterBottom
                color="textSecondary"
                style={{ fontWeight: "bold" }}
              >
                Selected keywords
              </Typography>
            </Grid>

            <Grid container spacing={2}>
              {selectedKeywords.map((keyword) => {
                return (
                  <Grid item xs={4}>
                    <SelectedKeywords keyword={keyword} />
                  </Grid>
                );
              })}
            </Grid>

            <Grid
              container
              spacing={2}
              alignItems="center"
              style={{ paddingTop: 32 }}
            >
              <Grid item xs={4} />
              <Grid item xs={4}>
                <Button
                  fullWidth
                  style={{ backgroundColor: "#FB9B0E", color: "#FFF" }}
                  endIcon={<ThumbUpIcon />}
                >
                  Generate recommendations
                </Button>
              </Grid>
              <Grid item xs={4} />
            </Grid>

            <Grid item xs={12} style={{ padding: "32px 0px 32px 0px" }}>
              <Divider />
            </Grid>

            <Grid container>
              <Typography
                gutterBottom
                color="textSecondary"
                style={{ fontWeight: "bold" }}
              >
                Recommended keywords
              </Typography>
            </Grid>

            <Grid container spacing={2} style={{ paddingBottom: 32 }}>
              {recommendedKeywords.map((keyword) => {
                return (
                  <Grid item xs={4}>
                    <RecommendedKeywords keyword={keyword} />
                  </Grid>
                );
              })}
            </Grid>
            <Grid item xs style={{ paddingBottom: 24 }}>
              <Paper>
                <Tabs
                  indicatorColor="primary"
                  textColor="primary"
                  value={tabValue}
                  variant="fullWidth"
                  onChange={(event, value) => setTabValue(value)}
                >
                  <Tab label="Recommended courses" />
                  <Tab label="Recommended study programs" />
                </Tabs>
              </Paper>
            </Grid>

            <Header />

            {courses?.map((course) => {
              return (
                <Course
                  key={course.id}
                  course={course}
                  handleCourse={handleSelectCourse}
                />
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CourseRecommender;

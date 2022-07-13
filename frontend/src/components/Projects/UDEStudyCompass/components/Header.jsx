import React, { useState } from "react";
import { Grid, IconButton, Paper, Typography } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const Header = (props) => {
  const { courses, handleSortCourses } = props;
  const [state, setState] = useState({
    courseTitle: false,
  });

  const handleDirectionCourseTitle = (courses) => {
    let tempCourses = [...courses];

    if (state.courseTitle) {
      tempCourses.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );
    } else {
      tempCourses.sort((a, b) =>
        a.name < b.name ? 1 : b.name < a.name ? -1 : 0
      );
    }
    handleSortCourses(tempCourses);
    setState({ ...state, courseTitle: !state.courseTitle });
  };

  return (
    <>
      <Grid item xs={12} style={{ paddingBottom: 12 }}>
        <Paper style={{ padding: "16px 8px 16px 4px" }} elevation={0}>
          <Grid container alignItems="center">
            <Grid item xs={1} />
            <Grid item xs={2}>
              <Typography
                color="textSecondary"
                variant="body2"
                style={{ fontWeight: "bold", textTransform: "uppercase" }}
              >
                Time
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography
                color="textSecondary"
                variant="body2"
                style={{ fontWeight: "bold", textTransform: "uppercase" }}
              >
                SWS
              </Typography>
            </Grid>

            <Grid item xs={5}>
              <Grid container alignItems="center">
                <Grid item>
                  <IconButton
                    size="small"
                    style={{
                      transform: state.courseTitle ? "rotate(180deg)" : "",
                    }}
                    onClick={() => handleDirectionCourseTitle(courses)}
                  >
                    <ArrowDownwardIcon />
                  </IconButton>
                </Grid>
                <Grid item xs>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                    style={{ fontWeight: "bold", textTransform: "uppercase" }}
                  >
                    Course title
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs>
              <Typography
                color="textSecondary"
                variant="body2"
                style={{ fontWeight: "bold", textTransform: "uppercase" }}
              >
                Course Type
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default Header;

import React from "react";
import { Grid, Typography } from "@material-ui/core";
import WordCloud from "../Wordcloud";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import SchoolIcon from "@material-ui/icons/School";

const CourseDescription = ({ courseDetails, expand }) => {
  const removeFirstWord = (str) => {
    const indexOfSpace = str.indexOf(" ");
    if (indexOfSpace === -1) {
      return "";
    }
    return str.substring(indexOfSpace + 1);
  };

  return (
    <>
      {/*<Grid container>*/}
      <Grid container>
        {courseDetails.keywords.length !== 0 && expand ? (
          <>
            <Typography gutterBottom style={{ fontWeight: "bold" }}>
              Topics
            </Typography>
            <WordCloud keywords={courseDetails.keywords} />
          </>
        ) : (
          <></>
        )}
      </Grid>

      <Grid container>
        {courseDetails.description ? (
          <>
            <Typography gutterBottom style={{ fontWeight: "bold" }}>
              Description
            </Typography>
            <Typography variant="body2" style={{ paddingBottom: 24 }}>
              {removeFirstWord(courseDetails.description)}
            </Typography>
          </>
        ) : (
          <></>
        )}

        {courseDetails.study_programs.length !== 0 ? (
          <>
            <Grid item xs={12} style={{ paddingBottom: 24 }}>
              <Typography style={{ fontWeight: "bold" }} gutterBottom>
                Assigned study programs
              </Typography>

              <Box style={{ marginLeft: 16 }}>
                <ul>
                  {courseDetails.study_programs.map((study_program, index) => {
                    return (
                      <li key={index}>
                        <Typography variant="body2"  gutterBottom>
                          {study_program.name}
                        </Typography>
                      </li>
                    );
                  })}
                </ul>
              </Box>
            </Grid>

            <Button
              variant="outlined"
              startIcon={<SchoolIcon />}
              style={{
                borderColor: "#FB9B0E",
                backgroundColor: "#FFFFFF",
                color: "#FB9B0E",
              }}
              onClick={() => window.open(courseDetails.url, "_blank")}
            >
              LSF
            </Button>
          </>
        ) : (
          <></>
        )}
      </Grid>
      {/*</Grid>*/}
    </>
  );
};

export default CourseDescription;

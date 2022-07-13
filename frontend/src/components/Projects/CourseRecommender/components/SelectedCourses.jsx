import React, { useState } from "react";
import { Grid, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import Header from "../../UDEStudyCompass/components/Header";

const SelectedCourses = () => {
  const [tabValue, setTabValue] = useState(0);

  return (
    <>
      <Grid container>
        <Grid container>
          <Typography color="textSecondary" variant="h6" gutterBottom>
            My selections
          </Typography>
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
              <Tab label="Courses" />
              <Tab label="Study programs" />
            </Tabs>
          </Paper>
        </Grid>

        <Header />
      </Grid>
    </>
  );
};

export default SelectedCourses;

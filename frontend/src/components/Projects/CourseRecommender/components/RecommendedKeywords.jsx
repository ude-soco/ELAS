import React from "react";
import {Grid, IconButton, Paper, Typography} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const RecommendedKeywords = (props) => {
  const {keyword} = props;

  return (
    <>
      <Paper>
        <Grid container alignItems="center">
          <Grid item xs={3} lg={2}>
            <IconButton>
              <AddCircleIcon style={{color: "green"}}/>
            </IconButton>
          </Grid>

          <Grid item xs={7} lg={10}>
            <Typography>{keyword}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default RecommendedKeywords;

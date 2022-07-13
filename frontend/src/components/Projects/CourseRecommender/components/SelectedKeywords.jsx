import React from "react";
import {Grid, IconButton, Paper, Typography} from "@material-ui/core";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Slider from "@material-ui/core/Slider";

const SelectedKeywords = (props) => {
  const {keyword} = props;

  return (
    <>
      <Paper style={{padding: 10}}>
        <Grid container alignItems="center">
          <Grid item xs={2}>
            <IconButton>
              <RemoveCircleIcon style={{color: "red"}}/>
            </IconButton>
          </Grid>

          <Grid item xs={8} style={{paddingLeft: 8, paddingRight: 4}}>
            <Grid container>
              <Grid item xs={12}>
                <Typography>{keyword.name}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Slider value={4} min={0} max={5} style={{color: "#FA9F00"}}/>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={2}>
            <Grid container justify="center">
              <Typography variant="h4">{keyword.value}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>);
};

export default SelectedKeywords;

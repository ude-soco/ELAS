import React from "react";
import Grid from "@material-ui/core/Grid";
import {IconButton, Link, Typography} from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import GitHubIcon from "@material-ui/icons/GitHub";
import {red} from "@material-ui/core/colors";

export default function Footer() {
  return (
    <>
      <Grid container justify="space-between" alignItems="center" style={{padding: 24, backgroundColor: "#fff"}}>
        <Grid item>
          <Typography variant="body2">
            {" Copyright @"}
            <Link color="inherit" href="https://www.uni-due.de/soco" target="_blank">
              Social Computing
            </Link>{" "}
            {new Date().getFullYear()}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Typography style={{marginRight: 1}} variant="body2">
              Follow us
            </Typography>
            <IconButton onClick={() => window.open("https://www.youtube.com/channel/UCQV36Dfq-mfmAG0SqrQ_QbA")}
                        style={{color: red[500]}}>
              <YouTubeIcon/>
            </IconButton>
            <IconButton onClick={() => window.open("https://github.com/ude-soco")} style={{color: "#000"}}>
              <GitHubIcon/>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

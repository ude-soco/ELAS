import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Divider, IconButton, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import YouTubeIcon from "@material-ui/icons/YouTube";
import GitHubIcon from "@material-ui/icons/GitHub";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  footerContainer: {
    margin: theme.spacing(5, 0, 5, 0)
  },
  gutterBottom: {
    marginBottom: theme.spacing(2)
  }
}))

export default function Footer(props) {
  const classes = useStyles();

  return (
    <>
      <Divider style={{marginTop: 24}}/>
      <Grid container>
        <Grid item xs={false} sm={2}/>
        <Grid item xs={12} sm={8}>
          <Grid container direction="column" className={classes.footerContainer} justify="space-around">
            <Grid item style={{marginBottom: 24}} onClick={() => window.open("https://www.uni-due.de/soco/")}>
              <Box>
                <img src="/images/logos/soco-logo.png" height='60' alt="Soco Logo"
                     style={{cursor: "pointer"}}/>
              </Box>
            </Grid>
            <Grid item>
              <Grid container spacing={10} justify="center">
                <Grid item lg={4}>
                  <Typography variant="body2" className={classes.gutterBottom}>
                    <b>About Social Computing Group</b>
                  </Typography>
                  <Button variant="contained" color="primary" size="small"
                          onClick={() => window.open("https://www.uni-due.de/soco/")}
                          style={{marginTop: 16}}>
                    Visit Us
                  </Button>
                </Grid>
                <Grid item lg={4}>
                  <Typography variant="body2" className={classes.gutterBottom}><b>Follow Us</b></Typography>
                  <Typography variant="body2">Visit our GitHub & YouTube Channel</Typography>
                  <Grid container alignItems="center">
                    <IconButton onClick={() => window.open("https://github.com/ude-soco")}>
                      <GitHubIcon/>
                    </IconButton>
                    <IconButton onClick={() => window.open("https://www.youtube.com/channel/UCQV36Dfq-mfmAG0SqrQ_QbA")}>
                      <YouTubeIcon color="secondary"/>
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid item lg={4}>
                  <Typography variant="body2" className={classes.gutterBottom}><b>Contact Us</b></Typography>
                  <Typography variant="body2">Universität Duisburg-Essen</Typography>
                  <Typography variant="body2">Fakultät für Ingenieurwissenschaften</Typography>
                  <Typography variant="body2">Abteilung INKO</Typography>
                  <Typography variant="body2">Fachgebiet Social Computing</Typography>
                  <Typography variant="body2">Forsthausweg 2</Typography>
                  <Typography variant="body2" className={classes.gutterBottom}>47057 Duisburg</Typography>
                  <Box>
                    <img src="/images/logos/ude-logo.svg" height='60' alt="UDE Logo"
                         style={{cursor: "pointer"}}
                         onClick={() => window.open("https://www.uni-due.de/en/index.php")}/>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={false} sm={2}/>
      </Grid>

    </>

  );
}
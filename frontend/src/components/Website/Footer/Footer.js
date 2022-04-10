import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Divider, IconButton, Typography} from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import GitHubIcon from "@material-ui/icons/GitHub";
import {red} from '@material-ui/core/colors';

export default function Footer() {

  return (
    <>
      <Divider style={{marginTop: 24}}/>
      <Grid container style={{backgroundColor: "#fff", paddingTop: 24,}}>
        <Grid item xs={false} sm={2}/>
        {/*<Grid item xs={12} sm={8}>*/}
        <Grid item xs>
          <Typography variant="h6" gutterBottom color="text.secondary">About Us</Typography>
          <Typography gutterBottom>Social Computing Group</Typography>
          <img src="/images/logos/soco-logo.png" alt="Soco Logo" height='55'
               style={{cursor: "pointer"}} onClick={() => window.open("https://www.uni-due.de/soco/")}
          />
        </Grid>
        <Grid item xs>
          <Typography variant="h6" gutterBottom color="text.secondary">Follow Us</Typography>
          <Typography gutterBottom>Visit our GitHub & YouTube Channel</Typography>
          <Grid container>
            <IconButton
              style={{backgroundColor: "#000", color: '#fff'}}
              onClick={() => window.open("https://github.com/ude-soco")}
            >
              <GitHubIcon/>
            </IconButton>
            <IconButton
              style={{backgroundColor: red[500], color: "#fff", marginLeft: 8}}
              onClick={() => window.open("https://www.youtube.com/channel/UCQV36Dfq-mfmAG0SqrQ_QbA")}
            >
              <YouTubeIcon/>
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs>
          <Typography variant="h6" gutterBottom color="text.secondary">Contact Us</Typography>
          <Typography>University of Duisburg-Essen</Typography>
          <Typography>Faculty of Engineering</Typography>
          <Typography>Department INKO</Typography>
          <Typography>Social Computing</Typography>
          <Typography>Forsthausweg 2</Typography>
          <Typography gutterBottom>47057 Duisburg</Typography>
          <img src="/images/logos/ude-logo.svg" height='45' alt="UDE Logo"
               style={{cursor: "pointer"}}
               onClick={() => window.open("https://www.uni-due.de/en/index.php")}/>
        </Grid>
        {/*</Grid>*/}
        <Grid item xs={false} sm={2}/>
      </Grid>

    </>

  );
}

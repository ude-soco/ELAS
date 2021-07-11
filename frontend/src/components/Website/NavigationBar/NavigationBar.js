import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {Box, CssBaseline, Grid} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginLeft: theme.spacing(2),
    color: theme.palette.primary.main
  },
  primaryButton: {
    margin: theme.spacing(0, 1, 0, 1),
  },
  secondaryButton: {
    margin: theme.spacing(0, 1, 0, 1),
    color: theme.palette.primary.main,
  }
}));

export default function NavigationBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const isLoggedIn = !!sessionStorage.getItem('elas_userLoggedIn');

  const handleSignOut = () => {
    sessionStorage.clear();
    window.location.href = "/";
  }

  return (
    <Box className={classes.root}>
      <CssBaseline/>
      <AppBar position="fixed" color="inherit" style={{backgroundColor: '#fff'}}>
        <Toolbar>
          <Grid container>
            <Grid item xs className={classes.title} alignItems="center">
              <img src="/images/logos/cover.png" height='35' alt="ELAS Logo"
                   onClick={() => history.push('/')} style={{cursor: "pointer"}}/>
            </Grid>
            {isLoggedIn ? (
              <Grid item>
                <Button color="primary" startIcon={<ExitToAppIcon/>} className={classes.primaryButton}
                        onClick={handleSignOut}> Sign out </Button>
              </Grid>
            ) : (
              <Grid item>
                <Button variant="outlined" className={classes.secondaryButton}
                        onClick={() => history.push('/login')}>Login</Button>
                <Button variant="contained" color="primary" className={classes.primaryButton}
                        onClick={() => history.push('/register')}>Register</Button>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
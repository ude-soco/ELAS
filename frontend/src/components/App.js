import {Redirect, Route, Switch} from "react-router-dom";
import Home from "./Website/Home/Home";
import NavigationBar from "./Website/NavigationBar/NavigationBar";
import {Grid} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ScrollToTop from "./Reuseable/ScrollToTop/ScrollToTop";
import Login from "./Website/Login/Login";
import AuthorizedRoute from "../assets/functions/AuthorizedRoute";
import StudyCompass from "./Projects/StudyCompass/StudyCompass";
import E3Selector from "./Projects/E3Selector/E3Selector";
import Intogen from "./Projects/Intogen/Intogen";
import Footer from "./Website/Footer/Footer";
import Admin from "./Website/Admin/Admin";
import Registration from "./Website/Registration/Registration";

const useStyles = makeStyles(theme => ({
  containerHeader: {
    marginTop: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4)
  },
  gridContainer: {
    marginTop: theme.spacing(8),
    position: "relative",
    minHeight: "100vh"
  },
  container: {
    margin: theme.spacing(5, 4, 0, 4),
  }
}))


export default function App() {
  const classes = useStyles();
  const isLoggedIn = !!sessionStorage.getItem('elas_userLoggedIn');

  return (
    <>
      <NavigationBar/>
      <Switch>
        <Grid container direction="column" className={classes.gridContainer}>
          <Route exact path='/' render={() => <Home classes={classes}/>}/>
          <Route exact path='/login' render={() => <Login classes={classes}/>}/>
          <Route exact path='/register' render={() => <Registration classes={classes}/>}/>
          <Route exact path='/studycompass' render={() => <StudyCompass classes={classes}/>}/>
          <Route exact path='/e3selector' render={() => <E3Selector classes={classes}/>}/>
          <Route exact path='/intogen' render={() => <Intogen classes={classes}/>}/>

          {!isLoggedIn ?
            <Route render={() => <Redirect to={{pathname: "/"}}/>}/> :
            <AuthorizedRoute isAuth={isLoggedIn} path='/admin' component={Admin} classes={classes}/>
          }
          <Route render={() => <Redirect to={{pathname: "/"}}/>}/>
        </Grid>
      </Switch>
      <Footer/>
      <ScrollToTop/>
    </>
  );
}

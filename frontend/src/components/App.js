import {Redirect, Route, Switch} from "react-router-dom";
import Home from "./Website/Home/Home";
import NavigationBar from "./Website/NavigationBar/NavigationBar";
import {Grid} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ScrollToTop from "./Reuseable/ScrollToTop/ScrollToTop";
import Login from "./Website/Login/Login";
import Registration from "./Website/Registration/Registration";
import AuthorizedRoute from "../assets/functions/AuthorizedRoute";
import CourseInsights from "./Projects/CourseInsights/CourseInsights";
import E3Selector from "./Projects/E3Selector/E3Selector";
import InEval from "./Projects/InEval/InEval";
import Intogen from "./Projects/Intogen/Intogen";
import Spoa from "./Projects/Spoa/Spoa";
import StudySoon from "./Projects/StudySoon/StudySoon";
import Footer from "./Website/Footer/Footer";

const useStyles = makeStyles(theme => ({
  gridHeader: {
    marginTop: theme.spacing(4),
  },
  gridContainer: {
    marginTop: theme.spacing(13),
    padding: theme.spacing(0, 4, 0, 4),
    position: "relative",
    minHeight: "100vh"
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
          {!isLoggedIn ? (
            <>
              <Route exact path='/' render={() => <Home classes={classes}/>}/>
              <Route exact path='/login' render={() => <Login classes={classes}/>}/>
              <Route exact path='/register' render={() => <Registration classes={classes}/>}/>
            </>
          ) : (
            <>
              <Route exact path='/' render={() => <Home classes={classes}/>}/>
              <Route exact path='/login' render={() => <Login classes={classes}/>}/>
              <Route exact path='/register' render={() => <Registration classes={classes}/>}/>
              <AuthorizedRoute isAuth={isLoggedIn} path='/courseinsights' component={CourseInsights} classes={classes}/>
              <AuthorizedRoute isAuth={isLoggedIn} path='/e3selector' component={E3Selector} classes={classes}/>
              <AuthorizedRoute isAuth={isLoggedIn} path='/ineval' component={InEval} classes={classes}/>
              <AuthorizedRoute isAuth={isLoggedIn} path='/intogen' component={Intogen} classes={classes}/>
              <AuthorizedRoute isAuth={isLoggedIn} path='/spoa' component={Spoa} classes={classes}/>
              <AuthorizedRoute isAuth={isLoggedIn} path='/studysoon' component={StudySoon} classes={classes}/>
            </>
          )}
          <Route render={() => <Redirect to={{pathname: "/"}}/>}/>


        </Grid>
      </Switch>
      <Footer />
      <ScrollToTop/>
    </>
  );
}
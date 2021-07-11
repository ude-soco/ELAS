import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleUp} from "@fortawesome/free-solid-svg-icons";
import {Fab, Fade, makeStyles, Tooltip, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  scrollToTop: {
    margin: theme.spacing(0),
    top: "auto",
    left: "auto",
    right: theme.spacing(2.5),
    bottom: theme.spacing(5.5),
    position: 'fixed',
    transition: "all .3s linear",
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.light,
    '&:hover': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
    },
  },
}))

export default function ScrollToTop() {
  const classes = useStyles();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 30) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <Fade in={isVisible} style={{transitionDelay: '70ms'}}>
      <Tooltip arrow title={
        <Typography variant="body2">
          Scroll to top
        </Typography>} placement="left" size="small">
        <Fab size="large" onClick={scrollToTop} className={classes.scrollToTop}>
          <FontAwesomeIcon icon={faAngleUp} size={"2x"}/>
        </Fab>
      </Tooltip>
    </Fade>
  );
}
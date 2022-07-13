import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Checkbox } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  icon: {
    borderRadius: 3,
    width: 24,
    height: 24,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    "hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    borderRadius: 3,
    width: 24,
    height: 24,
    backgroundColor: theme.palette.primary.main,
    "hover ~ &": {
      backgroundColor: theme.palette.primary.light,
    },
  },
}));

const CustomCheckbox = ({ reset, timeData, handleFilterSchedule }) => {
  const [state, setState] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setState(false);
  }, [reset]);

  return (
    <>
      <Checkbox
        checked={state}
        checkedIcon={<span className={classes.checkedIcon} />}
        icon={<span className={classes.icon} />}
        onChange={() => {
          setState((prevState) => !prevState);
          handleFilterSchedule(timeData);
        }}
      />
    </>
  );
};

export default CustomCheckbox;

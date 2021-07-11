import React from 'react';
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";

export function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SnackbarMessage(props) {
  // Props
  const {
    message,
    type,
    openSnackbar,
    setOpenSnackbar,
    duration,
    buttonAction,
    buttonMessage
  } = props;

  // Function: SnackbarMessage -> Handles to close the snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={duration}
        onClose={handleCloseSnackbar}
        // anchorOrigin={{
        //   vertical: 'top',
        //   horizontal: 'right',
        // }}
      >
        <Alert onClose={handleCloseSnackbar} severity={type} action={buttonMessage ? (
          <Button variant="outlined" style={{color: '#fff', borderColor: "#fff"}}
                  onClick={buttonAction}>{buttonMessage}</Button>
        ) : ""}>
          {message}
        </Alert>

      </Snackbar>
    </>
  )
}

export default SnackbarMessage;
import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Backend from "../../../assets/functions/Backend";
import { Backdrop, CircularProgress } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.uni-due.de/soco/">
        Social Computing Group
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(images/default.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "contain",
    marginTop: theme.spacing(12),
  },
  paper: {
    margin: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: theme.spacing(1, 0.25, 1, 0.25),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [openLoading, setOpenLoading] = useState(false);
  const [errorLoginMessage, setErrorLoginMessage] = useState("");
  const [formFields, setFormFields] = React.useState({
    email: "",
    password: "",
    emailError: {
      error: false,
      message: "",
    },
    passwordError: {
      error: false,
      message: "",
    },
  });

  const handleFormFields = (event) => {
    const { name, value } = event.target;
    if (errorLoginMessage) setErrorLoginMessage("");
    setFormFields(() => ({
      ...formFields,
      [name]: value,
      emailError: {
        ...formFields.emailError,
        error: false,
        message: "",
      },
      passwordError: {
        ...formFields.passwordError,
        error: false,
        message: "",
      },
    }));
  };

  const validate = () => {
    if (!formFields.email.includes("@")) {
      setFormFields({
        ...formFields,
        emailError: {
          error: true,
          message: "Invalid e-mail address",
        },
      });
      return false;
    } else if (!formFields.password) {
      setFormFields({
        ...formFields,
        passwordError: {
          error: true,
          message: "Invalid password",
        },
      });
      return false;
    } else return true;
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    if (validate()) {
      setOpenLoading(true);
      Backend.post("/login", {
        email: formFields.email,
        password: formFields.password,
      })
        .then((response) => {
          if (response.data.token) {
            sessionStorage.setItem("elas_userLoggedIn", true);
            sessionStorage.setItem("elas_user", JSON.stringify(response.data));
            window.location.href = "/";
          }
          if (response.data.error) {
            setOpenLoading(false);
            setErrorLoginMessage(response.data.error);
          }
        })
        .catch((error) => {
          setOpenLoading(false);
          setErrorLoginMessage("Network error");
        });
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      {/*<Grid item xs={false} md={7} className={classes.image}/>*/}
      <Grid item xs={false} md={2} lg={3} xl={4} />
      <Grid item xs={12} md={8} lg={6} xl={4} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSignIn}>
            <TextField
              variant="outlined"
              margin="normal"
              error={formFields.emailError.error}
              helperText={formFields.emailError.message}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              onChange={handleFormFields}
            />
            <TextField
              variant="outlined"
              margin="normal"
              error={formFields.passwordError.error}
              helperText={formFields.passwordError.message}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleFormFields}
            />
            {errorLoginMessage ? (
              <Grid
                container
                style={{ marginTop: 16 }}
                spacing={1}
                alignItems="center"
              >
                <Grid item>
                  {" "}
                  <ErrorIcon color="secondary" />{" "}
                </Grid>
                <Grid item>
                  {" "}
                  <Typography gutterBottom>
                    {errorLoginMessage}!
                  </Typography>{" "}
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              <Grid container alignItems="center" style={{ height: 32 }}>
                <Grid item xs>
                  Login
                </Grid>
                <ArrowForwardIcon />
              </Grid>
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => history.push("/register")}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
      <Backdrop className={classes.backdrop} open={openLoading}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <CircularProgress color="inherit" size={60} />
          </Grid>
          <Grid item>
            <Typography>Login Successful!</Typography>
          </Grid>
        </Grid>
      </Backdrop>
      <Grid item xs={false} md={2} lg={3} xl={4} />
    </Grid>
  );
}

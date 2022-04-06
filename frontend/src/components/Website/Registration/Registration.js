import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";
import Backend from "../../../assets/functions/Backend";
import SnackbarMessage from "../../Reuseable/SnackbarMessage/SnackbarMessage";
import ErrorIcon from "@material-ui/icons/Error";


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(images/default.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'contain',
    marginTop: theme.spacing(12)
  },
  paper: {
    margin: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Registration() {
  const classes = useStyles();
  const history = useHistory();
  const [completeRegistration, setCompleteRegistration] = useState(false);
  const [errorRegisterMessage, setErrorRegisterMessage] = useState("")
  const [formFields, setFormFields] = React.useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    firstnameError: {
      error: false,
      message: ''
    },
    lastnameError: {
      error: false,
      message: ''
    },
    emailError: {
      error: false,
      message: ''
    },
    passwordError: {
      error: false,
      message: ''
    }
  });

  const handleFormFields = (event) => {
    const {name, value} = event.target;
    if (errorRegisterMessage)
      setErrorRegisterMessage("")
    setFormFields(() => ({
      ...formFields,
      [name]: value,
      firstnameError: {
        ...formFields.firstnameError,
        error: false,
        message: ''
      },
      lastnameError: {
        ...formFields.lastnameError,
        error: false,
        message: ''
      },
      emailError: {
        ...formFields.emailError,
        error: false,
        message: ''
      },
      passwordError: {
        ...formFields.passwordError,
        error: false,
        message: ''
      }
    }));
  };

  const validate = () => {
    if (!formFields.firstname) {
      setFormFields({
        ...formFields,
        firstnameError: {
          error: true,
          message: "Invalid first name"
        },
      })
      return false;
    } else if (!formFields.lastname) {
      setFormFields({
        ...formFields,
        lastnameError: {
          error: true,
          message: "Invalid last name"
        },
      })
      return false;
    } else if (!formFields.email.includes('@')) {
      setFormFields({
        ...formFields,
        emailError: {
          error: true,
          message: "Invalid e-mail address"
        },
      })
      return false;
    } else if (!formFields.password) {
      setFormFields({
        ...formFields,
        passwordError: {
          error: true,
          message: "Invalid password"
        },
      })
      return false;
    } else return true;
  }

  const handleRegistration = (event) => {
    event.preventDefault();
    if (validate()) {
      Backend.post('/register', {
        firstname: formFields.firstname,
        lastname: formFields.lastname,
        email: formFields.email,
        password: formFields.password,
      }).then(response => {
        if (response.data.success) {
          setCompleteRegistration(true);
          setTimeout(() => {
            history.push('/login');
          }, 3000)
        }
        if (response.data.error) {
          setErrorRegisterMessage(response.data.error);
        }
      }).catch(error => {
        console.log(error);
      })
    }
  };


  return (
    <Grid container component="main" justify="center" className={classes.root}>
      <CssBaseline/>
      <Grid item xs={12} md={5} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleRegistration}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  error={formFields.firstnameError.error}
                  helperText={formFields.firstnameError.message}
                  name="firstname"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                  onChange={handleFormFields}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  error={formFields.lastnameError.error}
                  helperText={formFields.lastnameError.message}
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="lname"
                  onChange={handleFormFields}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  error={formFields.emailError.error}
                  helperText={formFields.emailError.message}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleFormFields}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
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
              </Grid>
            </Grid>
            {errorRegisterMessage ? (
              <Grid container style={{marginTop: 24}} spacing={1}>
                <Grid item> <ErrorIcon color="secondary"/> </Grid>
                <Grid item> <Typography>{errorRegisterMessage}!</Typography> </Grid>
              </Grid>
            ) : <></>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={() => history.push('/login')}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
      <SnackbarMessage
        message={<Typography component={'span'}>Registration complete</Typography>}
        type="success"
        openSnackbar={completeRegistration}
        setOpenSnackbar={setCompleteRegistration}
        duration={3000}
      />
    </Grid>
  );
}

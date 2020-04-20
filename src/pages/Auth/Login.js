import React, {useContext, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
// import {clientRestPxp} from "clientpxpjs/js/clientRestPxp";
import { clientPxp, clientPxp2 } from '../../libs/sdk/config';
import {md5} from "../../libs/clientpxpjs/js/md5";
import { UserContext } from './UserContext';

import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="secondary" align="center">
      {'Copyright © '}
      <Link color="secondary" href="http://www.kplian.com">
        Kplian
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(0),
    width: theme.spacing(16),
    height: theme.spacing(16),
    marginTop: '-50px',
    marginBottom: '35px',
    // height: '150px',
    // width: '150px',
    borderRadius: '75px',
    boxShadow: '0px 0px 3px #3b4652',
    // backgroundColor: 'theme.palette.secondary.main',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    color: theme.palette.kplian
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.common.white,
    fontWeight: '700',
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.kplian,
    },
  },
  container: {
    backgroundColor: 'rgb(36,36,36, .6)',
    padding: '0 18px',
    boxShadow: '0px 0px 3px #848484',
    borderRadius:'10px',
    marginTop:'120px',
  },
  loginContent: {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    background: 'url("/assets/images/main.jpg") no-repeat center center fixed',
    backgroundSize: 'cover'
  },
  loginInput: {
    marginBottom: '35px',
    fontSize: '18px',
    height: '42px',
    color: theme.palette.common.white,
    '& input:-internal-autofill-selected': {
        backgroundColor: 'none',
    },
    '& label.Mui-focused': {
        color: theme.palette.kplian,
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    '& .MuiInputLabel-formControl': {
        color: theme.palette.kplian,
    },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: theme.palette.kplian,
        },
        '&:hover fieldset': {
          borderColor: theme.palette.kplian,
        },
        '&.Mui-focused fieldset': {
          borderColor: theme.palette.kplian,
        },
        '& .MuiInputBase-input': {
            background: theme.palette.common.dark,
            color: theme.palette.common.white,
            fontSize: '18px',

        }
      },
  }
}));

export default function SignIn() {
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const {userContext, setUserContext} = useContext(UserContext);
    useEffect(() => {
        if( userContext !== null ) {
            history.replace(from);
        }
    }, [userContext]);

    const handleUser = e => {
        setUser(e.target.value)
    };
    const handlePassword = e => {
        setPassword(e.target.value)
    };
    const handleEnviar = e => {
        e.preventDefault()

        console.log(` user ${user} password ${password}`)

        // let client = new clientRestPxp('admin.disydes.com', 'DOMAIN');
        // let client = new clientRestPxp('3.133.135.231/kerp20201', 'DOMAIN');
        
        const prom = clientPxp2.authenticate('admin', 'admin');
          prom.then(resp => {
            console.log('2LOGINN:',resp);
            localStorage.setItem('auth', JSON.stringify({...resp, client: clientPxp2, username:user}));
            setUserContext({...resp, client: clientPxp2, username:user});
            history.replace(from);
        });
 
        clientPxp.setCredentialsPxp(user, md5(password));
        clientPxp.genHeaders();

        clientPxp.verifyUser(function (resp) {
            // if(resp.success) {
            //     localStorage.setItem('auth', JSON.stringify({...resp, client: clientPxp, username:user}));
            //     setUserContext({...resp, client: clientPxp, username:user});
            //     history.replace(from);
            // }
        });
    };

  const classes = useStyles();

  return (
      <div className={classes.loginContent}>
        <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
            <img className={classes.avatar} src="/assets/images/user.svg"/>

            <form className={classes.form} noValidate>
            <TextField
                className={classes.loginInput}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="cuenta"
                label="Cuenta"
                name="cuenta"
                autoComplete="off"
                autoFocus
                onChange={handleUser}
            />
            <TextField
                className={classes.loginInput}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handlePassword}
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="secondary" />}
                label="Remember me"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleEnviar}
                className={classes.submit}
            >
                Ingresar
            </Button>
            </form>
        </div>
        <Box mt={2}>
            <Copyright />
        </Box>
        </Container>
      </div>
    
  );
}
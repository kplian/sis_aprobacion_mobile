import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppRouter from './routes/AppRouter';
import * as serviceWorker from './serviceWorker';
import Login from './pages/Auth/Login';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
// import { red  } from '@material-ui/core/colors';
import 'typeface-roboto';

const theme = createMuiTheme({
    palette: {
      primary: { main: "#e35a47" }, 
      secondary: { main: "#176dd4" }, // This is just green.A700 as hex.
      dark: { main: "#262626" }, 

      kplian: '#e35a47',
    //   type: "dark"
    }
});

ReactDOM.render( 
    <MuiThemeProvider theme={theme}>
        <React.Fragment>
        <CssBaseline />
        <AppRouter />
    </React.Fragment>
    </MuiThemeProvider>,
     document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

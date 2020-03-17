import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store';

import './index.css';
import App from './App';
import AppRouter from './routes/AppRouter';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

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

const store = configureStore();

ReactDOM.render( 
    <Provider store={ store }>
        <MuiThemeProvider theme={theme}>
            <React.Fragment>
                <CssBaseline />
                <AppRouter />
            </React.Fragment>
        </MuiThemeProvider>
    </Provider>
    ,
     document.getElementById('root')
);



import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store';

import './index.css';
import App from './App';
import AppRouter from './routes/AppRouter';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeContext } from './pages/Dashboard/main-context';
import 'typeface-roboto';

const theme = createMuiTheme({
    palette: {
    //   primary: { main: "#e35a47" }, 
      secondary: { main: "#176dd4" }, // This is just green.A700 as hex.
    //   dark: { main: "#262626" }, 

    //   kplian: '#e35a47',
      // type: "dark"
    }
});

const themeDark = createMuiTheme({
    palette: {
      primary: { 
          light: "#e35a47",
          main: "#e35a47",
          dark: "#e35a47" 
     }, 
      secondary: {
          light: "#e35a47",
          main: "#e35a47",
          dark: "#e35a47"  
    }, // This is just green.A700 as hex.
      dark: { main: "#262626" }, 

      kplian: '#e35a47',
      type: "dark"
    }
});

const store = configureStore();

const Main = () => {
  
    // const { isThemeLight } = React.useContext(ThemeContext);
    const [isThemeLight, setIsThemeLight] = React.useState(true);

     console.log('theme', isThemeLight);
     const currentTheme = isThemeLight ? theme : themeDark;
      

     return (
         <Provider store={ store }>
          <ThemeContext.Provider value={{ isThemeLight: isThemeLight, setIsThemeLight: setIsThemeLight }}>
            <MuiThemeProvider theme={ currentTheme }>
                <React.Fragment>
                    <CssBaseline />
                    <AppRouter />
                </React.Fragment>
            </MuiThemeProvider>
          </ThemeContext.Provider>          
        </Provider>
     );
}

ReactDOM.render( 
    <Main/>
    ,
     document.getElementById('root')
);



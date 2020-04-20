import {createContext} from "react";

export const ThemeContext = createContext({
    isThemeLight: true,
    setIsThemeLight: function (value) { 
        this.isThemeLight = value;
    }
});
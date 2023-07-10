import { createContext, useContext, useEffect, useState } from "react";
import React from 'react'

export const ThemeContext = createContext();



function ThemeProvider({children}) {
    const[themeType, setThemeType] = useState(
        localStorage.getItem("theme") === "dark" ? true : false
    )

    useEffect(() => {
        localStorage.setItem("theme", `${themeType ? "dark" : "light"}`);
        const activeTheme = localStorage.getItem("theme");
        if (activeTheme === "light") {
          document.documentElement.classList.add("light");
          document.documentElement.classList.remove("dark");
        } else {
          document.documentElement.classList.add("dark");
          document.documentElement.classList.remove("light");
        }
      }, [themeType]);


    return (
        <ThemeContext.Provider value={{themeType, setThemeType}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider

export const useTheme = () => useContext(ThemeContext)


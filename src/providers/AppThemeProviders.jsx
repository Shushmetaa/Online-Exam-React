import { ThemeProvider } from "styled-components";
import { useMemo } from "react";
import { lightTheme,darkTheme } from "../styles/theme";
import { useSelector } from "react-redux";


export function AppThemeProvider({children}){
    const isDark=useSelector((state)=>state.theme.isDark);
     const theme=useMemo(()=>(isDark?darkTheme:lightTheme),[isDark]);
    return(
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
    )
}
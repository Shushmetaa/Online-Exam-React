import { createSlice } from "@reduxjs/toolkit"

const initialState={
    isDark:false,
}

const ThemeSlice=createSlice({
   name:"switchTheme",
   initialState,
   reducers:{
    toggleTheme(state){
        state.isDark=!state.isDark;
    },
   },
});

export const ThemeReducers=ThemeSlice.actions;
export default ThemeSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const languageSlice = createSlice({
    name: "language",
    initialState: {
        languageChoice: "default",
        pickedLanguage: ["welcome-language-picked", "welcome-language-unpicked"]
    },
    reducers:{
        changeLanguage: (state, action) => {
            state.languageChoice = action.payload.language;
        },
        changePickedLanguage: (state, action) => {
            state.pickedLanguage = action.payload.pickedLanguage
        }
    },
});

export const { changeLanguage, changePickedLanguage } = languageSlice.actions;
export default languageSlice.reducer;
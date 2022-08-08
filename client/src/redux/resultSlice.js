import { createSlice } from "@reduxjs/toolkit";

export const resultSlice = createSlice({
    name: "result",
    initialState: {
        correctKeystrokes: 0,
        incorrectKeystrokes: 0,
        accuracy: 0,
        correctWords: 0,
        incorrectWords: 0,
        resultDone: false
    },
    reducers:{
        changeCorrectKeystrokes: (state, action) => {
            state.correctKeystrokes = action.payload;
        },
        changeIncorrectKeystrokes: (state, action) => {
            state.incorrectKeystrokes = action.payload;
        },
        changeAccuracy: (state, action) => {
            state.accuracy = action.payload
        },
        changeCorrectWords: (state, action) => {
            state.correctWords = action.payload
        },
        changeIncorrectWords: (state, action) => {
            state.incorrectWords = action.payload
        },
        changeResultDone: (state, action) => {
            state.resultDone = action.payload
        },
    },
});

export const { changeCorrectKeystrokes,changeIncorrectKeystrokes , changeAccuracy, changeCorrectWords, changeIncorrectWords, changeResultDone} = resultSlice.actions;
export default resultSlice.reducer;
import {createSlice} from "@reduxjs/toolkit";

export const wordSlice = createSlice({
    name: "word",
    initialState:{
        datas: {
            words: "ha",
        },
        pending: false,
        error: false
    },
    reducers: {
        getStart:(state) => {
            state.pending = true;
        },
        getSuccess:(state,action) => {
            state.pending = false;
            state.datas = action.payload;

        },
        getError: (state) => {
            state.error = true;
            state.pending = false;
        },
    },
});

export const { getStart, getSuccess, getError } = wordSlice.actions;
export default wordSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const startSlice = createSlice({
    name: "start",
    initialState: {
        started: false,
    },
    reducers:{
        changeStart: (state, action) => {
            state.started = action.payload.started;
        },
    },
});

export const { changeStart } = startSlice.actions;
export default startSlice.reducer;
//Redux
import { createSlice } from "@reduxjs/toolkit";

const LayoutSlice = createSlice({
    name: "layout",
    initialState: {
        code: '',
    },
    reducers: {
        clearTheInput: (state, action) => {
            state.code = ''
        },
        updateTheCode: (state, action) => {
            state.code = action.payload.code
        },
    },
});

export const { clearTheInput, updateTheCode } = LayoutSlice.actions;

export default LayoutSlice;

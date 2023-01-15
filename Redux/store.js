import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";

// Import Reducers
import LayoutSlice from "./Reducers/layoutReducer";
// Put All Reducers Together
const AllReducers = {
    reducer: {
        [LayoutSlice.name]: LayoutSlice.reducer,
    },
};

// Make the Store with All Reducers
const makeStore = () => configureStore(AllReducers);

//  Create the next Wrapper to apply the store
export const wrapper = createWrapper(
    makeStore,
    applyMiddleware(composeWithDevTools)
);

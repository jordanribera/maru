import { createReducer } from "@reduxjs/toolkit";
import { read } from "../client/localStorage";

const initialState = {
  ...{
    showLabels: false,
    darkMode: true,
    themeColor: "blue",
    expandArt: true,
  },
  ...read("shell"),
};

const shellReducer = createReducer(initialState, {
  SET_DARKMODE: (state, action) => {
    state.darkMode = action.value;
  },

  SET_THEMECOLOR: (state, action) => {
    state.themeColor = action.value;
  },
});

export default shellReducer;

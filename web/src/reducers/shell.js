import { createReducer } from "@reduxjs/toolkit";
import { read } from "../client/localStorage";

const initialState = {
  ...{
    showLabels: false,
    darkMode: true,
    themeColor: "blue",
    expandArt: true,
    volume: 100,
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

  SET_EXPANDART: (state, action) => {
    state.expandArt = action.value;
  },

  SET_VOLUME: (state, action) => {
    state.volume = Math.max(Math.min(action.value, 1), 0);
  },
});

export default shellReducer;

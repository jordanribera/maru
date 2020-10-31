import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  activeTab: 1,
  showLabels: false,
  darkMode: true,
  themeColor: "blue",
  expandArt: true,
};

const shellReducer = createReducer(initialState, {
  ACTIVATE_TAB: (state, action) => {
    state.activeTab = action.value;
  },

  SET_DARKMODE: (state, action) => {
    state.darkMode = action.value;
  },

  SET_THEMECOLOR: (state, action) => {
    state.themeColor = action.value;
  },
});

export default shellReducer;

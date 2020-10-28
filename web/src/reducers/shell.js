import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  activeTab: 0,
  showLabels: false,
  darkMode: true,
  expandArt: true,
};

const shellReducer = createReducer(initialState, {
  ACTIVATE_TAB: (state, action) => {
    state.activeTab = action.value;
  },

  SET_DARKMODE: (state, action) => {
    state.darkMode = action.value;
  },
});

export default shellReducer;

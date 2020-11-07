import { createReducer } from "@reduxjs/toolkit";
import { read } from "../client/localStorage";

const initialState = {
  ...{
    host: null,
    token: null,
  },
  ...read("api"),
};

const apiReducer = createReducer(initialState, {
  SET_TOKEN: (state, action) => {
    state.token = action.value;
  },
});

export default apiReducer;

import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  queue: [],
}

const queueReducer = createReducer(initialState, {
  ADD_ITEMS: (state, action) => {
    /* do something */
    state.queue = action.items;
    return state;
  },
  REMOVE_ITEMS: (state, action) => {
    /* do something */
    state.queue = [];
    return state;
  },
});

export default queueReducer;

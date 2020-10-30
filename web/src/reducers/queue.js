import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  primary: [],
};

const queueReducer = createReducer(initialState, {
  ADD_ITEMS: (state, action) => {
    /* do something */
    if (action.target == null) {
      /* add to the end of the queue */
      state.primary = [...state.primary, ...action.items];
    } else {
      state.primary.splice(action.target, 0, ...action.items);
    }

    return state;
  },
  REMOVE_ITEMS: (state, action) => {
    /* do something */
    state.primary = [];
    return state;
  },

  ADVANCE_QUEUE: (state, action) => {
    let moving = state.primary.shift();
    state.primary.push(moving);
    return state;
  },
  REVERSE_QUEUE: (state, action) => {
    let moving = state.primary.pop();
    state.primary.unshift(moving);
    return state;
  },
});

export default queueReducer;

import { createReducer } from "@reduxjs/toolkit";
import { read } from "../client/localStorage";

const initialState = {
  ...{
    pointer: 0, // need one for each queue, add it to an object below
    primary: [],
  },
  ...read("queue"),
};

const queueReducer = createReducer(initialState, {
  ADD_ITEMS: (state, action) => {
    if (action.target == null) {
      /* add to the end of the queue */
      state.primary = [...state.primary, ...action.items];
    } else {
      state.primary.splice(action.target, 0, ...action.items);
    }
    return state;
  },
  REMOVE_ITEMS: (state, action) => {
    const targets = action.targets.sort().reverse(); // from the top down
    if (targets.length < 1) {
      /* no targets, clear the queue */
      state.primary = [];
    } else {
      targets.map((t) => {
        state.primary.splice(t, 1);
      });
    }
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
  // ADVANCE_POINTER
  // REVERSE_POINTER
});

export default queueReducer;

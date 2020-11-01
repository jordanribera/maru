import { configureStore } from "@reduxjs/toolkit";
import shellReducer from "../reducers/shell";
import queueReducer from "../reducers/queue";
import { read, write } from "./localStorage";

const store = configureStore({
  reducer: {
    shell: shellReducer,
    queue: queueReducer,
  },
});

export default store;

store.subscribe(() => {
  const state = store.getState();
  write("shell", state.shell);
  write("queue", state.queue);
});

import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "../reducers/api";
import shellReducer from "../reducers/shell";
import queueReducer from "../reducers/queue";
import { write } from "./localStorage";

const store = configureStore({
  reducer: {
    api: apiReducer,
    shell: shellReducer,
    queue: queueReducer,
  },
});

export default store;

store.subscribe(() => {
  const state = store.getState();
  write("api", state.api);
  write("shell", state.shell);
  write("queue", state.queue);
});

import { configureStore } from "@reduxjs/toolkit";
import shellReducer from "../reducers/shell";
import queueReducer from "../reducers/queue";

export default configureStore({
  reducer: {
    shell: shellReducer,
    queue: queueReducer,
  },
});

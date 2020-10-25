import { configureStore } from "@reduxjs/toolkit";
import queueReducer from "../reducers/queue";

export default configureStore({
  reducer: {
    queue: queueReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import eventsSlice from "./events-slice";

export const store = configureStore({
  reducer: {
    events: eventsSlice,
  },
});

export default store;

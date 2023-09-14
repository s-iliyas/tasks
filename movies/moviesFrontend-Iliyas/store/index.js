import { configureStore } from "@reduxjs/toolkit";

import movieReducer from "./reducers/movie";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});

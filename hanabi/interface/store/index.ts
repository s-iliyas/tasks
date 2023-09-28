import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/slices/user.slice";

// Create a Redux store and configure it with the userReducer
export const store = configureStore({
  reducer: {
    user: userReducer, // Assign the userReducer to the "user" slice of the store
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself

// Define the RootState type, which is derived from the store's state
export type RootState = ReturnType<typeof store.getState>;

// Define the AppDispatch type, which represents the dispatch function for the store
export type AppDispatch = typeof store.dispatch;

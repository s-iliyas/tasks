import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  userDetails: {
    name: string;
    phoneNumber: string;
    username: string;
    email: string;
    dob: string;
  };
  showSuccess: boolean;
}

const initialState: InitialState = {
  userDetails: {
    name: "",
    phoneNumber: "",
    username: "",
    email: "",
    dob: "",
  },
  showSuccess: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails(state, action) {
      state.userDetails = action.payload;
    },
    setShowSuccess(state, action) {
      state.showSuccess = action.payload;
    },
  },
});

export const { setUserDetails, setShowSuccess } = userSlice.actions;

export default userSlice.reducer;

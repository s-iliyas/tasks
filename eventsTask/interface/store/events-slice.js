import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    view: true,
    search: false,
    searchData: {},
  },
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },
  },
});

export const { setEvents, setView, setSearch, setSearchData } =
  eventsSlice.actions;
export default eventsSlice.reducer;

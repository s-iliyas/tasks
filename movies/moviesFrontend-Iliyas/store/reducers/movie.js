import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movies: [],
    movie: {},
    homeMovies: [],
    genres: [],
    searchedMovies: [],
    watchlist: { ids: [], movies: [] },
    likedMovies: [],
    selectedGenre: "0",
    selectedRating: "all",
    selectedYear: "all",
    selectedSort: "all",
    selectedMovieName: "",
  },
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setMovie: (state, action) => {
      state.movie = action.payload;
    },
    setHomeMovies: (state, action) => {
      state.homeMovies = action.payload;
    },
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
    setSearchedMovies: (state, action) => {
      state.searchedMovies = action.payload;
    },
    setSelectedGenre: (state, action) => {
      state.selectedGenre = action.payload;
    },
    setSelectedRating: (state, action) => {
      state.selectedRating = action.payload;
    },
    setSelectedYear: (state, action) => {
      state.selectedYear = action.payload;
    },
    setSelectedSort: (state, action) => {
      state.selectedSort = action.payload;
    },
    setSelectedMovieName: (state, action) => {
      state.selectedMovieName = action.payload;
    },
    setWatchlist: (state, action) => {
      state.watchlist = action.payload;
    },
    setLikedMovies: (state, action) => {
      state.likedMovies = action.payload;
    },
  },
});

export const {
  setHomeMovies,
  setMovies,
  setGenres,
  setSelectedGenre,
  setSelectedRating,
  setSelectedYear,
  setSelectedSort,
  setSelectedMovieName,
  setSearchedMovies,
  setMovie,
  setLikedMovies,
  setWatchlist,
} = movieSlice.actions;

export default movieSlice.reducer;

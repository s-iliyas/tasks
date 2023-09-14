import getYearRegex from "../utils/getYearRegex.js";

import { GenreModel } from "../models/genre.model.js";
import { MovieModel } from "../models/movie.model.js";

export const getGenres = async (_, res) => {
  try {
    const genres = await GenreModel.find();
    return res.status(200).json({ genres });
  } catch (error) {
    console.error(`[GENRES_GET_ERROR] - ${error.message}`);
    return res.status(400).json({ error: error.message });
  }
};

export const getMovies = async (req, res) => {
  try {
    const { count } = req.params;
    const movies = count
      ? await MovieModel.find().sort({ vote_average: -1 }).limit(count)
      : await MovieModel.find();
    return res.status(200).json({ movies });
  } catch (error) {
    console.error(`[MOVIES_GET_ERROR] - ${error.message}`);
    return res.status(400).json({ error: error.message });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movies = await MovieModel.find({ _id: parseInt(id) });
    return res.status(200).json({ movies });
  } catch (error) {
    console.error(`[MOVIE_BY_ID_GET_ERROR] - ${error.message}`);
    return res.status(400).json({ error: error.message });
  }
};

export const addMovie = async (req, res) => {
  const {
    adult,
    vote_count,
    genre_ids,
    vote_average,
    title,
    overview,
    backdrop_path,
    poster_path,
    release_date,
  } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  if (!overview) {
    return res.status(400).json({ error: "Overview is required" });
  }

  if (!backdrop_path) {
    return res.status(400).json({ error: "Background Image URL is required" });
  }

  if (!poster_path) {
    return res.status(400).json({ error: "Poster URL is required" });
  }

  if (!release_date) {
    return res.status(400).json({ error: "Release date is required" });
  }

  if (!vote_count) {
    return res.status(400).json({ error: "Vote count is required" });
  }

  if (!vote_average) {
    return res.status(400).json({ error: "Rating is required" });
  }

  if (!genre_ids || genre_ids.length === 0) {
    return res.status(400).json({ error: "Genres are required" });
  }

  if (!adult) {
    return res.status(400).json({ error: "Adult is required" });
  }

  try {
    const movies = await MovieModel.find().select("_id");
    const ids = movies.map((x) => x._id);
    const movie = await MovieModel.create({
      _id: ids.sort((a, b) => a - b)[ids.length - 1] + 1,
      vote_count,
      genre_ids,
      vote_average,
      title,
      overview,
      backdrop_path,
      poster_path,
      release_date,
      isTMDB: false,
    });
    return res.status(200).json({ id: movie._id, message: "Movie added." });
  } catch (error) {
    console.error(`[MOVIE_ADD_ERROR] - ${error.message}`);
    return res.status(400).json({ error: error.message });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await MovieModel.findByIdAndUpdate(parseInt(id), req.body);
    return res.status(200).json({ message: "Movie updated." });
  } catch (error) {
    console.error(`[MOVIE_UPDATE_ERROR] - ${error.message}`);
    return res.status(400).json({ error: error.message });
  }
};

export const deleteMovie = async (req, res) => {
  const { id } = req.params;

  // const { userId } = req.user; // to check and validate user from db to give access to delete

  // if (userId) {

  try {
    const movies = await MovieModel.deleteOne({ _id: parseInt(id) });
    return res.status(200).json({ message: "Movie deleted" });
  } catch (error) {
    console.error(`[MOVIE_DELETE_ERROR] - ${error.message}`);
    return res.status(400).json({ error: error.message });
  }

  // } else {
  // return res.status(400).json({ error: "Unauthorized" });
  // }
};

export const searchMovie = async (req, res) => {
  try {
    const { movieGenre, movieRating, movieYear, movieSort, movieName } =
      req.body;
    let sort;
    if (movieName) {
      return res.status(200).json({
        movies: await MovieModel.find({
          title: { $regex: new RegExp(`${movieName}`) },
        }),
      });
    }
    let filteredMovies = MovieModel.find();
    if (movieYear && movieYear !== "all") {
      filteredMovies.find({
        release_date: movieYear.includes("-")
          ? getYearRegex(movieYear)
          : {
              $regex: new RegExp(`^(${movieYear})`),
            },
      });
    }
    if (movieRating && movieRating !== "all") {
      filteredMovies.find({ vote_average: { $gt: parseInt(movieRating) } });
    }
    if (movieGenre && movieGenre !== "0") {
      filteredMovies.find({ genre_ids: { $in: parseInt(movieGenre) } });
    }
    if (movieSort && movieSort !== "all") {
      sort = JSON.parse(movieSort);
    }
    const movies =
      sort && filteredMovies
        ? await filteredMovies.sort(sort).exec()
        : sort
        ? await MovieModel.find().sort(sort)
        : await filteredMovies.exec();
    return res.status(200).json({ movies });
  } catch (error) {
    console.error(`[MOVIE_SEARCH_ERROR] - ${error.message}`);
    return res.status(400).json({ error: error.message });
  }
};

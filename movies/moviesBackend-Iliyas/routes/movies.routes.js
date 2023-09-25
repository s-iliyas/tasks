import { Router } from "express";

// ********************************************* //

import {
  getMovies,
  getGenres,
  searchMovie,
  deleteMovie,
  getMovieById,
  addMovie,
  updateMovie,
} from "../controllers/movie.controller.js";

// import { authCheck } from "../middleware/auth.js";

// ********************************************* //

const movieRouter = Router();

movieRouter.post("/add", addMovie);
movieRouter.post("/search", searchMovie);
movieRouter.get("/genres/get", getGenres);
movieRouter.get("/get/:count?", getMovies);
movieRouter.post("/update/:id", updateMovie);
movieRouter.get("/id/get/:id", getMovieById);
movieRouter.delete(
  "/delete/:id",
  //  authCheck, // middleware
  deleteMovie
);

export default movieRouter;

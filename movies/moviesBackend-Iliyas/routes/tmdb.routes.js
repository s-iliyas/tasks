import { Router } from "express";

// ********************************************* //

import {
  addTMDBGenre,
  addTMDBTopRatedMovies,
} from "../controllers/tmdb.controller.js";

// ********************************************* //

const tmdbRouter = Router();

tmdbRouter.get("/add/genre", addTMDBGenre);
tmdbRouter.get("/add/movies/:page", addTMDBTopRatedMovies);

export default tmdbRouter;

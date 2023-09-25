import { Router } from "express";

// ********************************************************** //

import movieRouter from "./routes/movies.routes.js";
import tmdbRouter from "./routes/tmdb.routes.js";

const router = Router();

router.use("/movies", movieRouter);
router.use("/tmdb", tmdbRouter);

export default router
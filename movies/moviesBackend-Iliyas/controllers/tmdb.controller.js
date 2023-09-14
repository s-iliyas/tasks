import axios from "axios";

// *************************************************************************** //

import { GenreModel } from "../models/genre.model.js";
import { MovieModel } from "../models/movie.model.js";

export const addTMDBGenre = async (req, res) => {
  const TMDB_URI = process.env.TMDB_URI;
  const TMDB_TOKEN = process.env.TMDB_TOKEN;

  try {
    const response = await axios.get(
      `${TMDB_URI}/genre/movie/list?language=en`,
      {
        headers: {
          Authorization: `Bearer ${TMDB_TOKEN}`,
          Accept: "application/json",
        },
      }
    );

    const { genres } = response.data;

    try {
      await GenreModel.create(
        genres.map(({ id, name }) => ({ _id: id, name }))
      );
    } catch (error) {
      throw new Error(error.message);
    }

    return res.status(200).json({ message: "Genres Added." });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const addTMDBTopRatedMovies = async (req, res) => {
  const TMDB_URI = process.env.TMDB_URI;
  const TMDB_TOKEN = process.env.TMDB_TOKEN;
  const { page } = req.params;

  if (page) {
    try {
      const response = await axios.get(
        `${TMDB_URI}/movie/top_rated?language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`,
            Accept: "application/json",
          },
        }
      );

      const { results } = response.data;

      try {
        await MovieModel.create(
          results.map((result) => ({ ...result, isTMDB: true }))
        );
      } catch (error) {
        throw new Error(error.message);
      }

      return res.status(200).json({ message: "Movies Added." });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else {
    return res
      .status(400)
      .json({ error: "Page number in url parameter is required." });
  }
};

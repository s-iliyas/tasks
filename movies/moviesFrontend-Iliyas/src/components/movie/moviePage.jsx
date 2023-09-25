/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect } from "react";

import Stats from "./stats";
import {
  setMovie,
  setLikedMovies,
  setWatchlist,
  setMovies,
} from "../../../store/reducers/movie";

const MoviePage = () => {
  const movies = useSelector((state) => state.movie.movies);
  const movie = useSelector((state) => state.movie.movie);
  const genres = useSelector((state) => state.movie.genres);
  const watchlist = useSelector((state) => state.movie.watchlist);
  const likedMovies = useSelector((state) => state.movie.likedMovies);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const recommendedMovies = movies?.filter(
    (x) =>
      movie?.genre_ids?.some((o) => x?.genre_ids?.includes(o)) &&
      x._id !== Number(movie._id)
  );

  const like = () => {
    let newData;
    if (likedMovies?.includes(movie._id)) {
      newData = {
        ...movie,
        vote_count: movie?.vote_count - 1,
      };
      dispatch(setLikedMovies(likedMovies.filter((x) => x !== movie._id)));
      dispatch(setMovie(newData));
    } else {
      newData = {
        ...movie,
        vote_count: movie?.vote_count + 1,
      };
      const newLikes = [...likedMovies, movie._id];
      dispatch(setLikedMovies(newLikes));
      dispatch(setMovie(newData));
      dispatch(setMovies());
    }
    let newMovies = movies?.map((c) => (c._id === movie._id ? newData : c));
    dispatch(setMovies(newMovies));

    // Api call to update in database
  };

  const handleWatchList = () => {
    if (watchlist?.ids?.includes(movie._id)) {
      const newIds = watchlist?.ids?.filter((a) => a !== movie?._id);
      const newWatchlist = watchlist?.movies?.filter(
        (z) => z._id !== movie?._id
      );
      dispatch(setWatchlist({ ids: newIds, movies: newWatchlist }));
    } else {
      const ids = watchlist?.ids;
      const wMovies = watchlist?.movies;
      const newData = {
        ids: [...ids, movie?._id],
        movies: [...wMovies, movie],
      };
      dispatch(setWatchlist(newData));
    }

    // Api call to update in database
  };

  useEffect(() => {
    if (Object.keys(movie).length === 0) {
      return navigate("/");
    }
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{movie.title}</title>
        <meta name="description" content={movie.overview} />
      </Helmet>
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
        className="h-[50rem]"
      >
        <div
          className="absolute inset-0 mt-14 flex flex-col py-10 lg:px-20 xl:px-36 md:px-16 px-2"
          style={{ backgroundColor: "rgba(23, 23, 23, .95)" }}
        >
          <div className="flex flex-col md:flex-row gap-5 ">
            <div className="flex flex-row space-x-3 justify-center">
              <div className="flex flex-col space-y-2 md:min-w-[17rem]">
                <LazyLoadImage
                  alt={`${movie?.title} image`}
                  src={
                    movie?.isTMDB
                      ? `https://image.tmdb.org/t/p/w300/${movie?.poster_path}`
                      : movie?.poster_path
                  }
                  className="rounded-md ring-4 ring-orange-200 m-1 xs:h-[15rem] sm:h-[12rem] md:h-[25rem]"
                />
                <button
                  onClick={like}
                  className={`border-2 flex items-center flex-row justify-center md:text-base
                text-xs space-x-2 border-red-500
               md:py-2 py-[0.4rem] px-1 w-full rounded-md text-center font-semibold ${
                 likedMovies?.includes(movie?._id) ? "bg-neutral-900" : ""
               }`}
                >
                  <LazyLoadImage
                    src="/icons/heart.png"
                    className="h-3 w-3 md:h-5 md:w-5"
                  />
                  <strong>
                    {likedMovies?.includes(movie?._id) ? "Unlike" : "Like"}
                  </strong>
                </button>
                <button
                  onClick={handleWatchList}
                  className={`bg-sky-600 py-2 px-1 w-full text-neutral-800 rounded-md md:text-base
                 text-xs text-center font-semibold ${
                   watchlist?.ids?.includes(movie._id) && "bg-sky-400"
                 }`}
                >
                  {watchlist?.ids?.includes(movie._id)
                    ? "Remove from "
                    : "Add to "}
                  WatchList
                </button>
              </div>
              <div className="md:hidden block">
                <Stats movie={movie} />
              </div>
            </div>
            <div className="flex flex-col space-y-2 grow">
              <strong className="text-5xl text-white md:block hidden">
                {movie?.title}
              </strong>
              <br />
              <strong className="text-2xl text-white md:block hidden">
                {movie?.release_date?.slice(0, 4)}
              </strong>
              <strong className="text-2xl text-white md:block hidden">
                {movie?.genre_ids
                  ?.map((x) => genres?.filter((o) => o?._id === x)[0]?.name)
                  ?.join(" / ")}
              </strong>
              <p className="max-w-[40rem]">
                <strong className="text-xl text-white">Plot Summary</strong>
                <br />
                <small>{movie?.overview}</small>
              </p>
              <div className="md:block hidden">
                <Stats movie={movie} />
              </div>
            </div>
            <div className="flex-wrap justify-center hidden lg:flex max-w-[20rem] h-[22rem] ">
              {recommendedMovies?.slice(0, 4)?.map((rMovie) => (
                <Link
                  key={rMovie?.poster_path}
                  to={`/movie/${rMovie?._id}`}
                  className="m-2"
                  onClick={() => {
                    dispatch(setMovie(rMovie));
                  }}
                >
                  <LazyLoadImage
                    alt={`${rMovie?.title} image`}
                    src={
                      rMovie?.isTMDB
                        ? `https://image.tmdb.org/t/p/w300/${rMovie?.poster_path}`
                        : rMovie?.poster_path
                    }
                    className="rounded-md ring-4 ring-neutral-500 hover:ring-orange-200 md:h-[10rem] "
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviePage;

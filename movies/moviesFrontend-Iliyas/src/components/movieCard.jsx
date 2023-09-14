/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Skeleton, Typography } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { setMovie } from "../../store/reducers/movie";

const { Text } = Typography;

const MovieCard = ({ movie }) => {
  const genres = useSelector((state) => state.movie.genres);
  const dispatch = useDispatch();
  const handleMovie = () => {
    dispatch(setMovie(movie));
  };

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const time = setTimeout(() => {
      setLoaded(false);
    }, 1000);
    return () => clearTimeout(time);
  }, []);

  return (
    <div
      key={movie?.poster_path}
      className="flex flex-col space-y-1 items-start"
    >
      <Link
        className="relative w-[8rem] sm:w-[10rem] md:w-[13rem] h-[12rem] sm:h-[15rem] md:h-[20rem] ring-4 ring-orange-200 rounded-md"
        to={`/movie/${movie._id}`}
        onClick={handleMovie}
      >
        {loaded ? (
          <Skeleton />
        ) : (
          <LazyLoadImage
            alt={`${movie?.title} image`}
            id="imageCard"
            src={
              movie?.isTMDB
                ? `https://image.tmdb.org/t/p/w300/${movie?.poster_path}`
                : movie?.poster_path
            }
            className="rounded-md w-[8rem] sm:w-[10rem] md:w-[13rem] h-[12rem] sm:h-[15rem] md:h-[20rem] "
          />
        )}
        <div
          className="absolute inset-0 rounded-md flex items-center justify-center px-2 pt-2 opacity-0 hover:opacity-100 transition-opacity duration-300 flex-col md:text-xl text-xs space-y-2"
          style={{ backgroundColor: "rgba(23, 23, 23, .75)" }}
        >
          <StarFilled className="text-orange-200" />
          <strong>{movie?.vote_average?.$numberDecimal} / 10</strong>
          <strong className="text-center">
            {movie?.genre_ids
              ?.map(
                (genreId) => genres?.filter((x) => x._id === genreId)[0]?.name
              )
              .join(" - ")}
          </strong>
          <button className="bg-orange-200 md:p-2 py-1 px-2 rounded-md text-sm font-semibold text-neutral-800 hover:bg-orange-100 ">
            See details
          </button>
        </div>
      </Link>
      <Text
        className="w-[8rem] sm:w-[10rem] md:w-[13rem] text-left text-neutral-200"
        ellipsis={{
          tooltip: movie?.title,
        }}
      >
        <strong className="text-xs text-white">{movie?.title}</strong>
      </Text>
      <small className="text-xs">{movie?.release_date}</small>
    </div>
  );
};

export default MovieCard;

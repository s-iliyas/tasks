/* eslint-disable react/prop-types */

import { BiSad } from "react-icons/bi";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import MovieCard from "./movieCard";
import { setWatchlist } from "../../store/reducers/movie";

const MovieList = ({ data, page, deleteButton }) => {
  const movies =
    page || page === 0
      ? data?.slice(20 * Number(page), 20 * (Number(page) + 1))
      : data;

  const watchlist = useSelector((state) => state.movie.watchlist);
  
  const dispatch = useDispatch();

  const handleWatchList = (id) => {
    const newIds = watchlist?.ids?.filter((a) => a !== id);
    const newWatchlist = watchlist?.movies?.filter((z) => z._id !== id);
    dispatch(setWatchlist({ ids: newIds, movies: newWatchlist }));
  };

  if (movies?.length === 0 && deleteButton) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh]">
        <BiSad className="text-4xl" />
        <br />
        <strong>No movies in your watchlist</strong>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap md:gap-16 gap-x-5 gap-y-10 items-center justify-center p-2">
      {movies?.map((movie) => (
        <div key={movie?.poster_path} className="flex-col flex relative">
          <MovieCard movie={movie} />
          {deleteButton && (
            <button
              onClick={() => {
                handleWatchList(movie._id);
              }}
              className="absolute inset-0 max-h-max rounded-md max-w-max m-2 bg-red-600 flex items-center "
            >
              <DeleteOutlined className="p-2" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MovieList;

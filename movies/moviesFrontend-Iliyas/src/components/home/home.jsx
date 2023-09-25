import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { StarFilled } from "@ant-design/icons";

import MovieList from "../movieList";

const Home = () => {
  const movies = useSelector((state) => state.movie.homeMovies);

  return (
    <div className="flex flex-col space-y-2 items-center justify-center lg:px-36 md:px-28 px-0 text-center mt-14">
      <div className="flex flex-col space-y-2 items-center justify-center py-10">
        <strong className="text-orange-100 text-5xl">
          Enjoy Your Time, Watch Biggest Hits
        </strong>
        <br />
        <strong>
          Save your favourites easily and always have something to watch.
        </strong>
        <small>
          If you want to search movies to watch, click below button and go for
          it.
        </small>
        <br />
        <Link
          to={"/search"}
          className="bg-orange-200 p-2 rounded-lg text-neutral-800 hover:-translate-y-1 hover:bg-orange-100"
        >
          <strong>Search Movies</strong>
        </Link>
      </div>
      <div className="flex flex-col space-y-2 items-center justify-center">
        {movies.length > 0 && (
          <div className="flex flex-row space-x-2 items-center">
            <StarFilled className="text-orange-200" />
            <strong>Recommended Movies</strong>
          </div>
        )}
        <br />
        <MovieList data={movies?.slice(0, 4)} />
      </div>
      {movies.length > 0 && (
        <hr className="border-2 border-neutral-500 w-[75%]" />
      )}
      <br />
      <div className="flex flex-col space-y-2 items-center justify-center">
        {movies.length > 0 && (
          <div className="flex flex-row space-x-2 items-center">
            <StarFilled className="text-orange-200" />
            <strong>Popular Movies</strong>
          </div>
        )}
        <br />
        <MovieList data={movies?.slice(4, 20)} />
      </div>
    </div>
  );
};

export default Home;

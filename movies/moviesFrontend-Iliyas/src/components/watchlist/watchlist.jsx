import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

import MovieList from "../movieList";

const Watchlist = () => {
  const watchlist = useSelector((state) => state.movie.watchlist);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Watchlist</title>
        <meta
          name="description"
          content="Movies platform to savour your time by wathcing movies from watchlist."
        />
      </Helmet>
      <div className="mt-14 flex flex-col lg:px-36 py-10 md:px-28 px-0 space-y-2 items-center justify-center">
        <strong className="text-4xl">Your Watchlist</strong>
        <br />
        {watchlist?.movies.length > 0 && (
          <>
            <hr className="border-2 border-neutral-500 w-[75%]" />
            <br />
          </>
        )}
        <MovieList data={watchlist?.movies} deleteButton={true} />
      </div>
    </>
  );
};

export default Watchlist;

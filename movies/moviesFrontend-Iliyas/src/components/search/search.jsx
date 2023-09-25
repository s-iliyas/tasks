import { useState } from "react";
import { Pagination } from "antd";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

import SearchForm from "./form";
import MovieList from "../movieList";

const Search = () => {
  const [page, setPage] = useState(0);

  const movies = useSelector((state) => state.movie.movies);
  const searchedMovies = useSelector((state) => state.movie.searchedMovies);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Search movies</title>
        <meta
          name="description"
          content="Search movies and add to watchlist."
        />
      </Helmet>
      <div className="mt-14 flex flex-col lg:px-36 py-10 md:px-28 px-0 space-y-2 items-center justify-center">
        <strong className="text-4xl">Search Movies</strong>
        <SearchForm />
        <div>
          {movies?.length > 20 ? (
            <div>
              <Pagination
                defaultCurrent={1}
                onChange={(e) => {
                  setPage(e);
                }}
                showSizeChanger={false}
                total={searchedMovies?.length || movies?.length}
                pageSize={20}
                jumpNextIcon={
                  <LazyLoadImage
                    alt="jump next icon"
                    src="/icons/jumpNext.png"
                    className="h-5 w-5"
                  />
                }
                nextIcon={
                  <LazyLoadImage
                    alt="next icon"
                    src="/icons/next.png"
                    className="h-5 w-5"
                  />
                }
                prevIcon={
                  <LazyLoadImage
                    alt="prev icon"
                    src="/icons/prev.png"
                    className="h-5 w-5"
                  />
                }
                jumpPrevIcon={
                  <LazyLoadImage
                    alt="jump prev icon"
                    src="/icons/jumpPrev.png"
                    className="h-5 w-5"
                  />
                }
              />
              <br />
            </div>
          ) : (
            <br />
          )}
        </div>
        <MovieList
          data={searchedMovies.length > 0 ? searchedMovies : movies}
          page={page}
        />
      </div>
    </>
  );
};

export default Search;

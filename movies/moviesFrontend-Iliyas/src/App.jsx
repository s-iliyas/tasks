import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import GetMovies from "./hooks/getMovies";
import GetGenres from "./hooks/getGenres";
import HomeComponent from "./components/home";
import MovieComponent from "./components/movie";
import SearchComponent from "./components/search";
import ErrorComponent from "./components/errorComponent";
import WatchlistComponent from "./components/watchlist/index.jsx";

const routes = createBrowserRouter([
  { path: "/", element: <HomeComponent />, errorElement: <ErrorComponent /> },
  {
    path: "/search",
    element: <SearchComponent />,
    errorElement: <ErrorComponent />,
  },
  {
    path: "/watchlist",
    element: <WatchlistComponent />,
    errorElement: <ErrorComponent />,
  },
  {
    path: "/movie/:movieId",
    element: <MovieComponent />,
    errorElement: <ErrorComponent />,
  },
]);

function App() {
  const movies = useSelector((state) => state.movie.movies);
  const genres = useSelector((state) => state.movie.genres);
  const homeMovies = useSelector((state) => state.movie.homeMovies);

  return (
    <>
      {movies?.length === 0 && <GetMovies />}
      {homeMovies?.length === 0 && <GetMovies count={20} />}
      {genres?.length === 0 && <GetGenres />}
      <RouterProvider router={routes} />
    </>
  );
}

export default App;

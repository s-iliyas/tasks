/* eslint-disable react-hooks/exhaustive-deps */

import useSWR from "swr";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import useFetcher from "../../utils/useFetcher";
import { setHomeMovies, setMovies } from "../../store/reducers/movie";

const GetMovies = ({ count }) => {
  const dispatch = useDispatch();
  const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/movies/get`;
  const url = count ? BACKEND_URL + "/" + count : BACKEND_URL;
  const { data } = useSWR(url, useFetcher);

  useEffect(() => {
    if (data) {
      count
        ? dispatch(setHomeMovies(data?.movies))
        : dispatch(setMovies(data?.movies));
    }
  }, [data]);

  return;
};

export default GetMovies;

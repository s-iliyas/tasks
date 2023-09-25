/* eslint-disable react-hooks/exhaustive-deps */

import useSWR from "swr";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import useFetcher from "../../utils/useFetcher";
import { setGenres } from "../../store/reducers/movie";

const GetGenres = () => {
  const dispatch = useDispatch();

  const { data } = useSWR(
    `${import.meta.env.VITE_BACKEND_URL}/movies/genres/get`,
    useFetcher
  );

  useEffect(() => {
    if (data) {
      dispatch(setGenres(data?.genres));
    }
  }, [data]);

  return;
};

export default GetGenres;

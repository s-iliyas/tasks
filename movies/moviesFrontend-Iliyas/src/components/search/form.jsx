/* eslint-disable react-hooks/exhaustive-deps */

import axios from "axios";
import { Input, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import {
  setSearchedMovies,
  setSelectedGenre,
  setSelectedMovieName,
  setSelectedRating,
  setSelectedSort,
  setSelectedYear,
} from "../../../store/reducers/movie";
import { ratingOptions, sortOptions, yearOptions } from "./options";

const SearchForm = () => {
  const [errMsg, setErrMsg] = useState("");
  const [nMovieMsg, setNoMovieMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const genres = useSelector((state) => state.movie.genres);
  const selectedMovieName = useSelector(
    (state) => state.movie.selectedMovieName
  );
  const selectedSort = useSelector((state) => state.movie.selectedSort);
  const selectedYear = useSelector((state) => state.movie.selectedYear);
  const selectedRating = useSelector((state) => state.movie.selectedRating);
  const selectedGenre = useSelector((state) => state.movie.selectedGenre);

  const reset = () => {
    document.getElementById("formSearch").reset();
    dispatch(setSelectedGenre("0"));
    dispatch(setSelectedMovieName(""));
    dispatch(setSelectedRating("all"));
    dispatch(setSelectedYear("all"));
    dispatch(setSelectedSort("all"));
  };

  const genreOptions = genres?.map((x) => ({
    value: `${x?._id}`,
    label: x?.name,
  }));
  
  genreOptions.unshift({
    value: "0",
    label: "All",
  });

  const { handleSubmit, control } = useForm();

  const onSubmit = async (data) => {
    if (Object.values(data).some((x) => Boolean(x) === true)) {
      setLoading(true);
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/movies/search`, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          response?.data?.movies.length === 0
            ? setNoMovieMsg("No movies found with such filters.")
            : setNoMovieMsg("");
          dispatch(setSearchedMovies(response?.data?.movies));
          data?.movieName && dispatch(setSelectedMovieName(data?.movieName));
          data?.movieGenre && dispatch(setSelectedGenre(data?.movieGenre));
          data?.movieRating && dispatch(setSelectedRating(data?.movieRating));
          data?.movieYear && dispatch(setSelectedYear(data?.movieYear));
          data?.movieSort && dispatch(setSelectedSort(data?.movieSort));
          setErrMsg("");
        })
        .catch((error) => {
          if (error?.response?.data?.error) {
            setErrMsg(error?.response?.data?.error);
          } else {
            setErrMsg(error.message);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      reset();
    }
  };

  useEffect(() => {}, [reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="formSearch"
      className="flex flex-col w-full md:w-[80%] p-2 space-y-3 items-center"
    >
      <Controller
        name="movieName"
        control={control}
        render={({ field }) => (
          <Input
            placeholder=" Movie name..."
            size="large"
            autoComplete="off"
            className="px-5"
            {...field}
            defaultValue={selectedMovieName}
          />
        )}
      />
      <div className="flex-wrap flex w-full">
        <div className="flex flex-col space-y-1 min-w-[7.5rem] m-1 grow">
          <strong>Genre :</strong>
          <Controller
            name="movieGenre"
            control={control}
            render={({ field }) => (
              <Select
                options={genreOptions}
                size="large"
                style={{ backgroundColor: "rgb(82,82,82)" }}
                {...field}
                defaultValue={selectedGenre}
              />
            )}
          />
        </div>
        <div className="flex flex-col space-y-1 min-w-[7.5rem] m-1 grow">
          <strong>Rating :</strong>
          <Controller
            name="movieRating"
            control={control}
            render={({ field }) => (
              <Select
                options={ratingOptions}
                size="large"
                style={{ backgroundColor: "rgb(82,82,82)" }}
                {...field}
                defaultValue={selectedRating}
              />
            )}
          />
        </div>
        <div className="flex flex-col space-y-1 min-w-[7.5rem] m-1 grow">
          <strong>Year :</strong>
          <Controller
            name="movieYear"
            control={control}
            render={({ field }) => (
              <Select
                options={yearOptions}
                size="large"
                style={{ backgroundColor: "rgb(82,82,82)" }}
                {...field}
                defaultValue={selectedYear}
              />
            )}
          />
        </div>
        <div className="flex flex-col space-y-1 min-w-[7.5rem] m-1 grow">
          <strong>Search Sort :</strong>
          <Controller
            name="movieSort"
            control={control}
            render={({ field }) => (
              <Select
                options={sortOptions}
                size="large"
                style={{ backgroundColor: "rgb(82,82,82)" }}
                {...field}
                defaultValue={selectedSort}
              />
            )}
          />
        </div>
      </div>
      {nMovieMsg ? (
        <span className="text-yellow-500">{nMovieMsg}</span>
      ) : errMsg ? (
        <span className="text-red-600">{errMsg}</span>
      ) : (
        <br />
      )}
      <button
        type="submit"
        className="bg-orange-200 py-1 px-2 rounded-md font-semibold text-neutral-800 hover:bg-orange-100 w-[10rem] m-1"
      >
        {loading ? (
          <Spin
            indicator={<LoadingOutlined style={{ color: "black" }} spin />}
          />
        ) : (
          "Search"
        )}
      </button>
    </form>
  );
};

export default SearchForm;

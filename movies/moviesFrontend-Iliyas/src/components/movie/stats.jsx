/* eslint-disable react/prop-types */

import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";

const Stats = ({ movie }) => {
  const genres = useSelector((state) => state.movie.genres);
  return (
    <div className="flex flex-col space-y-2">
      <strong className="md:text-5xl text-2xl text-white md:hidden block">
        {movie?.title}
        <br />
      </strong>
      <strong className="md:text-2xl text-white md:hidden block">
        {movie?.release_date?.slice(0, 4)}
      </strong>
      <strong className="md:text-2xl text-white md:hidden block">
        {movie?.genre_ids
          ?.map((x) => genres?.filter((o) => o?._id === x)[0]?.name)
          ?.join(" / ")}
      </strong>
      <div className="flex flex-row space-x-5 md:text-xl items-center w-[7rem] justify-between">
        <LazyLoadImage
          alt={"love icon"}
          src={`/icons/heart.png`}
          className="h-[1.5rem] w-[1.5rem] mr-5"
        />
        <strong>{movie?.vote_count}</strong>
      </div>
      <div className="flex flex-row space-x-3 md:text-xl items-center w-[7rem] justify-between">
        <LazyLoadImage
          alt={"love icon"}
          src={`/icons/imdb.png`}
          className="h-[2.5rem] w-[2.5rem] mr-4"
        />
        <strong>{movie?.vote_average?.$numberDecimal}</strong>
      </div>
      <div className="flex flex-row space-x-5 md:text-xl items-center w-[7rem] justify-between">
        <LazyLoadImage
          alt={"love icon"}
          src={`/icons/adults.png`}
          className="h-[2rem] w-[2rem] mr-3"
        />
        <strong>{movie?.adult ? "Yes" : "No"}</strong>
      </div>
    </div>
  );
};

export default Stats;

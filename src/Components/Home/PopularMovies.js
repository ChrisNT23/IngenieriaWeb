import React from "react";
import { useSelector } from "react-redux";
import Titles from "../Titles";
import { BsCollectionFill } from "react-icons/bs";
import Movie from "../Movie";
import Loader from "../Notifications/Loader";
import { Empty } from "../Notifications/Empty";

function PopularMovies() {
  const { isLoading, movies } = useSelector(state => state.getAllMovies);
//const { isLoading, movies } = useSelector(state => state.getRandomMoviesAction);
  return (
    <div className="my-16">
      <Titles title="Películas más populares" Icon={BsCollectionFill} />
      {isLoading ? (
        <Loader />
      ) : movies?.length > 0 ? (
        <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {movies?.slice(0, 8).map((movie, index) => (
            <Movie key={index} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <Empty message="Parece que no hay peliculas para mostrar" />
        </div>
      )}
    </div>
  );
}

export default PopularMovies;

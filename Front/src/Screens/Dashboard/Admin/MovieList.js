import React, { useEffect } from "react";
import Table from "../../../Components/Table";
import SideBar from "../SideBar";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllMoviesAction, deleteMovieAction, getAllMoviesAction } from "../../../Redux/Actions/MoviesActions";
import { toast } from "react-hot-toast";
import Loader from "../../../Components/Notifications/Loader";
import { Empty } from "../../../Components/Notifications/Empty";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";

function MoviesList() {
  const dispatch = useDispatch();
  const sameClass =
    "text-white p-2 rounded font-semibold border-2 border-subMain hover:bg-subMain";
  // todas las peliculas
  const { isLoading, isError, movies, pages, page } = useSelector(
    (state) => state.getAllMovies
  );
  // eliminar peliculas
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.deleteMovie
  );
  // eliminar todas las peliculas
  const { isLoading: allLoading, isError: allError } = useSelector(
    (state) => state.deleteAllMovies
  );

  // handler para eliminar peliculas
  const deleteMovieHandler = (id) => {
    window.confirm("Está seguro de que quiere eliminar esta película?") &&
      dispatch(deleteMovieAction(id));
  };

  // handler para eliminar todas las peliculas
  const deleteAllMoviesHandler = () => {
    window.confirm("Are you sure you want do delete all movies?") &&
      dispatch(deleteAllMoviesAction());
  };

  // useEffect
  useEffect(() => {
    dispatch(getAllMoviesAction({}));
    // errors
    if (isError || deleteError || allError) {
      toast.error(isError || deleteError || allError);
    }
  }, [dispatch, isError, deleteError, allError]);

  // pagination next and pev pages
  const nextPage = () => {
    dispatch(
      getAllMoviesAction({
        pageNumber: page + 1,
      })
    );
  };
  const prevPage = () => {
    dispatch(
      getAllMoviesAction({
        pageNumber: page - 1,
      })
    );
  };


    return (
      <SideBar>
        <div className="flex flex-col gap-6">
          <div className="flex-btn gap-2">
            <h2 className="text-xl font-bold">Movies List</h2>
            {movies?.length > 0 && (
              <button
                disabled={allLoading}
                onClick={deleteAllMoviesHandler}
                className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded"
              >
                {allLoading ? "Eliminando..." : "Eliminar todo"}
              </button>
            )}
          </div>
          {isLoading || deleteLoading ? (
            <Loader />
          ) : movies?.length > 0 ? (
            <>
              <Table
                data={movies}
                admin={true}
                onDeleteHandler={deleteMovieHandler}
              />
              {/* Loading More */}
              <div className="w-full flex-rows gap-6 my-5">
                <button
                  onClick={prevPage}
                  disabled={page === 1}
                  className={sameClass}
                >
                  <TbPlayerTrackPrev className="text-xl" />
                </button>
                <button
                  onClick={nextPage}
                  disabled={page === pages}
                  className={sameClass}
                >
                  <TbPlayerTrackNext className="text-xl" />
                </button>
              </div>
            </>
          ) : (
            <Empty message="No hay películas" />
          )}
        </div>
      </SideBar>
    );
  }
  
  export default MoviesList;
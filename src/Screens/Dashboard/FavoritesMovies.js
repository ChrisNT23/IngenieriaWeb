import React from "react";
import Table from "../../Components/Table";
import SideBar from "./SideBar";
import { Movies } from "../../Data/MovieData";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteFavoriteMoviesAction, getFavoriteMoviesAction } from "../../Redux/Actions/userActions";
import toast from "react-hot-toast";
import Loader from "../../Components/Notifications/Loader";
import { Empty } from "../../Components/Notifications/Empty";


function FavoritesMovies() {
  const dispatch = useDispatch()

  const {
    isLoading, isError,
    likedMovies
  } = useSelector((state) => state.userGetFavoriteMovies);

  // eliminar 
  const {
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess
  } = useSelector((state) => state.userDeleteFavoriteMovies);

  // eliminar peliculas handler
  const deleteMoviesHandler =() => {
    window.confirm("¿Está seguro de eliminar todas las peliculas?") &&
    dispatch(deleteFavoriteMoviesAction());
  };



  // use effect
  useEffect(() => {
    dispatch(getFavoriteMoviesAction());
    if (isError || deleteError ) {
      toast.error(isError || deleteError);
      dispatch({ type: isError ? "GET_FAVORITE_MOVIES_RESET" : "DELETE_FAVORITE_MOVIES_RESET" });
    }

  }, [dispatch, isError, deleteError, isSuccess]);



  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Peliculas Favoritas</h2>
          {
            likedMovies?.length > 0 && (
            <button 
            disabled={deleteLoading}
            onClick={deleteMoviesHandler}
            className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded">
            {deleteLoading ? "Eliminando..." : "Eliminar todo"}
          </button>
          )}
          
        </div>
        {
          isLoading ? (
            <Loader />
          ) : likedMovies.length > 0 ? (
            <Table data={likedMovies} admin={false} />
          ) : (
            <Empty message="No tiene peliculas favoritas aún"/>
          )}

        <Table data={Movies} admin={false} />
      </div>
    </SideBar>
  );
}

export default FavoritesMovies;
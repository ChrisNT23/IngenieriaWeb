import * as moviesConstants from '../Constants/MoviesConstants';
import * as moviesAPIs from "../APIs/MoviesServices";
import { ErrorsAction, tokenProtection } from "../Protection";
import toast from "react-hot-toast";


// obtenemos todas las peliculas
export const getAllMoviesAction =
  ({
    category = "",
    time = "",
    language = "",
    rate = "",
    year = "",
    search = "",
    pageNumber = "",
  }) =>
  async (dispatch) => {
    try {
      dispatch({ type: moviesConstants.MOVIES_LIST_REQUEST });
      const response = await moviesAPIs.getAllMoviesService(
        category,
        time,
        language,
        rate,
        year,
        search,
        pageNumber
      );
      dispatch({
        type: moviesConstants.MOVIES_LIST_SUCCESS,
        payload: response,
      });
      console.log(getAllMoviesAction)
    } catch (error) {
      ErrorsAction(error, dispatch, moviesConstants.MOVIES_LIST_FAIL);
    }
  };

//obtenemos peliculas  random accion
export const getRandomMoviesAction = () => async (dispatch) => {
    try {
      dispatch({ type: moviesConstants.MOVIES_RANDOM_REQUEST });
      const response = await moviesAPIs.getRandomMoviesService();
      dispatch({
        type: moviesConstants.MOVIES_RANDOM_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorsAction(error, dispatch, moviesConstants.MOVIES_RANDOM_FAIL);
    }
  };
  
// ACCION PARA OBTENER UNA PELICULA POR ID
export const getMovieByIdAction = (id) => async (dispatch) => {
    try {
      dispatch({ type: moviesConstants.MOVIE_DETAILS_REQUEST });
      const response = await moviesAPIs.getMovieByIdService(id);
      dispatch({
        type: moviesConstants.MOVIE_DETAILS_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorsAction(error, dispatch, moviesConstants.MOVIE_DETAILS_FAIL);
    }
  };


// obtenemos la pelicula top rated
export const getTopRatedMovieAction = () => async (dispatch) => {
    try {
      dispatch({ type: moviesConstants.MOVIE_TOP_RATED_REQUEST });
      const response = await moviesAPIs.getTopRatedMovieService();
      dispatch({
        type: moviesConstants.MOVIE_TOP_RATED_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorsAction(error, dispatch, moviesConstants.MOVIE_TOP_RATED_FAIL);
    }
  };


  // Creamos la acccion para la review de la pelicual
export const reviewMovieAction =
({ id, review }) =>
async (dispatch, getState) => {
  try {
    dispatch({ type: moviesConstants.CREATE_REVIEW_REQUEST });
    const response = await moviesAPIs.reviewMovieService(
      tokenProtection(getState),
      id,
      review
    );
    dispatch({
      type: moviesConstants.CREATE_REVIEW_SUCCESS,
      payload: response,
    });
    toast.success("La review fue realizada con éxito");
    dispatch({ type: moviesConstants.CREATE_REVIEW_RESET });
    dispatch(getMovieByIdAction(id));
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.CREATE_REVIEW_FAIL);
  }
};

// Accion para eliminar una pelicula
export const deleteMovieAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesConstants.DELETE_MOVIE_REQUEST });
    const response = await moviesAPIs.deleteMovieService(
      tokenProtection(getState),
      id
    );
    dispatch({
      type: moviesConstants.DELETE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success("La película fue eliminada con éxito");
    dispatch(getAllMoviesAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.DELETE_MOVIE_FAIL);
  }
};

// Accion para elimianr todas las peliculas
export const deleteAllMoviesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesConstants.DELETE_ALL_MOVIES_REQUEST });
    const response = await moviesAPIs.deleteAllMoviesService(
      tokenProtection(getState)
    );
    dispatch({
      type: moviesConstants.DELETE_ALL_MOVIES_SUCCESS,
      payload: response,
    });
    toast.success("All movies deleted successfully");
    dispatch(getAllMoviesAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.DELETE_ALL_MOVIES_FAIL);
  }
};

// Acción para crear una pelicula
export const createMovieAction = (movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesConstants.CREATE_MOVIE_REQUEST });
    const response = await moviesAPIs.createMovieService(
      tokenProtection(getState),
      movie
    );
    dispatch({
      type: moviesConstants.CREATE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success("La película ha sido creada exitosamente");
    dispatch(deleteAllCastAction());
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.CREATE_MOVIE_FAIL);
  }
};

// *******CASTS**********

// añadir cast
export const addCastAction = (cast) => async (dispatch, getState) => {
  dispatch({ type: moviesConstants.ADD_CAST, payload: cast });
  localStorage.setItem("casts", JSON.stringify(getState().casts.casts));
};

// remover cast
export const removeCastAction = (id) => async (dispatch, getState) => {
  dispatch({ type: moviesConstants.DELETE_CAST, payload: id });
  localStorage.setItem("casts", JSON.stringify(getState().casts.casts));
};

// actualizar cast
export const updateCastAction = (cast) => async (dispatch, getState) => {
  dispatch({ type: moviesConstants.EDIT_CAST, payload: cast });
  localStorage.setItem("casts", JSON.stringify(getState().casts.casts));
};

// eliminar todo el cast
export const deleteAllCastAction = () => async (dispatch) => {
  dispatch({ type: moviesConstants.RESET_CAST });
  localStorage.removeItem("casts");
};

// actualizar 
export const updateMovieAction = (id, movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesConstants.UPDATE_MOVIE_REQUEST });
    const response = await moviesAPIs.updateMovieService(
      tokenProtection(getState),
      id,
      movie
    );
    dispatch({
      type: moviesConstants.UPDATE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success("Pelicula actualizada correctamente");
    dispatch(getMovieByIdAction(id));
    dispatch(deleteAllCastAction());
  } catch (error) {
    ErrorsAction(error, dispatch, moviesConstants.UPDATE_MOVIE_FAIL);
  }
};
import * as userConstants from "../Constants/userConstants";
import * as userApi from "../APIs/userServices";
import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";

// login action
const loginAction = (datas) => async (dispatch) => {
    try {
        dispatch({ type: userConstants.USER_LOGIN_REQUEST });
        const response = await userApi.loginService(datas);
        dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
    }

};

// ACCION DEL REGISTRO DE UN NUEVO USUARIO
const registerAction = (datas) => async (dispatch) => {
    try {
        dispatch({ type: userConstants.USER_REGISTER_REQUEST });
        const response = await userApi.registerService(datas);
        dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: response });
        dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_REGISTER_FAIL);

    }

};

// accion para el log out
const logoutAction = () => (dispatch) => {
    userApi.logoutService();
    dispatch({ type: userConstants.USER_LOGOUT });
    dispatch({ type: userConstants.USER_LOGIN_RESET });
    dispatch({ type: userConstants.USER_REGISTER_RESET });
};


// actualizar perfil
const updateProfileAction = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST });
        const response = await userApi.updateProfileService(user,
            tokenProtection(getState));
        dispatch({
            type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
            payload: response,
        });
        toast.success("Perfil actualizado")
        dispatch({
            type: userConstants.USER_LOGIN_SUCCESS,
            payload: response,
        })
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL);
    }

};

//Accion para borrar el perfil
const deleteProfileAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.USER_DELETE_PROFILE_REQUEST });
        await userApi.deleteProfileService(tokenProtection(getState));
        dispatch({ type: userConstants.USER_DELETE_PROFILE_SUCCESS });
        toast.success("Perfil eliminado");
        dispatch(logoutAction());
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_DELETE_PROFILE_FAIL);

    }
};

// cambiar contraseñas
const changePasswordAction = (passwords) => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST });
        const response = await userApi.changePasswordService(
            passwords,
            tokenProtection(getState)
        );
        dispatch({
            type: userConstants.USER_CHANGE_PASSWORD_SUCCESS,
            payload: response,
        });

    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_CHANGE_PASSWORD_FAIL);
    }
};

// obtenemos todas las peliculas accion
const getFavoriteMoviesAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.GET_FAVORITE_MOVIES_REQUEST });
        const response = await userApi.getFavoriteMovies(
            tokenProtection(getState)
        );
        dispatch({
            type: userConstants.GET_FAVORITE_MOVIES_SUCCESS,
            payload: response,
        });
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.GET_FAVORITE_MOVIES_FAIL);
    }
};


// eliminar todas las peliculas favoritas

const deleteFavoriteMoviesAction =() => async (dispatch, getState) => {
    try {
        dispatch({type: userConstants.DELETE_FAVORITE_MOVIES_REQUEST});
         await userApi.deleteFavoriteMovies(
            tokenProtection(getState)
        );
        dispatch ({
           type: userConstants.DELETE_FAVORITE_MOVIES_SUCCESS, 

        });
        toast.success("Peliculas favoritas eliminadas");
    } catch (error){ 
        ErrorsAction(error, dispatch, userConstants.DELETE_FAVORITE_MOVIES_FAIL);

    }
};

// admin obtener todos los usuarios
const getAllUsersAction =() => async (dispatch, getState) => {
    try {
        dispatch({type: userConstants.GET_ALL_USERS_REQUEST});
        const response = await userApi.getAllUsersService(tokenProtection(getState));
        dispatch({
            type: userConstants.GET_ALL_USERS_SUCCESS, 
            payload: response,
        });
        
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.GET_ALL_USERS_FAIL);
    }
};

//admin eliminar usuarios action
const deleteUserAction =(id) => async (dispatch, getState) => {
    try {
        dispatch({type: userConstants.DELETE_USER_REQUEST});
         await userApi.deleteUsersService(`/${id}`,
            tokenProtection(getState)
        );
        dispatch ({
           type: userConstants.DELETE_USER_SUCCESS, 

        });
        toast.success("Usuario eliminado!");
    } catch (error){ 
        ErrorsAction(error, dispatch, userConstants.DELETE_USER_FAIL);

    }
};


export {
    loginAction,
    registerAction,
    logoutAction,
    updateProfileAction,
    deleteProfileAction,
    changePasswordAction,
    getFavoriteMoviesAction, 
    deleteFavoriteMoviesAction,
    getAllUsersAction, 
    deleteUserAction,
};
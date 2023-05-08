import {
    combineReducers,
    configureStore,

} from '@reduxjs/toolkit';
import * as User from "./Reducers/userReducers";
import * as categories from "./Reducers/CategoriesReducer";
import * as movies from "./Reducers/MoviesReducer";

const rootReducer = combineReducers({
    //reducer del usuario
    userLogin: User.userLoginReducer,
    userRegister: User.userRegisterReducer, 
    userUpdateProfile : User.userUpdateProfileReducer,
    userDeleteProfile : User.userDeleteProfileReducer,
    userchangepassword : User.userChangePasswordReducer, 
    userchangepassword : User.userChangePasswordReducer,
    userGetFavoriteMovies : User.userGetFavoriteMoviesReducer, 
    userDeleteFavoriteMovies : User.userDeleteFavoriteMoviesReducer,
    adminGetAllUsers : User.adminGetAllUsersReducer, 
    adminDeleteUser : User.adminDeleteUserReducer,

    // reducers de categorias
    categoryGetAll : categories.getAllCategoriesReducer, 
    categoryCreate : categories.createCategoryReducer,
    categoryUpdate : categories.updateCategoryReducer, 
    categoryDelete : categories.deleteCategoryReducer, 

    // reducers para las peliculas
    getAllMovies : movies.moviesListReducer, 
    

});

// get userinfo del local storage
const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

//inicializar el state
const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
});
import { relativeTimeRounding } from "moment/moment";
import Axios from "./Axios";

//llamada a la api para la creacion de nuevos usuarios
const registerService = async (user) => {
    const { data } = await Axios.post("/users", user);
    if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
};

// funcion de logout del usuario
const logoutService = () => {
    localStorage.removeItem("userInfo");
    return null;
}

// llamada de la API para el login del usuario
const loginService = async (user) => {
    const { data } = await Axios.post("/users/login", user);
    if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
};

//actualizar el perfil API
const updateProfileService = async (user, token) =>{
    const {data} = await Axios.put("/users", user, {
        headers: {
            Authorization: `Bearer ${token}`, 
        }, 
    });
    if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
};

// eliminar el perfil llamada de la API
const deleteProfileService = async (token) => {
    const {data} = await Axios.delete("/users", {
        headers: {
            Authorization: `Bearer ${token}`, 
        }, 
    });
    if (data) {
        localStorage.removeItem("userInfo");
    }
    return data;
};

// cambiar la contraseña llamando a la api
const changePasswordService = async (passwords,token ) => {
    const {data} = await Axios.put("/users/password", passwords,  {
        headers : {
            Authorization: `Bearer ${token}`, 
        }, 
    });
    return data;
};


/**************PELICULAS FAVORITAS********************/
// metodos

// obtenemos todas las peliculas favoritas
const getFavoriteMovies = async (token) => {
    const {data} = await Axios.get("/users/favorites" , {
        headers: {
            Authorization: `Bearer ${token}`, 
        }, 
    });
    return data;
};

// eliminar todaas las peliculas favoritas
const deleteFavoriteMovies = async (token) => {
    const {data} = await Axios.delete("/users/favorites" , {
        headers: {
            Authorization: `Bearer ${token}`, 
        }, 
    });
    return data;

};

// llamamos a la api con este metodo 
const likeMovieService = async (movieId, token) => {
    const { data } = await Axios.post(`/users/favorites`, movieId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };

  
  /************************ADMIN APIS*********************/


// admin obtener todos los usuarios
const getAllUsersService = async (token) => {
    const {data} = await Axios.get("/users", {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    });
    return data;
};

//eliminar un usuario desde el admin
const deleteUsersService = async (id, token) => {
    const {data} = await Axios.delete(`/users${id}`, {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    });
    return data;
};


export { 
    registerService, 
    logoutService, 
    loginService, 
    updateProfileService,
     deleteProfileService, 
     changePasswordService, 
     deleteFavoriteMovies, 
     getFavoriteMovies, 
     getAllUsersService, 
     deleteUsersService,
     likeMovieService, 
    };



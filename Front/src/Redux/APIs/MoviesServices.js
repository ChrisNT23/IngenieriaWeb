import Axios from "./Axios";

/**********API PUBLICA*************/

//funcion para obtener todas las peliculas
export const getAllMoviesService = async (
    category, time, language, rate, year, search, pageNumber,
) => {
    const { data } = await Axios.get(`/movies?category=${category}&time=${time}&language=${language}&rate=${rate}&year=${year}&search=${search}&pageNumber=${pageNumber}`
    );
    return data;
};
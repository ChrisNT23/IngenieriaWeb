import Axios from "./Axios";

/***************OPCIONES PUBLICAS*****************/

// Obtener todas las categorias API
 const getCategoriesService = async () => {
    const { data } = await Axios.get("/categories");
    return data;
};


/***************ADMIN OPCIONES*****************/

// crear una nueva categoria
 const createCategoryService = async (title, token) => {
    const { data } = await Axios.post("/categories", title, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

// eliminar una categoria usando API
 const deleteCategoryService = async (id, token) => {
    const { data } = await Axios.delete(`/categories/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

//Actualizar una actegoria usando la Api 
const updateCategoryService = async (id,title,token) => {
    const { data } = await Axios.put(`/categories/${id}`, title, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

export {
    getCategoriesService,
    createCategoryService,
    deleteCategoryService,
    updateCategoryService,
};
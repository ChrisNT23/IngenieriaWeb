import * as CategoriesContants from '../Constants/CategoriesConstants';

//obtener todas las categorias
export const getAllCategoriesReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case CategoriesContants.GET_ALL_CATEGORIES_REQUEST:
            return { isLoading: true };
        case CategoriesContants.GET_ALL_CATEGORIES_SUCCESS:
            return { isLoading: false, categories: action.payload };
        case CategoriesContants.GET_ALL_CATEGORIES_FAIL:
            return { isLoading: false, isError: action.payload };
        case CategoriesContants.GET_ALL_CATEGORIES_RESET:
            return {};
        default:
            return state;
}
};

// Creamos una categoria
export const createCategoryReducer = (state = {}, action ) => {
    switch (action.type) {
        case CategoriesContants.CREATE_CATEGORY_REQUEST:
            return { isLoading: true };
        case CategoriesContants.CREATE_CATEGORY_SUCCESS:
            return { isLoading: false, isSuccess: true };
        case CategoriesContants.CREATE_CATEGORY_FAIL:
            return { isLoading: false, isError: action.payload };
        case CategoriesContants.CREATE_CATEGORY_RESET:
            return {};
        default:
            return state;
}
};

// actualizamos la categoria
export const updateCategoryReducer = (state ={}, action) => {
    switch (action.type) {
        case CategoriesContants.UPDATE_CATEGORY_REQUEST:
            return { isLoading: true };
        case CategoriesContants.UPDATE_CATEGORY_SUCCESS:
            return { isLoading: false, isSuccess: true };
        case CategoriesContants.UPDATE_CATEGORY_FAIL:
            return { isLoading: false, isError: action.payload };
        case CategoriesContants.UPDATE_CATEGORY_RESET:
            return {};
        default:
            return state;
}
};

// Eliminar una categoria
export const deleteCategoryReducer = (state = {}, action ) => {
    switch (action.type) {
        case CategoriesContants.DELETE_CATEGORY_REQUEST:
            return { isLoading: true };
        case CategoriesContants.DELETE_CATEGORY_SUCCESS:
            return { isLoading: false, isSuccess: true };
        case CategoriesContants.DELETE_CATEGORY_FAIL:
            return { isLoading: false, isError: action.payload };
        case CategoriesContants.DELETE_CATEGORY_RESET:
            return {};
        default:
            return state;
}
};
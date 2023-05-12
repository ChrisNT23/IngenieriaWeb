import * as CategoriesConstants from "../Constants/CategoriesConstants";
import * as categoriesAPIs from "../APIs/CategoriesServices";
import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";

// obtenemos todas las categorias action
export const getAllCategoriesAction = () => async (dispatch) => {
    try {
        dispatch({ type: CategoriesConstants.GET_ALL_CATEGORIES_REQUEST });
        const data = await categoriesAPIs.getCategoriesService();
        dispatch({ type: CategoriesConstants.GET_ALL_CATEGORIES_SUCCESS, payload: data })
    } catch (error) {
        ErrorsAction(error, dispatch, CategoriesConstants.GET_ALL_CATEGORIES_FAIL);
    }
};

// Crear una categoria accion
export const createCategoryAction = (title) => async (dispatch, getState) => {
    try {
        dispatch({ type: CategoriesConstants.CREATE_CATEGORY_REQUEST });
        const data = await categoriesAPIs.createCategoryService(
            title,
            tokenProtection(getState)
        );
        dispatch({ type: CategoriesConstants.CREATE_CATEGORY_SUCCESS });
        toast.success("La categoria fue creada con éxito")
    } catch (error) {
        ErrorsAction(error, dispatch, CategoriesConstants.CREATE_CATEGORY_FAIL);
    }
};


// actualizar categoria accion
export const updateCategoryAction = (id, title) => async (dispatch, getState) => {
    try {
        dispatch({ type: CategoriesConstants.UPDATE_CATEGORY_REQUEST });
        const data = await categoriesAPIs.updateCategoryService(
            id,
            title,
            tokenProtection(getState)
        );
        dispatch({ type: CategoriesConstants.UPDATE_CATEGORY_SUCCESS });
        toast.success("La categoria fue actualizada con éxito");
        dispatch(getAllCategoriesAction());
    } catch (error) {
        ErrorsAction(error, dispatch, CategoriesConstants.UPDATE_CATEGORY_FAIL);
    }
};

// eliminar una categoria
export const deleteCategoryAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: CategoriesConstants.DELETE_CATEGORY_REQUEST });
        await categoriesAPIs.deleteCategoryService(id, tokenProtection(getState));
        dispatch({ type: CategoriesConstants.DELETE_CATEGORY_SUCCESS });
        toast.success("La categoria fue eliminada con éxito");
        dispatch(getAllCategoriesAction());
    } catch (error) {
        ErrorsAction(error, dispatch, CategoriesConstants.DELETE_CATEGORY_FAIL);
    }
};
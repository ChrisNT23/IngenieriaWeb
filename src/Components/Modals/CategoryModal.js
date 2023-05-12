import React from "react";
import MainModal from "./MainModal";
import { Input } from "../UsedInputs";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import {
  createCategoryAction,
  updateCategoryAction,
} from "../../Redux/Actions/CategoriesActions";

function CategoryModal({ modalOpen, setModalOpen, category }) {
  const [title, setTitle] = useState("")
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess } = useSelector((state) => state.categoryCreate);
  const { isLoading: upLoading, isError: upError, isSuccess: upSuccess } = useSelector((state) => state.categoryUpdate);
  
  //handler de la categoria
  const submitHanldler = (e) => {
    e.preventDefault()
    if (title) {
      // si la categoria no es vacia se actualiza sino se crea
      if (category) {
        dispatch(updateCategoryAction(category?._id, { title: title }));
        setModalOpen(!modalOpen);
      }
      else {
        dispatch(createCategoryAction({ title: title }));
      }
    }
    else {
      toast.error("Por favor escriba una categoria")
    }
  };

  useEffect(() => {
    if(upError || isError) {
      toast.error(upError || isError)
      dispatch ({
        type: isError ? "CREATE_CATEGORY_RESET" : "UPDATE_CATEGORY_RESET"
      })

    }

    //SUCCESS
    if(upSuccess || isSuccess) {
      dispatch ({
        type: isError ? "CREATE_CATEGORY_RESET" : "UPDATE_CATEGORY_RESET"
      })
    }

    // si la categoria es null seteamos el titulo
    if (category) {
      setTitle(category?.title)
    }
    //si el modal es cerrado 
    if(modalOpen === false) {
      setTitle("")
    }
  }, [dispatch, isError, isSuccess, upSuccess, upError, category, modalOpen]);



  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-3xl font-bold">{category ? "Update" : "Crear"}</h2>
        <form className="flex flex-col gap-6 text-left mt-6"
        onSubmit={submitHanldler}
        >
          <Input
            label="Nombre de la categoría"
            placeholder= {"Accion"}
            type="text"
            bg={false}
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />
          <button 
          disabled={isLoading || upLoading}
          type="submit"
            className="w-full flex-rows gap-4 py-3 text-lg transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
          >
            {
              isLoading || upLoading ? "Cargando..." : category ? "Actualizar" : "Crear"
            }
          </button>
        </form>
      </div>
    </MainModal>
  );
}

export default CategoryModal;
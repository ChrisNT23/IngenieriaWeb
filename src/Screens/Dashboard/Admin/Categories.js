import React, { useEffect, useState } from "react";
import { HiPlusCircle } from "react-icons/hi";
import Table2 from "../../../Components/Table2";
import SideBar from "../SideBar";
import CategoryModal from "../../../Components/Modals/CategoryModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategoryAction } from "../../../Redux/Actions/CategoriesActions";
import Loader from "../../../Components/Notifications/Loader";
import { Empty } from "../../../Components/Notifications/Empty";
import { toast } from "react-hot-toast";

function Categories() {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState();
  const dispatch = useDispatch();

  // todas las categorias
  const { categories, isLoading } = useSelector(
    (state) => state.categoryGetAll
  );
  // eliminar categoria
  const { isSuccess, isError } = useSelector(
    (state) => state.categoryDelete
  );
  const adminDeleteCategory = (id) => {
    if (window.confirm("Está seguro de eliminar la categoria")) {
      dispatch(deleteCategoryAction(id));
    }
  };

  const OnEditFunction = (id) => {
    setCategory(id);
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    //obtenemos todas las categorias
    //dispatch(getAllCategoriesAction());

    if(isError){
      toast.error(isError);
      dispatch({type: "DELETE_CATEGORY_RESET",});
    }

    if(isSuccess){
      dispatch({type: "DELETE_CATEGORY_RESET",});
    }


    if (modalOpen === false) {
      setCategory();
    }
  }, [modalOpen, dispatch, isError, isSuccess]);



  useEffect(() => {
    if (modalOpen === false) {
      setCategory();
    }
  }, [modalOpen]);

  return (
    <SideBar>
      <CategoryModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        category={category}
      />
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Categories</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded"
          >
            <HiPlusCircle /> Crear
          </button>
        </div>

        {
          isLoading ? (
            <Loader />
          ) : categories?.length > 0 ? (
            <Table2
              data={categories}
              users={false}
              OnEditFunction={OnEditFunction}
              onDeleteFunction={adminDeleteCategory}
            />
          ) : (
            <Empty message="No hay categorías" />
          )}




      </div>
    </SideBar>
  );
}

export default Categories;
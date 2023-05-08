import React from "react";
import Table2 from "../../../Components/Table2";
import SideBar from "../SideBar";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAction, getAllUsersAction } from "../../../Redux/Actions/userActions";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import Loader from "../../../Components/Notifications/Loader";
import { Empty } from "../../../Components/Notifications/Empty";

function Users() {
  const dispatch = useDispatch()

  const {
    isLoading, isError,
    users
  } = useSelector((state) => state.adminGetAllUsers);

  // eliminar 
  const {
    isError: deleteError,
    isSuccess
  } = useSelector((state) => state.adminDeleteUser);

  // eliminar usuarios handler
  const deleteMoviesHandler =(id) => {
    if (window.confirm("Esta seguro que desea eliminar un usuario?")) {
      dispatch(deleteUserAction(id));
    }
  };

  // use effect
  useEffect(() => {
    dispatch(getAllUsersAction());
    if (isError || deleteError ) {
      toast.error(isError || deleteError);
      dispatch({ type: isError ? "GET_ALL_USERS_RESET" : "DELETE_USER_RESET" });
    }

  }, [dispatch, isError, deleteError, isSuccess]);


  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Usuarios</h2>
        {
          isLoading ? (
            <Loader />
          ) : users?.length > 0 ? (
            <Table2 data={users} users={true} onDeleteFunction={deleteMoviesHandler}/>
          ) : (
            <Empty message="No existen usuarios"/>
          )}

       
      </div>
    </SideBar>
  );
}

export default Users;

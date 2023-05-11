import React, { useEffect } from "react";
import { FaRegListAlt, FaUser } from "react-icons/fa";
import SideBar from "../SideBar";
import { HiViewGridAdd } from "react-icons/hi";
import Table from "../../../Components/Table";
import { Movies } from "../../../Data/MovieData";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { getAllUsersAction } from "../../../Redux/Actions/userActions";
import { getAllMoviesAction } from "../../../Redux/Actions/MoviesActions";
import { getAllCategoriesAction } from "../../../Redux/Actions/CategoriesActions";

function Dashboard() {
  const dispatch = useDispatch();
    // useSelectors
    const {
      isLoading: catLoading,
      isError: catError,
      categories,
    } = useSelector((state) => state.categoryGetAll);
    const {
      isLoading: userLoading,
      isError: userError,
      users,
    } = useSelector((state) => state.adminGetAllUsers);
    const { isLoading, isError, movies, totalMovies } = useSelector(
      (state) => state.getAllMovies
    );
  
    // useEffect
    useEffect(() => {
      // obtenemos todos los usuarios
      dispatch(getAllUsersAction());
      // get all movies
      dispatch(getAllMoviesAction({}));
      // obtenemos todas las categorias 
      dispatch(getAllCategoriesAction());
      // errors
      if (isError || catError || userError) {
        toast.error("Algo salió mal!");
      }
    }, [dispatch, isError, catError, userError]);

  const DashboardData = [
    {
      bg: "bg-orange-600",
      icon: FaRegListAlt,
      title: "Total Movies",
      total: isLoading ? "Cargando..." : totalMovies || 0, 
    },
    {
      bg: "bg-blue-700",
      icon: HiViewGridAdd,
      title: "Total Categories",
      total: catLoading ? "Cargando..." : categories?.length || 0, 
    },
    {
      bg: "bg-green-600",
      icon: FaUser,
      title: "Total Users",
      total: userLoading ? "Cargando..." : users?.length || 0,   
    },
  ];
  return (
    <SideBar>
      <h2 className="text-xl font-bold">Dashboard</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {DashboardData.map((data, index) => (
          <div
            key={index}
            className="p-4 rounded bg-main border-border grid grid-cols-4 gap-2"
          >
            <div
              className={`col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}`}
            >
              <data.icon />
            </div>
            <div className="col-span-3">
              <h2>{data.title}</h2>
              <p className=" mt-2 font-bold">{data.total}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-md font-medium my-6 text-border">Peliculas Recientes</h3>
      <Table data={Movies.slice(0, 5)} admin={true} />
    </SideBar>
  );
}

export default Dashboard;

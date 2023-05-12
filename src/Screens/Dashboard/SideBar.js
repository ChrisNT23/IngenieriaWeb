import React from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt, FaUsers, FaHeart } from "react-icons/fa";
import { RiMovie2Fill, RiLockPasswordLine, RiLogoutCircleLine } from "react-icons/ri";
import { HiViewGridAdd } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import Layout from "../../Layout/Layout";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../Redux/Actions/userActions";
import toast from "react-hot-toast";

function SideBar({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector(
    (state) => state.userLogin
  );

  //log out function
  const logoutHandler = () => {
    dispatch(logoutAction())
    navigate("/login")
    toast.success("Se cerro la sesión con éxito")
  };


  const SideLinks = userInfo?.isAdmin ?
    [
      {
        name: "Dashboard",
        link: "/dashboard",
        icon: BsFillGridFill,
      },
      {
        name: "Listado Peliculas",
        link: "/movieslist",
        icon: FaListAlt,
      },
      {
        name: "Añadir Película",
        link: "/addmovie",
        icon: RiMovie2Fill,
      },
      {
        name: "Categorías",
        link: "/categories",
        icon: HiViewGridAdd,
      },
      {
        name: "Usuarios",
        link: "/users",
        icon: FaUsers,
      },
      {
        name: "Actualizar Perfil",
        link: "/profile",
        icon: FiSettings,
      },
      {
        name: "Películas Favoritas",
        link: "/favorites",
        icon: FaHeart,
      },
      {
        name: "Cambiar Contraseña",
        link: "/password",
        icon: RiLockPasswordLine,
      },
    ]
    : userInfo ?
      [
        {
          name: "Actualizar Perfil",
          link: "/profile",
          icon: FiSettings,
        },
        {
          name: "Películas Favoritas",
          link: "/favorites",
          icon: FaHeart,
        },
        {
          name: "Cambiar Contraseña",
          link: "/password",
          icon: RiLockPasswordLine,
        },
      ]
      : [];

  const active = "bg-dryGray text-subMain";
  const hover = "hover:text-white hover:bg-main";
  const inActive =
    "rounded font-medium text-sm transitions flex gap-3 items-center p-4";
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;

  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2">
        <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
          <div className="col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5">
            {
              // SideBar Links
              SideLinks.map((link, index) => (
                <NavLink to={link.link} key={index} className={Hover}>
                  <link.icon /> <p>{link.name}</p>
                </NavLink>
              ))
            }
            <button onClick={logoutHandler} className={`${inActive} ${hover} w-full`}>
              <RiLogoutCircleLine/> Cerrar Sesión

            </button>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="10"
            data-aos-offset="200"
            className="col-span-6 rounded-md bg-dry border border-gray-800 p-6"
          >
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SideBar;
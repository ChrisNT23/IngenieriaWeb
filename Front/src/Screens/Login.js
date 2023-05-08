import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../Components/UsedInputs";
import Layout from "../Layout/Layout";
import { FiLogIn } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { LoginValidation } from "../Components/Validation/UserValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginAction } from "../Redux/Actions/userActions";
import { useEffect } from "react";
import toast from "react-hot-toast";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, userInfo, isSuccess } = useSelector(
    (state) => state.userLogin
  );

  // validacion del usuario
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginValidation),

  })

  // on submit
  const onSubmit = (data) => {
    dispatch(loginAction(data));
  };

  // useEffect 
  useEffect(()=> {
    if (userInfo?.isAdmin) {
      navigate("/dashboard");
    }
    else if (userInfo){
      navigate("/profile");
    }
    if(isSuccess) {
      toast.success(`Bienvenido de vuelta ${userInfo?.fullName}`);
    }
    if (isError) {
      toast.error(isError);
      dispatch({type: "USER_LOGIN_RESET"});
    }
  }, [userInfo, isSuccess, isError, navigate, dispatch]);


  return (
    <Layout>
      <div className="container mx-auto px-2 my-24 flex-colo">
        <form
          onSubmit={handleSubmit(onSubmit)} className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry  rounded-lg border border-border">

          <div className="w-full">
            <Input
              label="Correo"
              placeholder="ejemplo@gmail.com"
              type="email"
              name="email"
              register={register("email")}
              bg={true}
            />
            {
              errors.email
              //&& <InlineError text={errors.email.message}/>
            }
          </div>

          <div className="w-full">
            <Input
              label="Contraseña"
              placeholder="*******"
              type="password"
              name="password"
              register={register("password")}
              bg={true}
            />
            {
              errors.password
              //&& <InlineError text={errors.password.message}/>
            }
          </div>


          <button
            type="submit"
            disabled={isLoading}
            className="bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full"
          >
            {
              // si esta cargando
              isLoading ? (
                "Loading:..."
              ) : (
                <>
                  <FiLogIn /> Iniciar Sesión
                </>
              )
            }
          </button>
          <p className="text-center text-border">
            ¿No tiene cuenta?{" "}
            <Link to="/register" className="text-dryGray font-semibold ml-2">
              Registrese
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}

export default Login;

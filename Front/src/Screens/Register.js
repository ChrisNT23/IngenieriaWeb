import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../Components/UsedInputs";
import Layout from "../Layout/Layout";
import { FiLogIn } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { registerAction } from "../Redux/Actions/userActions";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterValidation } from "../Components/Validation/UserValidation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, userInfo, isSuccess } = useSelector(
    (state) => state.userRegister
  );

  // validacion del usuario
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(RegisterValidation),

  })

  // on submit
  const onSubmit = (data) => {
    dispatch(registerAction(data));
  };

  // useEffect 
  useEffect(() => {
    if (userInfo?.isAdmin) {
      navigate("/dashboard");
    }
    else if (userInfo) {
      navigate("/profile");
    }
    if (isSuccess) {
      toast.success(`Bienvenido  ${userInfo?.fullName}`);
      dispatch({ type: "USER_REGISTER_RESET" });
    }
    if (isError) {
      toast.error(String(isError));
      //toast.error(isError);
      dispatch({ type: "USER_REGISTER_RESET" });
    }
  }, [userInfo, isSuccess, isError, navigate, dispatch]);

  return (
    <Layout>
      <div className="container mx-auto px-2 my-24 flex-colo">
        <form
          onSubmit={handleSubmit(onSubmit)} className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry  rounded-lg border border-border">

          <div className="w-full">
            <Input
              label="fullName"
              placeholder="Christian"
              type="text"
              bg={true}
              name="fullName"
              register={register("fullName")}
            />
            {
              //errors.fullname
              //&& <InlineError text={errors.email.message}/>
            }
          </div>

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
                  <FiLogIn /> Registrarse
                </>
              )
            }
          </button>
          <p className="text-center text-border">
            ¿Ya tiene una cuenta?{" "}
            <Link to="/login" className="text-dryGray font-semibold ml-2">
              Iniciar Sesión
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}

export default Register;
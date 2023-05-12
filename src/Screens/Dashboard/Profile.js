import React from "react";
import Uploder from "../../Components/Uploder";
import { Input } from "../../Components/UsedInputs";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ProfileValidation } from "../../Components/Validation/UserValidation";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Imagepreview } from "../../Components/Imagepreview";
import { useState } from "react";
import { deleteProfileAction, updateProfileAction } from "../../Redux/Actions/userActions";
import { toast } from "react-hot-toast";
import { isCancel } from "axios";

function Profile() {
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state) => state.userLogin);
  const [imageUrl, setImageUrl] = useState(userInfo ? userInfo.image : "");
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.userUpdateProfile
  );

  const { isLoading:deleteLoading, isError:deleteError} = useSelector(
    (state) => state.userDeleteProfile
    );

  // validacion del usuario
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProfileValidation),

  });

  // on submit y actualizar perfil 
  const onSubmit = (data) => {
    //dispatch(updateProfileAction({...data, image:imageUrl>}))
    //console.log({...data, image : imageUrl});
    dispatch(updateProfileAction({...data, image:imageUrl}));
  };

  // eliimnar perfil
  const deleteProfile = () => {
    window.confirm("¿Está seguro de eliminar el perfil?") &&
    dispatch(deleteProfileAction());
  };

  // useEffect 
  useEffect(() => {
    if (userInfo) {
      setValue("fullName", userInfo?.fullName);
      setValue("email", userInfo?.email);
    }
    if (isSuccess) {
      dispatch({type: "USER_UPDATE_PROFILE_RESET"});
    }
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({type: "USER_UPDATE_PROFILE_RESET"});
      dispatch({type: "USER_DELETE_PROFILE_RESET"});
    }
  }, [userInfo,setValue, isSuccess, isError, dispatch, deleteError]);

  return (
    <SideBar>
      <form onSubmit={
        handleSubmit(onSubmit)

      }
       className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Perfil</h2>
        <div className="w-full grid lg:grid-cols-12 gap-6">
          <div className="col-span-10"> 
          <Uploder setImageUrl={setImageUrl}/>
          </div>
          {/*imagen*/}
          <div className="col-span-2"> 
          <Imagepreview 
          image={imageUrl}
          name={
            userInfo ? userInfo.fullName : ""
          }/>
        </div>
        </div>

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
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button 
          onClick={deleteProfile}
          disabled={deleteLoading || isLoading}
          className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
           
            {deleteLoading ? "Eliminando..." : "Eliminar Cuenta"}
          </button>
          <button 
          disabled={deleteLoading || isLoading}
          className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
            {isLoading ? "Actualizando..." : "Actualizacion de perfil"}
          </button>
        </div>
      </form>
    </SideBar>
  );
}

export default Profile;
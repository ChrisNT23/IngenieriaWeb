import * as yup from 'yup';

// validacion para el login
const LoginValidation = yup.object().shape({
    email: yup.string().email().required("El correo es requerido").trim(),
    password: yup.string()
        .required("La contraseña es obligatoria")
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .max(20, "La contraseña no puede tener mas de 20 caracteres")
        .matches(/(?=.*[0-9])/, "La contraseña debe contener al menos un número")
});

// validacion para el registro de usuario
const RegisterValidation = yup.object().shape({
    email: yup.string().email().required("El correo es requerido").trim(),
    password: yup.string()
        .required("La contraseña es obligatoria")
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .max(20, "La contraseña no puede tener mas de 20 caracteres")
        .matches(/(?=.*[0-9])/, "La contraseña debe contener al menos un número"),
    fullName: yup.string().required("El nombre es obligatorio")
        .max(20, "El nombre no puede tener mas de 20 caracteres")
        .matches(/^[a-zA-Z]*$/, "La contraseña debe contener al menos un número"),

});

const ProfileValidation = yup.object().shape({
    fullName: yup.string().required("El nombre es obligatorio")
        .max(20, "El nombre no puede tener mas de 20 caracteres")
        .matches(/^[a-zA-Z]*$/, "La contraseña debe contener al menos un número"),
    email: yup.string().email().required("El correo es requerido").trim(),
});

const PasswordValidation = yup.object().shape({
    oldPassword: yup
        .string()
        .required("La contraseña es requerida")
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .max(20, "La contraseña no puede tener mas de 20 caracteres")
        .matches(/(?=.*[0-9])/, "La contraseña debe contener al menos un número"),
    newPassword: yup
        .string()
        .required("La contraseña es requerida")
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .max(20, "La contraseña no puede tener mas de 20 caracteres")
        .matches(/(?=.*[0-9])/, "La contraseña debe contener al menos un número"),
    confirmPassword: yup
        .string()
        .required("La contraseña es requerida")
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .max(20, "La contraseña no puede tener mas de 20 caracteres")
        .matches(/(?=.*[0-9])/, "La contraseña debe contener al menos un número")
        .oneOf([yup.ref("newPassword"), null], "Las contraseñas deben coincidir"), 

});

export { LoginValidation, RegisterValidation, ProfileValidation, PasswordValidation};

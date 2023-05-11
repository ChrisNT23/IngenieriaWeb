import * as yup from "yup";

const ReviewValidation = yup.object().shape({
  comment: yup
    .string()
    .required("Comment is required")
    .max(150, "Comment should be less than 150 characters"),
  rating: yup.number().required("Select a rating"),
});

const movieValidation = yup.object().shape({
  name: yup
    .string()
    .required("Por favor ingrese el nombre de la pelicula")
    .max(50, "El nombre de la pelcula debe tener como maximo 50 caracteres"),
  time: yup.number().required("Por favor ingrese la duración de la pelicula"),
  language: yup.string().required("Ingrese el idioma de la pelicula"),
  year: yup.number().required("Ingrese el año de lanzamiento de la pelicula"),
  category: yup.string().required("Seleccione a que categoria pertenece la pelicula"),
  desc: yup
    .string()
    .required("Ingrese la descripción de la película")
    .max(300, "La descripción de la pelicula no puede ser mayor a 300 caracteres"),
});

export { ReviewValidation, movieValidation };
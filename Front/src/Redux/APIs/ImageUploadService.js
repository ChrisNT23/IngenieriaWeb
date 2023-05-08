import toast from 'react-hot-toast';
import Axios from './Axios';

const uploadImageservice = async (file, setLoading) => {
     try{
        setLoading(true);
        const {data} = await Axios.post("/upload", file);
        setLoading(false);
        toast.success('El archivo ha sido cargado correctamente');
        return data;

     } catch (error) {
        setLoading(false);
        toast.error('Algo ocurrio al cargar la imagen ')
     }
}; 

export {uploadImageservice};
import { notifyError, notifyInfo, notifyWarning } from '../consts/notify';
import { getAllQualificationUserAxios } from '../services/apis/qualification';

const useQualification = () => {
  const getAllQualifications = async() => {
    const token = JSON.parse(window.localStorage.getItem('session'));
    try {
      const { data } = await getAllQualificationUserAxios({token});
      if (data.length === 0) {
        notifyInfo('Aun no tienes calificaciones agregadas');
      }
      return data;
    } catch (err) {
      if (err.message === 'Network Error')
        notifyError('No encontramos una conexión a internet');
      else if (err.response.data.error === 'Token missing or invalid')
        notifyWarning('Al parecer, perdiste los permisos, te recomiendo cerrar sesión');
    }
  };
  
  return {
    getAllQualifications
  };
};

export default useQualification;
import { notifyError, notifyInfo, notifySuccess, notifyWarning } from '../consts/notify';
import { createQualificationAxios, editQualificationAxios, getAllQualificationUserAxios } from '../services/apis/qualification';

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
  const createQualification = async({course, unit, score, semester}) => {
    const token = JSON.parse(window.localStorage.getItem('session'));

    try {
      const { data } = await createQualificationAxios({
        course, unit, score, semester, token
      });
      notifySuccess('Calificación creada correctamente');

      return data;
    } catch (err) {
      if (err.message === 'Network Error')
        notifyError('No encontramos una conexión a internet');
      else if (err.response.data.error === 'Token missing or invalid')
        notifyWarning('Al parecer, perdiste los permisos, te recomiendo cerrar sesión');
      
      return false;
    }
  };
  const updateQualification = async({course, score, unit, semester, idQualification}) => {
    const token = JSON.parse(window.localStorage.getItem('session'));

    try {
      const response = await editQualificationAxios({
        course, score, unit, semester, idQualification, token
      });
      if (response.status === 200) {
        notifySuccess('Calificación editada correctamente');
      }

      return response.data;
    } catch (err) {
      if (err.message === 'Network Error')
        notifyError('No encontramos una conexión a internet');
      else if (err.response.data.error === 'Token missing or invalid')
        notifyWarning('Al parecer, perdiste los permisos, te recomiendo cerrar sesión');
      
      return false;
    }
  };
  
  return {
    getAllQualifications, createQualification, updateQualification
  };
};

export default useQualification;
import { notifyError, notifySuccess, notifyWarning } from '../consts/notify';
import {
  createQualificationAxios, deleteQualificationAxios,
  editQualificationAxios, getAllQualificationUserAxios
} from '../services/apis/qualification';
import { createHistoryAxios } from '../services/apis/history';

const useQualification = () => {
  const getAllQualifications = async() => {
    const token = JSON.parse(window.localStorage.getItem('session'));
    try {
      const { data } = await getAllQualificationUserAxios({token});
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

      createHistoryAxios({
        token,
        dataHistory: {
          operation: `Se creó la materia ${data.course} con la
            calificación ${data.score} de la unidad ${data.unit} del 
            semestre ${data.semester}`
        }
      });

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

      const { data } = response;

      if (response.status === 200) {
        notifySuccess('Calificación editada correctamente');
      }
      createHistoryAxios({
        token,
        dataHistory: {
          operation: `Se modificaron datos de la materia ${course} la
        información cambiante fue,  
        ${course !== data.course ? 'materia: ' + data.course : '' }  
        ${unit !== data.unit ? 'unidad: ' + data.unit : '' } 
        ${score !== data.score ? 'calificación: ' + data.score : '' } 
        ${semester !== data.semester ? 'semestre: ' + data.semester : '' }`}
      });

      return data;
    } catch (err) {
      if (err.message === 'Network Error')
        notifyError('No encontramos una conexión a internet');
      else if (err.response.data.error === 'Token missing or invalid')
        notifyWarning('Al parecer, perdiste los permisos, te recomiendo cerrar sesión');
      
      return false;
    }
  };
  const deleteQualification = async({idQualification}) => {
    const token = JSON.parse(window.localStorage.getItem('session'));

    try {
      const response = await deleteQualificationAxios({idQualification, token});
      if (response.status !== 204) return false;

      return true;
    } catch (err) {
      if (err.message === 'Network Error')
        notifyError('No encontramos una conexión a internet');
      else if (err.response.data.error === 'Token missing or invalid')
        notifyWarning('Al parecer, perdiste los permisos, te recomiendo cerrar sesión');
      
      return false;
    }
  };
  
  return {
    getAllQualifications, createQualification, updateQualification,
    deleteQualification
  };
};

export default useQualification;
import { notifyError, notifySuccess, notifyWarning } from '../consts/notify';
import { createHistoryAxios, deleteHistoryAxios, getAllHistoryUserAxios } from '../services/apis/history';

const useHistory = () => {
  const getAllHistoryUser = async() => {
    const token = JSON.parse(window.localStorage.getItem('session'));

    try {
      const { data } = await getAllHistoryUserAxios({token});

      return data.reverse();
    } catch (err) {
      if (err.message === 'Network Error')
        notifyError('No encontramos una conexión a internet');
      else if (err.response.data.error === 'Token missing or invalid')
        notifyWarning('Al parecer, perdiste los permisos, te recomiendo cerrar sesión');

      return false;
    }
  };
  const createHistoryDelete = ({course, score, unit, semester}) => {
    const token = JSON.parse(window.localStorage.getItem('session'));

    createHistoryAxios({token, dataHistory: {
      operation: `Se elimino la materia ${course} con la
        calificación ${score} de la unidad ${unit} del 
        semestre ${semester}`
    }});
  };
  const deleteHistory = async({idHistory}) => {
    const token = JSON.parse(window.localStorage.getItem('session'));

    try {
      const response = await deleteHistoryAxios({idHistory, token});
      if (response.status === 204) {
        notifySuccess('Historial eliminada correctamente');
        return true;
      }

      return false;
    } catch (err) {
      if (err.message === 'Network Error')
        notifyError('No encontramos una conexión a internet');
      else if (err.response.data.error === 'Token missing or invalid')
        notifyWarning('Al parecer, perdiste los permisos, te recomiendo cerrar sesión');
      
      return false;
    }
  };

  return { createHistoryDelete, getAllHistoryUser, deleteHistory };
};

export default useHistory;
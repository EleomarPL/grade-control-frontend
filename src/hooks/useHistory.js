import { notifyError, notifyInfo, notifyWarning } from '../consts/notify';
import { createHistoryAxios, getAllHistoryUserAxios } from '../services/apis/history';

const useHistory = () => {
  const getAllHistoryUser = async() => {
    const token = JSON.parse(window.localStorage.getItem('session'));

    try {
      const { data } = await getAllHistoryUserAxios({token});
      if (data.length === 0) notifyInfo('Historial vacio');

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

  return { createHistoryDelete, getAllHistoryUser };
};

export default useHistory;
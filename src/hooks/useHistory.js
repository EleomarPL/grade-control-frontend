import { createHistoryAxios } from '../services/apis/history';

const useHistory = () => {
  const createHistoryDelete = ({course, score, unit, semester}) => {
    const token = JSON.parse(window.localStorage.getItem('session'));

    createHistoryAxios({token, dataHistory: {
      operation: `Se elimino la materia ${course} con la
        calificación ${score} de la unidad ${unit} del 
        semestre ${semester}`
    }});
  };

  return { createHistoryDelete };
};

export default useHistory;
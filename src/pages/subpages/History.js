import { useEffect, useState } from 'react';

import { deleteHistory } from '../../services/apis/history';
import { notifyError, notifyWarning, notifySuccess } from '../../consts/notify';
import SpinnerLoading from '../../components/SpinnerLoading';
import useHistory from '../../hooks/useHistory';

const History = () => {
  const [history, setHistory] = useState(null);
  const [isLoadHistory, setIsLoadHistory] = useState(false);
  const { getAllHistoryUser } = useHistory();

  useEffect(() => {
    setIsLoadHistory(true);

    getAllHistoryUser().then(res => {
      setIsLoadHistory(false);
      
      if (res) setHistory(res);
    });
  }, []);

  const deleteSingleHistory = (idHistory) => {
    const getToken = window.localStorage.getItem('session');
    deleteHistory({token: JSON.parse(getToken), idHistory: idHistory}).
      then(response => {
        if (response.status === 204) {
          setHistory(history.filter((value) => value.id !== idHistory));
          notifySuccess('Historial eliminada correctamente');
        }
      }).catch(err => {
        if (err.message === 'Network Error') {
          notifyError('No encontramos una conexión a internet');
        } else if (err.response.data.error === 'Token missing or invalid') {
          notifyWarning('Al parecer, perdiste los permisos, te recomiendo cerrar sesión');
        }
      });
  };
  return (
    <section>
      <div className="table-responsive">
        <table className="table text-center ">
          <thead className="table-dark">
            <tr>
              <th scope="col">Operacion</th>
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            { history !== null &&
            history.map((object, index) =>
              <tr key={ index }>
                <td>{ object.operation }</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger w-100"
                    onClick={ () => deleteSingleHistory(object.id) }
                  >
                    Eliminar
                  </button>
                </td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
      { isLoadHistory &&
        <SpinnerLoading />
      }
    </section>
  );
};

export default History;
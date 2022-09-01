import { useEffect, useState } from 'react';

import SpinnerLoading from '../../components/SpinnerLoading';
import useHistory from '../../hooks/useHistory';
import NoHistoryMessage from '../../components/NoHistoryMessage';
import SpinnerLoadingButton from '../../components/common/SpinnerLoadingButton';

const History = () => {
  const [history, setHistory] = useState([]);
  const [isLoadHistory, setIsLoadHistory] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(0);

  const { getAllHistoryUser, deleteHistory } = useHistory();

  useEffect(() => {
    setIsLoadHistory(true);

    getAllHistoryUser().then(res => {
      setIsLoadHistory(false);
      if (res) setHistory(res);
    });
  }, []);

  const deleteSingleHistory = (idHistory) => {
    setButtonLoading(idHistory);
    deleteHistory({idHistory}).then(res => {
      setButtonLoading(0);
      if (res) {
        setHistory(history.filter((value) => value.id !== idHistory));
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
                    disabled={ buttonLoading === object.id }
                    onClick={ () => deleteSingleHistory(object.id) }
                  >
                    { buttonLoading === object.id && <SpinnerLoadingButton /> }
                    Eliminar
                  </button>
                </td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
      { history.length === 0 && !isLoadHistory &&
        <NoHistoryMessage />
      }
      { isLoadHistory &&
        <SpinnerLoading />
      }
    </section>
  );
};

export default History;
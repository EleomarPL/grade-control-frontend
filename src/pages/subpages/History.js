import { useEffect, useState } from 'react';
import { Button, Table, Tooltip } from '@nextui-org/react';

import SpinnerLoading from '../../components/SpinnerLoading';
import useHistory from '../../hooks/useHistory';
import NoHistoryMessage from '../../components/NoHistoryMessage';
import SpinnerLoadingButton from '../../components/common/SpinnerLoadingButton';
import Icon from '../../components/Icon';

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
      <Table
        aria-label="Lista de operaciones"
        css={ {
          height: 'auto',
          minWidth: '100%'
        } }
      >
        <Table.Header>
          <Table.Column>Operación</Table.Column>
          <Table.Column>Eliminar</Table.Column>
        </Table.Header>
        <Table.Body>
          { history !== null &&
            history.map((value, index) =>
              <Table.Row key={ `${index}` }>
                <Table.Cell
                  css={ { textOverflow: 'ellipsis' } }
                >
                  { value.operation }
                </Table.Cell>
                <Table.Cell>
                  <Tooltip content="Eliminar">
                    <Button bordered color="error"
                      auto
                      disabled={ buttonLoading === value.id }
                      onClick={ () => deleteSingleHistory(value.id) }
                    >
                      { buttonLoading === value.id && <SpinnerLoadingButton /> }
                      <Icon classNameIcon="bi-trash-fill" textNV="Eliminar" />
                    </Button>
                  </Tooltip>
                </Table.Cell>
              </Table.Row>
            )
          }
        </Table.Body>
      </Table>
      { history.length === 0 && !isLoadHistory &&
        <NoHistoryMessage />
      }
      { isLoadHistory && <SpinnerLoading /> }
    </section>
  );
};

export default History;
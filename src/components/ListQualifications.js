import { Button, Table, Tooltip } from '@nextui-org/react';
import PropTypes from 'prop-types';

import Icon from './Icon';

const ListQualifications = ({qualifications, setIsCreated, setDataToEdit, setIdQualificationDelete, setVisibleCreateEdit, setVisibleDelete}) => {

  const deleteThisQualification = (idQualification) => {
    setIdQualificationDelete(idQualification);
    setVisibleDelete(true);
  };

  const editQualification = (valueToEdit) => {
    if (valueToEdit) {
      setIsCreated(false);
      setDataToEdit(valueToEdit);
      setVisibleCreateEdit(true);
    }
  };
  return (
    <Table
      aria-label="Lista de calificaciones"
      css={ {
        height: 'auto',
        minWidth: '100%'
      } }
    >
      <Table.Header>
        <Table.Column>Materia</Table.Column>
        <Table.Column>Unidad</Table.Column>
        <Table.Column>Semestre</Table.Column>
        <Table.Column>Calificación</Table.Column>
        <Table.Column>Editar</Table.Column>
        <Table.Column>Eliminar</Table.Column>
      </Table.Header>
      <Table.Body>
        { qualifications !== null && qualifications !== undefined &&
            qualifications.map((value, index) =>
              <Table.Row key={ `${index}` }>
                <Table.Cell>{ value.course }</Table.Cell>
                <Table.Cell>{ value.unit }</Table.Cell>
                <Table.Cell>{ value.semester }</Table.Cell>
                <Table.Cell>{ value.score }</Table.Cell>
                <Table.Cell>
                  <Tooltip content="Editar">
                    <Button bordered color="primary"
                      auto onPress={ () => editQualification(value) }
                    >
                      <Icon classNameIcon="bi-pencil-fill" textNV="Editar" />
                    </Button>
                  </Tooltip>
                </Table.Cell>
                <Table.Cell>
                  <Tooltip content="Eliminar">
                    <Button bordered color="error"
                      auto
                      onPress={ () => deleteThisQualification(value.id) }
                    >
                      <Icon classNameIcon="bi-trash-fill" textNV="Eliminar" />
                    </Button>
                  </Tooltip>
                </Table.Cell>
              </Table.Row>
            )
        }
      </Table.Body>
    </Table>
    
  );
};

ListQualifications.propTypes = {
  qualifications: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.array
  ]),
  setIsCreated: PropTypes.func,
  setDataToEdit: PropTypes.func,
  setIdQualificationDelete: PropTypes.func,
  setVisibleCreateEdit: PropTypes.func,
  setVisibleDelete: PropTypes.func
};

export default ListQualifications;
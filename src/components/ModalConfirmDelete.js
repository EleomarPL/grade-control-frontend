import { useState } from 'react';
import { Button, Modal, Text } from '@nextui-org/react';
import PropTypes from 'prop-types';

import { notifySuccess } from '../consts/notify';
import useQualification from '../hooks/useQualification';
import useHistory from '../hooks/useHistory';
import SpinnerLoadingButton from './common/SpinnerLoadingButton';

export const ModalConfirmDelete = ({ idQualificationDelete, setQualifications, qualifications, visible, setVisible }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { deleteQualification } = useQualification();
  const { createHistoryDelete } = useHistory();

  const handleHideModal = () => {
    setVisible(false);
  };

  const executeDelete = () => {
    setIsLoading(true);

    deleteQualification({idQualification: idQualificationDelete}).then(res => {
      setIsLoading(false);

      if (res) {
        const findIndex = qualifications.findIndex(el => el.id === idQualificationDelete);

        let temporallyObjectToDelete = qualifications[findIndex];
        
        setQualifications(qualifications.filter((value) => value.id !== idQualificationDelete));
        notifySuccess('Calificación eliminada correctamente');

        createHistoryDelete({
          course: temporallyObjectToDelete.course,
          score: temporallyObjectToDelete.score,
          unit: temporallyObjectToDelete.unit,
          semester: temporallyObjectToDelete.semester
        });
        handleHideModal();
      }
    });
  };
  return (
    <Modal
      closeButton preventClose
      blur aria-labelledby="modal-delete"
      open={ visible } width="600px"
      onClose={ handleHideModal }
    >
      <Modal.Header>
        <Text b id="modal-delete"
          size={ 18 }
        >
          Eliminar calificación
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text css={ {textAlign: 'center'} } size="$2xl">
          ¿Está seguro que lo desea eliminar?
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Button auto
          shadow color="error"
          type="button"
          disabled={ isLoading }
          onPress={ executeDelete }
        >
          { isLoading && <SpinnerLoadingButton /> }
          Eliminar
        </Button>
        <Button auto flat
          type="button"
          shadow color="primary"
          onPress={ handleHideModal }
        >
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ModalConfirmDelete.propTypes = {
  idQualificationDelete: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.string
  ]),
  qualifications: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.array
  ]),
  setQualifications: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  setVisible: PropTypes.func
};


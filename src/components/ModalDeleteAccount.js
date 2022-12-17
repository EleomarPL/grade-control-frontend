import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Text, Modal } from '@nextui-org/react';

import useUser from '../hooks/useUser';
import SpinnerLoadingButton from './common/SpinnerLoadingButton';

export const ModalDeleteAccount = ({ visible, setVisible }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { deleteAccountUser } = useUser();

  const handleHideModal = () => {
    setVisible(false);
  };

  const executeDelete = () => {
    setIsLoading(true);
    deleteAccountUser({setState: setIsLoading, hideModalStatic: handleHideModal});
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
          Eliminar cuenta
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text css={ {textAlign: 'center'} } size="$2xl">
          Esta acción será permanente, ¿Está seguro?
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

ModalDeleteAccount.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func
};


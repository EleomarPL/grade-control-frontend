import { useState } from 'react';
import { Modal } from 'bootstrap';

import useUser from '../hooks/useUser';
import SpinnerLoadingButton from './common/SpinnerLoadingButton';

export const showModalStaticDeleteAccount = () => {
  let myModal = new Modal(
    document.getElementById('staticBackdrop3'), {
      backdrop: 'static',
      keyboard: true,
      focus: true
    }
  );
  myModal.show();
};
export const ModalDeleteAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { deleteAccountUser } = useUser();

  const hideModalStatic = () => {
    let myModal = Modal.getInstance(
      document.getElementById('staticBackdrop3')
    );
    myModal.hide();
  };

  const executeDelete = () => {
    setIsLoading(true);

    deleteAccountUser({setState: setIsLoading, hideModalStatic});
  };
  return (
    <div className="modal fade" id="staticBackdrop3"
      data-bs-backdrop="static" data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Eliminar cuenta
            </h5>
            <button type="button" className="btn-close"
              data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="pt-0 mt-0 pb-2 text-center">
              <strong
                style={ {fontSize: '1.5rem'} }
              >
                Esta acción será permanente, ¿Está seguro?
              </strong>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              disabled={ isLoading }
              onClick={ executeDelete }
            >
              { isLoading && <SpinnerLoadingButton /> }
              Eliminar
            </button>
            <button
              type="button" className="btn btn-secondary"
              data-bs-dismiss="modal">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


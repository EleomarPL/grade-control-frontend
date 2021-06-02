import React from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'bootstrap';

import {notifySuccess, notifyError, notifyWarning} from '../consts/notify';
import {deleteQualification} from '../services/apis/qualification';

export const showModalStaticDelete = () => {
  let myModal = new Modal(
    document.getElementById('staticBackdrop2'), {
      backdrop: 'static',
      keyboard: true,
      focus: true
    }
  );
  myModal.show();
};
export const ModalConfirmDelete = ({ idQualificationDelete, setQualifications, qualifications }) => {
  const hideModalStatic = () => {
    let myModal = Modal.getInstance(
      document.getElementById('staticBackdrop2')
    );
    myModal.hide();
  };

  const executeDelete = () => {
    const getToken = window.localStorage.getItem('session');
    deleteQualification({token: JSON.parse(getToken), idQualification: idQualificationDelete}).
      then(response => {
        if (response.status === 204) {
          setQualifications(qualifications.filter((value) => value.id !== idQualificationDelete));
          notifySuccess('Calificación eliminada correctamente');
          hideModalStatic();
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
    <div className="modal fade" id="staticBackdrop2"
      data-bs-backdrop="static" data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Eliminar calificación
            </h5>
            <button type="button" className="btn-close"
              data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="pt-0 mt-0 pb-2 text-center">
              <strong
                style={ {fontSize: '1.5rem'} }
              >
                ¿Está seguro que lo desea eliminar?
              </strong>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              onClick={ executeDelete }
            >
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

ModalConfirmDelete.propTypes = {
  idQualificationDelete: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.string
  ]),
  qualifications: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.array
  ]),
  setQualifications: PropTypes.func.isRequired
};

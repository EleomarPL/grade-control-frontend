import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'bootstrap';

import { notifySuccess } from '../consts/notify';
import useQualification from '../hooks/useQualification';
import useHistory from '../hooks/useHistory';

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
  const [isLoading, setIsLoading] = useState(false);
  const { deleteQualification } = useQualification();
  const { createHistoryDelete } = useHistory();

  const hideModalStatic = () => {
    let myModal = Modal.getInstance(
      document.getElementById('staticBackdrop2')
    );
    myModal.hide();
  };

  const executeDelete = () => {
    const getToken = window.localStorage.getItem('session');
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
        hideModalStatic();
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
              disabled={ isLoading }
            >
              <span
                className={ `${isLoading ? 'spinner-border spinner-border-sm' : ''}` }
                role="status"
                aria-hidden="true"
              ></span>
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


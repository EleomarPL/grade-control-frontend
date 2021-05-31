import React from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'bootstrap';

import {dataQualification} from '../consts/qualification';
import {validationCreateQualification} from '../services/validations/validationQualification';
import {notifyInfo, notifySuccess, notifyError, notifyWarning} from '../consts/notify';
import {createQualification} from '../services/apis/qualification';

export const showModalStatic = () => {
  let myModal = new Modal(
    document.getElementById('staticBackdrop'), {
      backdrop: 'static',
      keyboard: true,
      focus: true
    }
  );
  myModal.show();
};
export const ModalAddQualification = ( { setQualifications, qualifications } ) => {

  const hideModalStatic = () => {
    let myModal = Modal.getInstance(
      document.getElementById('staticBackdrop')
    );
    myModal.hide();
  };

  const createNewQualification = (evt) => {
    evt.preventDefault();
    let dataQualification = {
      course: evt.target[0].value,
      unit: evt.target[1].value,
      score: evt.target[2].value,
      semester: evt.target[3].value
    };
    if (dataQualification.course.trim() === '' || dataQualification.unit.trim() === ''
      || dataQualification.score.trim() === '' || dataQualification.semester.trim() === '') {
      notifyInfo('Rellene todos los campos');
    } else {
      let validation = validationCreateQualification(dataQualification);
      if (validation) {
        dataQualification = {
          course: evt.target[0].value,
          unit: evt.target[1].value,
          score: evt.target[2].value,
          semester: evt.target[3].value
        };
        const getToken = window.localStorage.getItem('session');
        
        createQualification({dataQualification: dataQualification, token: JSON.parse(getToken)}).
          then(response => {
            notifySuccess('Calificación creada correctamente');
            setQualifications([
              ...qualifications,
              response.data
            ]);
            for (let i = 0 ; i < evt.target.length ; i++) {
              evt.target[i].value = '';
            }
            hideModalStatic();
          }).catch(err => {
            if (err.message === 'Network Error') {
              notifyError('No encontramos una conexión a internet');
            } else if (err.response.data.error === 'Token missing or invalid') {
              notifyWarning('Al parecer, perdiste los permisos, te recomiendo cerrar sesión');
            }
          });
      }
    }
  };

  return (
    <div className="modal fade" id="staticBackdrop"
      data-bs-backdrop="static" data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">Crear calificación 🌟🌟</h5>
            <button type="button" className="btn-close"
              data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="pt-0 mt-0 pb-2 text-center">
              <strong
                style={ {fontSize: '1.5rem'} }
              >
                Crear Calificación
              </strong>
            </div>
            <form onSubmit={ createNewQualification } id="form-qualification">
              
              {
                Object.keys(dataQualification).map(key => {
                  if (dataQualification[key] !== undefined) {
                    return <div className="d-flex flex-column pb-2" key={ key }>
                      <label htmlFor={ dataQualification[key].label }>
                        { dataQualification[key].label }
                      </label>
                      <input
                        type={ dataQualification[key].type }
                        className="py-3 w-100"
                        placeholder={ dataQualification[key].placeholder }
                        id={ dataQualification[key].label }
                      />
                      
                    </div>;
                  }
                })
              }
            </form>
          </div>
          <div className="modal-footer">
            
            <button
              type="submit"
              className="btn btn-primary"
              form="form-qualification"
            >
              Aceptar
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

ModalAddQualification.propTypes = {
  setQualifications: PropTypes.func.isRequired,
  qualifications: PropTypes.array.isRequired
};

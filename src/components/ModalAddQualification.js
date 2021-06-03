import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'bootstrap';

import {dataQualification} from '../consts/qualification';
import {validationCreateQualification} from '../services/validations/validationQualification';
import {notifyInfo, notifySuccess, notifyError, notifyWarning} from '../consts/notify';
import {createQualification, editQualification} from '../services/apis/qualification';
import {createHistory} from '../services/apis/history';

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
export const ModalAddQualification = ( { setQualifications, qualifications, dataToEdit, isCreated} ) => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let form = document.getElementById('form-qualification');
    if (!isCreated) {
      
      form[0].value = dataToEdit.course;
      form[1].value = dataToEdit.unit;
      form[2].value = dataToEdit.score;
      form[3].value = dataToEdit.semester;
    } else {
      form[0].value = '';
      form[1].value = '';
      form[2].value = '';
      form[3].value = '';
    }
  });

  const hideModalStatic = () => {
    let myModal = Modal.getInstance(
      document.getElementById('staticBackdrop')
    );
    myModal.hide();
  };

  const handleOperations = (evt) => {
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
        
        if (isCreated) {
          setIsLoading(true);
          createQualification({dataQualification: dataQualification, token: JSON.parse(getToken)}).
            then(response => {
              notifySuccess('Calificación creada correctamente');
              setQualifications([
                ...qualifications,
                response.data
              ]);
              createHistory({
                token: JSON.parse(getToken),
                dataHistory: {operation: `Se creó la materia ${response.data.course} con la
                  calificación ${response.data.score} de la unidad ${response.data.unit} del 
                  semestre ${response.data.semester}`}
              });
              setIsLoading(false);
              hideModalStatic();
            }).catch(err => {
              if (err.message === 'Network Error') {
                notifyError('No encontramos una conexión a internet');
              } else if (err.response.data.error === 'Token missing or invalid') {
                notifyWarning('Al parecer, perdiste los permisos, te recomiendo cerrar sesión');
              }
              setIsLoading(false);
            });
        } else {
          if (dataQualification.course === dataToEdit.course && Number(dataQualification.unit) === dataToEdit.unit &&
            Number(dataQualification.score) === dataToEdit.score && Number(dataQualification.semester) === dataToEdit.semester) {
            notifyInfo('Realmente no actualizo los datos, pero el trabajo esta hecho');
            hideModalStatic();
          } else {
            setIsLoading(true);
            editQualification({idQualification: dataToEdit.id, dataQualification: dataQualification, token: JSON.parse(getToken)}).
              then(response => {
                if (response.status === 200) {
                  notifySuccess('Calificación editada correctamente');
                }
                let updateQualificationsLocal = qualifications.map(value => {
                  if (value.id === response.data.id) {
                    return response.data;
                  }
                  return value;
                });
                setQualifications(updateQualificationsLocal);
                createHistory({
                  token: JSON.parse(getToken),
                  dataHistory: {operation: `Se modificaron datos de la materia ${dataToEdit.course} la
                  información cambiante fue,  
                  ${dataToEdit.course !== response.data.course ? 'materia: ' + response.data.course : '' }  
                  ${dataToEdit.unit !== response.data.unit ? 'unidad: ' + response.data.unit : '' } 
                  ${dataToEdit.score !== response.data.score ? 'calificación: ' + response.data.score : '' } 
                  ${dataToEdit.semester !== response.data.semester ? 'semestre: ' + response.data.semester : '' }`}
                });
                setIsLoading(false);
                hideModalStatic();
              }).catch(err => {
                if (err.message === 'Network Error') {
                  notifyError('No encontramos una conexión a internet');
                } else if (err.response.data.error === 'Token missing or invalid') {
                  notifyWarning('Al parecer, perdiste los permisos, te recomiendo cerrar sesión');
                }
                setIsLoading(false);
              });
          }
        }
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
            <h5 className="modal-title" id="staticBackdropLabel">
              {
                isCreated ? 'Crear ' : 'Editar '
              }calificación 🌟🌟
            </h5>
            <button type="button" className="btn-close"
              data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="pt-0 mt-0 pb-2 text-center">
              <strong
                style={ {fontSize: '1.5rem'} }
              >
                {
                  isCreated ? 'Crear ' : 'Editar '
                }Calificación
              </strong>
            </div>
            <form onSubmit={ handleOperations } id="form-qualification">
              
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
              <span
                className={ `${isLoading ? 'spinner-border spinner-border-sm' : ''}` }
                role="status"
                aria-hidden="true"
              ></span>
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
  qualifications: PropTypes.array.isRequired,
  isCreated: PropTypes.bool,
  dataToEdit: PropTypes.object
};

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'bootstrap';

import { validationCreateQualification } from '../services/validations/validationQualification';
import { notifyInfo } from '../consts/notify';
import useQualification from '../hooks/useQualification';
import SpinnerLoadingButton from './common/SpinnerLoadingButton';
import ComponentGrouper from './common/ComponentGrouper';

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
  const { createQualification, updateQualification } = useQualification();

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
        
        if (isCreated) {
          setIsLoading(true);
          createQualification({
            course: dataQualification.course, unit: dataQualification.unit,
            score: dataQualification.score, semester: dataQualification.semester
          }).then(res => {
            setIsLoading(false);
            if (res) {
              setQualifications([
                ...qualifications,
                res
              ]);
              hideModalStatic();
            }
          });
        } else {
          if (dataQualification.course === dataToEdit.course && Number(dataQualification.unit) === dataToEdit.unit &&
            Number(dataQualification.score) === dataToEdit.score && Number(dataQualification.semester) === dataToEdit.semester) {
            notifyInfo('Realmente no actualizo los datos, pero el trabajo esta hecho');
            hideModalStatic();
          } else {
            setIsLoading(true);
            updateQualification({
              course: dataQualification.course, unit: dataQualification.unit,
              score: dataQualification.score, semester: dataQualification.semester,
              idQualification: dataToEdit.id
            }).then(res => {
              setIsLoading(false);

              if (res) {
                let updateQualificationsLocal = qualifications.map(value => {
                  if (value.id === res.id) {
                    return res;
                  }
                  return value;
                });
                setQualifications(updateQualificationsLocal);
                hideModalStatic();
              }
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
              <div className="d-flex flex-column pb-2">
                <label htmlFor="course">
                  Materia
                </label>
                <input type="text" className="py-3 w-100"
                  placeholder="Ingrese el nombre de la materia"
                  id="course"
                />
              </div>
              <ComponentGrouper>
                <div className="d-flex flex-column pb-2">
                  <label htmlFor="unit">
                    Unidad
                  </label>
                  <input type="number" className="py-3 w-100"
                    placeholder="Ingrese la unidad"
                    id="unit"
                  />
                </div>
                <div className="d-flex flex-column pb-2">
                  <label htmlFor="score">
                    Calificación
                  </label>
                  <input type="number" className="py-3 w-100"
                    placeholder="Ingrese la calificación - 0-100"
                    id="score"
                  />
                </div>
              </ComponentGrouper>
              <div className="d-flex flex-column pb-2">
                <label htmlFor="semester">
                  Semestre
                </label>
                <input type="number" className="py-3 w-100"
                  placeholder="Ingrese el semestre"
                  id="semester"
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            
            <button
              type="submit"
              className="btn btn-primary"
              form="form-qualification"
              disabled={ isLoading }
            >
              { isLoading && <SpinnerLoadingButton /> }
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

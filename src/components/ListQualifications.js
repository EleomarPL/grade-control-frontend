import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {deleteQualification} from '../services/apis/qualification';
import {notifySuccess, notifyError, notifyWarning} from '../consts/notify';

const ListQualifications = ({qualifications, setQualifications}) => {
  const deleteThisQualification = (idQualification) => {
    const getToken = window.localStorage.getItem('session');
    deleteQualification({token: JSON.parse(getToken), idQualification: idQualification}).
      then(response => {
        if (response.status === 204) {
          setQualifications(qualifications.filter((value) => value.id !== idQualification));
          notifySuccess('Calificación eliminada correctamente');
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
    <Fragment>
      <table className="table text-center">
        <thead className="table-dark">
          <tr>
            <th scope="col">Materia</th>
            <th scope="col">Unidad</th>
            <th scope="col">Calificación</th>
            <th scope="col">Semestre</th>
            <th scope="col">Editar</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          { qualifications !== undefined && qualifications !== null &&
            qualifications.map(value =>
              <tr key={ value.id }>
                <th scope="row">{ value.course }</th>
                <td>{ value.unit }</td>
                <td>{ value.score }</td>
                <td>{ value.semester }</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                  >
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger w-100"
                    onClick={ () => deleteThisQualification(value.id) }
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </Fragment>
  );
};

ListQualifications.propTypes = {
  qualifications: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.array
  ]),
  setQualifications: PropTypes.func.isRequired
};

export default ListQualifications;
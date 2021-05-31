import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ListQualifications = (qualifications) => {
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
          { qualifications.qualifications !== undefined && qualifications.qualifications !== null &&
            qualifications.qualifications.map(value =>
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
  ])
};

export default ListQualifications;
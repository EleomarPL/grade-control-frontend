import PropTypes from 'prop-types';

import { showModalStatic } from '../components/ModalAddQualification';
import { showModalStaticDelete } from '../components/ModalConfirmDelete';

const ListQualifications = ({qualifications, setIsCreated, setDataToEdit, setIdQualificationDelete}) => {

  const deleteThisQualification = (idQualification) => {
    setIdQualificationDelete(idQualification);
    showModalStaticDelete();
  };

  const editQualification = (valueToEdit) => {
    setIsCreated(false);
    if (valueToEdit !== null) {
      setDataToEdit(valueToEdit);
      showModalStatic();
    }
  };
  return (
    <div className="table-responsive">
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
          { qualifications !== null && qualifications !== undefined &&
            qualifications.map((value, index) =>
              <tr key={ index }>
                <th scope="row">{ value.course }</th>
                <td>{ value.unit }</td>
                <td>{ value.score }</td>
                <td>{ value.semester }</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={ () => editQualification(value) }
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
    </div>
  );
};

ListQualifications.propTypes = {
  qualifications: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.array
  ]),
  setIsCreated: PropTypes.func,
  setDataToEdit: PropTypes.func,
  setIdQualificationDelete: PropTypes.func

};

export default ListQualifications;
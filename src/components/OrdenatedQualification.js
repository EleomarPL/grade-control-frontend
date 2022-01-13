import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import '../styles/ordenatedQualification.css';

const OrdenatedQualification = ({qualifications}) => {
  const [ordenatedQualification, setOrdenatedQualification] = useState(null);

  useEffect(() => {
    if (qualifications !== null ) {
      let objectSemester = [];
      let ordenated = [];
      for (let i ; i < 15 ; i++) {
        ordenated[i] = null;
      }
      qualifications.forEach(value => {
        objectSemester[value.semester - 1] = objectSemester[value.semester - 1] === undefined ? [value] : [...objectSemester[value.semester - 1], value];
      });

      objectSemester.forEach((array, index) => {
        let ordenatedBySemester = [];
        array.forEach(value => {
          let {unit, score} = value;
          let property = value.course.toLowerCase();
          if (ordenatedBySemester[property] === undefined) {
            ordenatedBySemester[property] = [{unit, score}];
          } else {
            let existUnit = false;
            ordenatedBySemester[property].forEach((value) => {
              if (unit === value.unit) {
                existUnit = true;
              }
            });
            if (existUnit) {
              let modifyParameter = property[0].toUpperCase() + property.slice(1);
              if (ordenatedBySemester[modifyParameter] === undefined) {
                ordenatedBySemester[modifyParameter] = [{unit, score}];
              } else {
                ordenatedBySemester[modifyParameter] = [...ordenatedBySemester[modifyParameter], {unit, score}];
              }
            } else {
              ordenatedBySemester[property] = [...ordenatedBySemester[property], {unit, score}];
            }
          }
          
        });
        ordenated[index] = ordenatedBySemester;
      });
      setOrdenatedQualification(ordenated);
    }
  }, [qualifications]);
  
  return (
    <>
      { ordenatedQualification !== null ?
        ordenatedQualification.map((array, generalIndex) => {
          if (array !== null) {
            return <div
              className="accordion"
              id="accordionExample"
              key={ generalIndex }
            >
              <div className="accordion-item">
                <h2 className="accordion-header" id={ `heading${generalIndex}` }>
                  <button className="accordion-button collapsed" type="button"
                    data-bs-toggle="collapse" data-bs-target={ `#collapse${generalIndex}` }
                    aria-expanded="false" aria-controls={ `collapse${generalIndex}` }>
                    { `Semestre ${generalIndex + 1}` }
                  </button>
                </h2>
                <div id={ `collapse${generalIndex}` } className="accordion-collapse collapse"
                  aria-labelledby={ `heading${generalIndex}` } data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <div className="table-responsive">
                      <table className="table text-center">
                        <thead className="table-dark">
                          <tr>
                            <th scope="col">Materia</th>
                            <th scope="col" colSpan="17">Unidades maximas : 15</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            Object.keys(array).map((key, indexArray) => {
                              return <tr key={ indexArray }>
                                <td>{ key }</td>
                                {
                                  array[key].sort((a, b) => (a['unit'] - b['unit']) * 1).map((object, indexObject) =>
                                    <td key={ indexObject }>
                                      <div className="d-flex flex-column">
                                        <div className="unit">Unidad { ` ${object.unit}` }</div>
                                        <div className={ `${object.score <= 69 ? 'reproved' : 'approved'}` }>
                                          { ` ${object.score}` }
                                        </div>
                                      </div>
                                    </td>
                                  )
                                }
                              </tr>;
                            })
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>;
          }
        })
        : <p>Sin registros</p>
      }
    </>
  );
};

OrdenatedQualification.propTypes = {
  qualifications: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.array
  ])
};

export default OrdenatedQualification;
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import '../styles/ordenatedQualification.css';
import { sortQualification } from '../utils/sortQualification';

const OrdenatedQualification = ({qualifications}) => {
  const [ordenatedQualification, setOrdenatedQualification] = useState([]);

  useEffect(() => {
    const ordenated = sortQualification({ qualifications });
    setOrdenatedQualification(ordenated);
  }, [qualifications]);
  
  return (
    <>
      {
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
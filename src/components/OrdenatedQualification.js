import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Collapse, Grid, Spacer, Table, Text } from '@nextui-org/react';

import { sortQualification } from '../utils/sortQualification';

const OrdenatedQualification = ({qualifications}) => {
  const [ordenatedQualification, setOrdenatedQualification] = useState([]);

  useEffect(() => {
    const ordenated = sortQualification({ qualifications });
    setOrdenatedQualification(ordenated);
  }, [qualifications]);
  
  return (
    <>
      <Collapse.Group splitted>
        {
          ordenatedQualification.map((array, generalIndex) => {
            if (array !== null) {
              return (
                <Collapse title={ `Semestre ${generalIndex + 1}` } expanded={ generalIndex === 0 }
                  subtitle="Has clic para ver todas las calificaciones de este semestre"
                  key={ generalIndex }
                >
                  <Table
                    aria-label="Lista de calificaciones"
                    css={ {
                      height: 'auto',
                      minWidth: '100%'
                    } }
                  >
                    <Table.Header>
                      <Table.Column>Materias</Table.Column>
                      <Table.Column>Unidades maxima: 15</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      {
                        Object.keys(array).map((key, indexArray) => {
                          return <Table.Row key={ `${indexArray}` }>
                            <Table.Cell>{ key }</Table.Cell>
                            <Table.Cell>
                              <Grid.Container gap={ 2 }
                                css={ {width: '100%'} }
                              >
                                <Grid sm={ 12 }>
                                  {
                                    array[key].sort((a, b) => (a['unit'] - b['unit']) * 1).map((object, indexObject) =>
                                      <Card key={ indexObject }
                                        css={ {margin: '0 10px'} }
                                      >
                                        <Card.Header>
                                          <Text b>Unidad { object.unit }</Text>
                                        </Card.Header>
                                        <Card.Divider />
                                        <Card.Body css={ { py: '$10' } }>
                                          <Text
                                            color={
                                              `${object.score >= 70 ? 'success' : 'error'}`
                                            }
                                            b
                                          >
                                            { object.score }
                                          </Text>
                                        </Card.Body>
                                      </Card>
                                     
                                    )
                                  }
                                </Grid>
                              </Grid.Container>
                            </Table.Cell>
                          </Table.Row>;
                        })
                      }
                    </Table.Body>
                  </Table>
                </Collapse>
              );
            }
          })
        }
      </Collapse.Group>
      <Spacer y={ 3 } />
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
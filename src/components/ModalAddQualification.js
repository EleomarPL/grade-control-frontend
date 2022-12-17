import { Modal, Button, Text, Input } from '@nextui-org/react';
import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { validationCreateQualification } from '../services/validations/validationQualification';
import { notifyInfo } from '../consts/notify';
import useQualification from '../hooks/useQualification';
import SpinnerLoadingButton from './common/SpinnerLoadingButton';
import ComponentGrouper from './common/ComponentGrouper';

export const ModalAddQualification = memo(function ModalAddQualification( {setQualifications, qualifications, dataToEdit, setDataToEdit, isCreated, visible, setVisible} ) {
  const [isLoading, setIsLoading] = useState(false);
  const [course, setCourse] = useState('');
  const [unit, setUnit] = useState('');
  const [semester, setSemester] = useState('');
  const [score, setScore] = useState('');

  const { createQualification, updateQualification } = useQualification();

  useEffect(() => {
    if (!isCreated) {
      setCourse(dataToEdit.course);
      setUnit(dataToEdit.unit);
      setScore(dataToEdit.score);
      setSemester(dataToEdit.semester);
    }
  }, [dataToEdit]);
  useEffect(() => {
    if (isCreated) {
      setCourse('');
      setUnit('');
      setScore('');
      setSemester('');
      setDataToEdit({});
    }
  }, [isCreated]);

  const handleHideModal = () => {
    setVisible(false);
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
              handleHideModal();
            }
          });
        } else {
          if (dataQualification.course === dataToEdit.course && Number(dataQualification.unit) === dataToEdit.unit &&
            Number(dataQualification.score) === dataToEdit.score && Number(dataQualification.semester) === dataToEdit.semester) {
            notifyInfo('Realmente no actualizo los datos, pero el trabajo esta hecho');
            handleHideModal();
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
                handleHideModal();
              }
            });
          }
        }
      }
    }
  };

  return (
    <Modal
      closeButton preventClose
      blur aria-labelledby="modal-title"
      open={ visible } width="600px"
      onClose={ handleHideModal }
    >
      <Modal.Header>
        <Text id="modal-title" size={ 18 }>
          { `${isCreated ? 'Crear ' : 'Editar '}` }
          <Text b size={ 18 }>
            calificación
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body as="form" id="formqualification"
        onSubmit={ handleOperations }
      >
        <Input
          value={ course } onChange={ (e) => setCourse(e.target.value) }
          label="Materia" placeholder="Ingresa el nombre de la materia"
          bordered fullWidth
          required
        />
        <ComponentGrouper>
          <Input
            value={ unit } onChange={ (e) => setUnit(e.target.value) }
            label="Unidad" placeholder="Ingresa la unidad"
            bordered fullWidth
            type="number" required
          />
          <Input
            value={ score } onChange={ (e) => setScore(e.target.value) }
            label="Calificación" placeholder="Calificación 0-100"
            bordered fullWidth
            type="number" required
          />
        </ComponentGrouper>
        <Input
          value={ semester } onChange={ (e) => setSemester(e.target.value) }
          label="Semestre" placeholder="Ingresa el semestre"
          bordered fullWidth
          type="number" required
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto
          shadow color="primary"
          type="submit"
          form="formqualification"
          disabled={ isLoading }
        >
          { isLoading && <SpinnerLoadingButton /> }
          Aceptar
        </Button>
        <Button auto flat
          type="button"
          shadow color="error"
          onPress={ handleHideModal }
        >
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

ModalAddQualification.propTypes = {
  setQualifications: PropTypes.func.isRequired,
  qualifications: PropTypes.array.isRequired,
  isCreated: PropTypes.bool,
  dataToEdit: PropTypes.object,
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  setDataToEdit: PropTypes.func
};

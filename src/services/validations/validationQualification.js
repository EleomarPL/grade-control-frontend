import { notifyInfo } from '../../consts/notify';

export const validationCreateQualification = (dataQualification) => {
  let isCorrectUserData = true;

  if ( dataQualification.course.length < 1 || dataQualification.course.length > 40) {
    notifyInfo('El tamaño para la materia debe ser mayor a 1 y menor que 41');
    isCorrectUserData = false;
  }

  if ( isNaN(dataQualification.unit)) {
    notifyInfo('Introduce una unidad valida');
    isCorrectUserData = false;
  } else {
    let unit = Number(dataQualification.unit);
    if ( unit < 1 || unit > 15) {
      notifyInfo('El rango de la unidad debe ser entre 1 y 15');
      isCorrectUserData = false;
    }
  }

  if ( isNaN(dataQualification.score)) {
    notifyInfo('Introduce una calificación valida');
    isCorrectUserData = false;
  } else {
    let score = Number(dataQualification.score);
    if ( score < 0 || score > 100) {
      notifyInfo('El rango de la calificación debe ser entre 0 y 100');
      isCorrectUserData = false;
    }
  }

  if ( isNaN(dataQualification.semester)) {
    notifyInfo('Introduce un semestre valido');
    isCorrectUserData = false;
  } else {
    let semester = Number(dataQualification.semester);
    if ( semester < 1 || semester > 15) {
      notifyInfo('El rango del semestre debe ser entre 1 y 15');
      isCorrectUserData = false;
    }
  }

  
  return isCorrectUserData;
};

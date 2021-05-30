/* eslint-disable no-useless-escape */
/* eslint-disable semi */
import {notify} from '../../consts/notify';

export const validationRegisterUser = (dataUser) => {
  let isCorrectUserData = true;
  let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  if ( dataUser.name.length < 2 || dataUser.name.length > 40) {
    notify('El tamaño para el nombre debe ser mayor a 1 y menor que 41');
    isCorrectUserData = false;
  }
  if ( dataUser.lastName.length < 2 || dataUser.lastName.length > 40) {
    notify('El tamaño para el apellido paterno debe ser mayor a 1 y menor que 41');
    isCorrectUserData = false;
  }
  if ( dataUser.motherLastName.length < 2 || dataUser.motherLastName.length > 40) {
    notify('El tamaño para el apellido materno debe ser mayor a 1 y menor que 41');
    isCorrectUserData = false;
  }
  if ( dataUser.phone.length < 10 || dataUser.phone.length > 14) {
    notify('El tamaño para el telefono debe ser mayor a 10 y menor que 41');
    isCorrectUserData = false;
  } else {
    let phone = Number(dataUser.phone);
    console.log(phone);
    if (isNaN(phone)) {
      notify('Ingresa bien tu número de telefono');
      isCorrectUserData = false;
    }
  }
  if ( dataUser.email.length < 10 || dataUser.email.length > 40) {
    notify('El tamaño para el correo debe ser mayor a 10 y menor que 41');
    isCorrectUserData = false;
  } else {
    if (!emailRegex.test(dataUser.email)) {
      notify('Ingresa un correo electronico valido');
      isCorrectUserData = false;
    }
  }
  if ( dataUser.userName.length < 6 || dataUser.userName.length > 40) {
    notify('El tamaño para el nombre de usuario debe ser mayor a 5 y menor que 40');
    isCorrectUserData = false;
  }
  if ( dataUser.password.length < 6 || dataUser.password.length > 40) {
    notify('El tamaño para la contraseña debe ser mayor a 5 y menor que 40');
    isCorrectUserData = false;
  }
  return isCorrectUserData;
};

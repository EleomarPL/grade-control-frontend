import React, { useState } from 'react';

import CustomizedInput from '../../components/CustomizedInput';
import {updatePasswordUser} from '../../services/apis/user';
import {notifySuccess, notifyWarning, notifyError, notifyInfo} from '../../consts/notify';

import '../../styles/login.css';
import ButtonBack from '../../components/ButtonBack';

const EditPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleUpdatePassword = (evt) => {
    evt.preventDefault();
    if (oldPassword.trim() === '' || newPassword.trim() === '' ||
      confirmNewPassword.trim() === '') {
      notifyInfo('Rellene todos los campos');
    } else {
      if ( newPassword.length < 6 || newPassword.length > 40 ||
        (confirmNewPassword.length < 6 || confirmNewPassword.length > 40) ) {
        notifyInfo('La contraseña debe ser mayor a 5 y menor que 40');
      } else if (newPassword === confirmNewPassword) {
        setIsLoading(true);
        const getToken = window.localStorage.getItem('session');
        updatePasswordUser({dataUser: {
          oldPassword,
          newPassword
        }, token: JSON.parse(getToken)}).then( () => {
          notifySuccess('Contraseña actualizado correctamente');
          setIsLoading(false);
          history.goBack();
        }).catch(err => {
          if (err.message === 'Request failed with status code 401') {
            notifyWarning('Tu contraseña actual no es valida');
          } else if (err.message === 'Network Error') {
            notifyError('No encontramos una conexión a internet');
          }
          setIsLoading(false);
        });
      } else {
        notifyInfo('Las contraseñas no coinciden');
      }
    }
  };
  return (
    <section
      className="section-form"
      style={ {height: '90vh'} }
    >
      <div className="d-flex flex-column form-container apply-border" >
        <ButtonBack />
        <form
          className="px-4 pb-4 pt-1 mx-4"
          onSubmit={ handleUpdatePassword }
        >
          <div>
            <p>
              <strong>Actualiza tu contraseña</strong>
            </p>
          </div>
          <div className="d-flex flex-column mt-4 pt-1">
            <CustomizedInput
              type="password"
              placeholder="Contraseña antigua"
              state={ oldPassword }
              setState={ setOldPassword }
              classNameIcon="bi bi-key-fill"
            />
            <CustomizedInput
              type="password"
              placeholder="Nueva contraseña"
              state={ newPassword }
              setState={ setNewPassword }
              classNameIcon="bi bi-lock"
            />
            <CustomizedInput
              type="password"
              placeholder="Nueva contraseña"
              state={ confirmNewPassword }
              setState={ setConfirmNewPassword }
              classNameIcon="bi bi-lock-fill"
            />
          </div>
          <div>
            <button className="btn btn-primary mt-3 w-100" type="submit">
              <span
                className={ `${isLoading ? 'spinner-border spinner-border-sm' : ''}` }
                role="status"
                aria-hidden="true"
              ></span>
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditPassword;
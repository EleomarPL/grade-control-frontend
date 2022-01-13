import React, { useState } from 'react';

import ButtonBack from '../components/ButtonBack';
import Logo from '../components/Logo';
import { dataUser } from '../consts/user';

import {
  notifyError, notifySuccess, notifyWarning, notifyInfo
} from '../consts/notify';
import { validationRegisterUser } from '../services/validations/validationUser';
import { createUser } from '../services/apis/user';

import '../styles/register.css';
import { useHistory } from 'react-router-dom';


const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const handleChangeData = (evt ) => {
    evt.preventDefault();

    let dataUser = {
      'name': evt.target[0].value,
      'lastName': evt.target[1].value,
      'motherLastName': evt.target[2].value,
      'phone': evt.target[3].value,
      'email': evt.target[4].value,
      'userName': evt.target[5].value,
      'password': evt.target[6].value
    };
    if (dataUser.name.trim() === '' || dataUser.lastName.trim() === ''
    || dataUser.motherLastName.trim() === '' || dataUser.phone.trim() === ''
    || dataUser.email.trim() === '' || dataUser.userName.trim() === ''
    || dataUser.password.trim() === '' || evt.target[7].value.trim() === '') {
      notifyInfo('Rellene todos los campos');
    } else if (evt.target[7].value === dataUser.password) {
      let isCorrectData = validationRegisterUser(dataUser);
      if (evt.target[7].value.length < 6 || evt.target[7].value.length > 40) {
        notifyInfo('El tamaño para confirmar la contraseña debe ser mayor a 5 y menor que 40');
        isCorrectData = false;
      }
      if (isCorrectData) {
        setIsLoading(true);
        createUser(dataUser).then( () => {
          notifySuccess('Usuario creado correctamente');
          setIsLoading(false);
          history.push('/');
        }).catch(err => {
          if (err.message === 'Request failed with status code 409') {
            notifyWarning('Ingresa un diferente nombre de usuario');
          }
          if (err.message === 'Network Error') {
            notifyError('No encontramos una conexión a internet');
          }
          setIsLoading(false);
        });
      }
    } else {
      notifyInfo('Las contraseñas no coinciden');
    }
  };
  return (
    <section>
      <div className="px-4 mx-1 pt-2">
        <Logo />
      </div>
      <div className="register-container m-auto py-3">
        <ButtonBack />
        <div className="container-register-data px-4 pt-2">
          <div className="indications">
            <strong style={ {fontSize: '1.8rem'} }>Registrar usuario</strong>
            <p className="pt-1">Hola, para registrarte debes rellenar los siguientes campos</p>
          </div>
          <form className="pt-2" onSubmit={ (evt) => handleChangeData(evt) }>
            {
              Object.keys(dataUser).map(key => {
                if (dataUser[key] !== undefined) {
                  return <div className="d-flex flex-column pb-2" key={ key }>
                    <label htmlFor={ dataUser[key].label }>
                      { dataUser[key].label }
                    </label>
                    { dataUser[key].type === 'textarea'
                      ? <textarea
                        placeholder={ dataUser[key].placeholder }
                        id={ dataUser[key].label }
                        style={ {height: '10rem'} }
                      />
                      : <input
                        type={ dataUser[key].type }
                        className="py-3"
                        placeholder={ dataUser[key].placeholder }
                        id={ dataUser[key].label }
                      />
                    }
                  </div>;
                }
              })
            }
            <div className="d-flex flex-column pb-2">
              <label htmlFor="confirm-password">
                Confirmar contraseña
              </label>
              <input
                type="password"
                className="py-3"
                placeholder="Confirma tu contraseña"
                id="confirm-password"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary save mb-3 px-3 py-2"
              style={ {fontSize: '1.3rem'} }
            >
              <span
                className={ `${isLoading ? 'spinner-border spinner-border-sm' : ''}` }
                role="status"
                aria-hidden="true"
              ></span>
              Registrar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
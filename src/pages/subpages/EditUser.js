import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import ButtonBack from '../../components/ButtonBack';
import { dataUser } from '../../consts/user';

import {
  notifyError, notifySuccess, notifyWarning, notifyInfo
} from '../../consts/notify';
import { validationRegisterUser } from '../../services/validations/validationUser';
import { getDataUser, updateDataUser } from '../../services/apis/user';
import Auth from '../../context/Auth';

import '../../styles/register.css';



const EditUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {setUserData} = useContext(Auth);

  useEffect(() => {
    const getToken = window.localStorage.getItem('session');
    getDataUser({token: JSON.parse(getToken)}).then(response => {
      let form = document.getElementById('form-data-user');
      form[0].value = response.data.name;
      form[1].value = response.data.lastName;
      form[2].value = response.data.motherLastName;
      form[3].value = response.data.phone;
      form[4].value = response.data.email;
      form[5].value = response.data.userName;
      
    }).catch(err => {
      if (err.message === 'Network Error') {
        notifyError('No encontramos una conexión a internet');
      } else if (err.response.data.error === 'Token missing or invalid') {
        notifyWarning('Al parecer, perdiste los permisos, te recomiendo cerrar sesión');
      }
    });
  }, []);

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
    || dataUser.email.trim() === '' || dataUser.userName.trim() === '') {
      notifyInfo('Rellene todos los campos');
    } else {
      let isCorrectData = validationRegisterUser(dataUser, true);
      if (isCorrectData) {
        setIsLoading(true);
        const getToken = window.localStorage.getItem('session');
        updateDataUser({dataUser: dataUser, token: JSON.parse(getToken)}).then( (response) => {
          notifySuccess('Usuario actualizado correctamente');
          setIsLoading(false);
          setUserData({
            name: response.data.name,
            lastName: response.data.lastName,
            motherLastName: response.data.motherLastName,
            phone: response.data.phone,
            email: response.data.email,
            userName: response.data.userName
          });
          history.goBack();
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
    }
  };
  return (
    <section>
      <div className="register-container m-auto py-3">
        <ButtonBack />
        <div className="container-register-data px-4 pt-2">
          <div className="indications">
            <strong style={ {fontSize: '1.8rem'} }>Editar mis datos</strong>
            <p className="pt-1">Hola, para editar, solo basta con cambiar lo necesario</p>
          </div>
          <form className="pt-2" onSubmit={ (evt) => handleChangeData(evt) }
            id="form-data-user"
          >
            {
              Object.keys(dataUser).map((key, index, completeArray) => {
                if (dataUser[key] !== undefined && completeArray.length - 1 !== index) {
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
              Actualizar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditUser;
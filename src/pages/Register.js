import React from 'react';

import ButtonBack from '../components/ButtonBack';
import Logo from '../components/Logo';
import {dataUser} from '../consts/user';

// import {notify} from '../consts/notify';
import {validationRegisterUser} from '../services/validations/validationUser';

import '../styles/register.css';

const Register = () => {
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
    
    let isCorrectData = validationRegisterUser(dataUser);
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
            <button
              type="submit"
              className="btn btn-primary save mb-3 px-3 py-2"
              style={ {fontSize: '1.3rem'} }
            >
              Registrar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
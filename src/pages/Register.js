import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonBack from '../components/ButtonBack';
import Logo from '../components/Logo';
import { notifyInfo } from '../consts/notify';
import { validationRegisterUser } from '../services/validations/validationUser';
import useUser from '../hooks/useUser';

import {
  ButtonSave, ContainerRegister,
  ContainerRegisterData, FormContainer, Indication
} from '../stylesComponents/registerStyles';
import ComponentGrouper from '../components/common/ComponentGrouper';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { createUser } = useUser();

  const navigate = useNavigate();

  const handleChangeData = (evt ) => {
    evt.preventDefault();

    let dataUser = {
      name: evt.target[0].value.trim(),
      lastName: evt.target[1].value.trim(),
      motherLastName: evt.target[2].value.trim(),
      phone: evt.target[3].value.trim(),
      email: evt.target[4].value.trim(),
      userName: evt.target[5].value.trim(),
      password: evt.target[6].value.trim()
    };
    if (!(dataUser.name && dataUser.lastName &&
      dataUser.motherLastName && dataUser.phone &&
      dataUser.email && dataUser.userName &&
      dataUser.password && evt.target[7].value
    )) {
      notifyInfo('Rellene todos los campos');
    } else if (evt.target[7].value === dataUser.password) {
      let isCorrectData = validationRegisterUser(dataUser);
      if (evt.target[7].value.length < 6 || evt.target[7].value.length > 40) {
        notifyInfo('El tamaño para confirmar la contraseña debe ser mayor a 5 y menor que 40');
        isCorrectData = false;
      }
      if (isCorrectData) {
        setIsLoading(true);

        createUser({
          name: dataUser.name, lastName: dataUser.lastName,
          motherLastName: dataUser.motherLastName,
          phone: dataUser.phone, email: dataUser.email,
          userName: dataUser.userName, password: dataUser.password
        }).then(res => {
          setIsLoading(false);
          if (res) navigate('/');
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
      <ContainerRegister className="m-auto py-3">
        <ButtonBack />
        <ContainerRegisterData className="px-4 pt-2">
          <Indication>
            <strong style={ {fontSize: '1.8rem'} }>Registrar usuario</strong>
            <p className="pt-1">Hola, para registrarte debes rellenar los siguientes campos</p>
          </Indication>
          <FormContainer className="pt-2" onSubmit={ (evt) => handleChangeData(evt) }>
            <ComponentGrouper>
              <div className="d-flex flex-column pb-2">
                <label htmlFor="name">
                  Nombre:
                </label>
                <input type="text"
                  placeholder="Ingresa tu nombre" className="py-3"
                  id="name"
                />
              </div>
            </ComponentGrouper>
            <ComponentGrouper>
              <div className="d-flex flex-column pb-2">
                <label htmlFor="lastname">
                  Apellido Paterno:
                </label>
                <input type="text"
                  placeholder="Ingresa tu apellido paterno" className="py-3"
                  id="lastname"
                />
              </div>
              <div className="d-flex flex-column pb-2">
                <label htmlFor="motherlastname">
                  Apellido Materno:
                </label>
                <input type="text"
                  placeholder="Ingresa tu apellido materno" className="py-3"
                  id="motherlastname"
                />
              </div>
            </ComponentGrouper>
            <ComponentGrouper>
              <div className="d-flex flex-column pb-2">
                <label htmlFor="phone">
                  Telefono:
                </label>
                <input type="tel"
                  placeholder="Ingresa tu telefono" className="py-3"
                  id="phone"
                />
              </div>
              <div className="d-flex flex-column pb-2">
                <label htmlFor="email">
                  Correo Electronico:
                </label>
                <input type="email"
                  placeholder="Ingresa tu correo electronico" className="py-3"
                  id="email"
                />
              </div>
            </ComponentGrouper>
            <ComponentGrouper>
              <div className="d-flex flex-column pb-2">
                <label htmlFor="user">
                  Usuario:
                </label>
                <input type="text"
                  placeholder="Ingresa tu usuario" className="py-3"
                  id="user"
                />
              </div>
            </ComponentGrouper>
            <ComponentGrouper>
              <div className="d-flex flex-column pb-2">
                <label htmlFor="password">
                  Contraseña:
                </label>
                <input type="password"
                  placeholder="Ingresa tu contraseña" className="py-3"
                  id="password"
                />
              </div>
              <div className="d-flex flex-column pb-2">
                <label htmlFor="confirmpassword">
                  Confirmar Contraseña:
                </label>
                <input type="password"
                  placeholder="Confirma tu contraseña" className="py-3"
                  id="confirmpassword"
                />
              </div>
            </ComponentGrouper>
            <ButtonSave
              type="submit"
              className="btn btn-primary mb-3 px-3 py-2"
              style={ {fontSize: '1.3rem'} }
              disabled={ isLoading }
            >
              <span
                className={ `${isLoading ? 'spinner-border spinner-border-sm' : ''}` }
                role="status"
                aria-hidden="true"
              ></span>
              Registrar
            </ButtonSave>
          </FormContainer>
        </ContainerRegisterData>
      </ContainerRegister>
    </section>
  );
};

export default Register;
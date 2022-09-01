import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonBack from '../../components/ButtonBack';
import { notifyInfo } from '../../consts/notify';
import { validationRegisterUser } from '../../services/validations/validationUser';
import useUser from '../../hooks/useUser';
import ComponentGrouper from '../../components/common/ComponentGrouper';
import SpinnerLoadingButton from '../../components/common/SpinnerLoadingButton';

import {
  ButtonSave, ContainerRegister,
  ContainerRegisterData, FormContainer, Indication
} from '../../stylesComponents/registerStyles';

const EditUser = () => {
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const nameInputRef = useRef({});
  const lastnameInputRef = useRef({});
  const motherLastnameInputRef = useRef({});
  const phoneInputRef = useRef({});
  const emailInputRef = useRef({});
  const userInputRef = useRef({});

  const { getDataUser, updateDataUser } = useUser();

  useEffect(() => {
    getDataUser().then(res => {
      setIsLoadingInitial(false);
      if (res) {
        nameInputRef.current.value = res.name;
        lastnameInputRef.current.value = res.lastName;
        motherLastnameInputRef.current.value = res.motherLastName;
        phoneInputRef.current.value = res.phone;
        emailInputRef.current.value = res.email;
        userInputRef.current.value = res.userName;
      }
    });
  }, []);

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
      dataUser.email && dataUser.userName
    )) {
      notifyInfo('Rellene todos los campos');
    } else {
      let isCorrectData = validationRegisterUser(dataUser, true);
      if (isCorrectData) {
        setIsLoading(true);

        updateDataUser({
          name: dataUser.name, lastName: dataUser.lastName,
          motherLastName: dataUser.motherLastName,
          phone: dataUser.phone, email: dataUser.email,
          password: dataUser.password, userName: dataUser.userName
        }).then(res => {
          setIsLoading(false);
          if (res) navigate(-1);
        });
      }
    }
  };
  return (
    <section>
      <ContainerRegister className="m-auto py-3">
        <ButtonBack />
        <ContainerRegisterData className="px-4 pt-2">
          <Indication>
            <strong style={ {fontSize: '1.8rem'} }>Editar mis datos</strong>
            <p className="pt-1">Hola, para editar, solo basta con cambiar lo necesario</p>
          </Indication>
          <FormContainer className="pt-2" onSubmit={ (evt) => handleChangeData(evt) }
            id="form-data-user"
          >
            { isLoadingInitial && <SpinnerLoadingButton /> }
            <ComponentGrouper>
              <div className="d-flex flex-column pb-2">
                <label htmlFor="name">
                  Nombre:
                </label>
                <input type="text"
                  placeholder="Ingresa tu nombre" className="py-3"
                  id="name" ref={ nameInputRef }
                  disabled={ isLoadingInitial }
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
                  id="lastname" ref={ lastnameInputRef }
                  disabled={ isLoadingInitial }
                />
              </div>
              <div className="d-flex flex-column pb-2">
                <label htmlFor="motherlastname">
                  Apellido Materno:
                </label>
                <input type="text"
                  placeholder="Ingresa tu apellido materno" className="py-3"
                  id="motherlastname" ref={ motherLastnameInputRef }
                  disabled={ isLoadingInitial }
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
                  id="phone" ref={ phoneInputRef }
                  disabled={ isLoadingInitial }
                />
              </div>
              <div className="d-flex flex-column pb-2">
                <label htmlFor="email">
                  Correo Electronico:
                </label>
                <input type="email"
                  placeholder="Ingresa tu correo electronico" className="py-3"
                  id="email" ref={ emailInputRef }
                  disabled={ isLoadingInitial }
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
                  id="user" ref={ userInputRef }
                  disabled={ isLoadingInitial }
                />
              </div>
            </ComponentGrouper>
            <ButtonSave
              type="submit"
              className="btn btn-primary mb-3 px-3 py-2"
              style={ {fontSize: '1.3rem'} }
              disabled={ isLoading || isLoadingInitial }
            >
              { isLoading && <SpinnerLoadingButton /> }
              Actualizar
            </ButtonSave>
          </FormContainer>
        </ContainerRegisterData>
      </ContainerRegister>
    </section>
  );
};

export default EditUser;
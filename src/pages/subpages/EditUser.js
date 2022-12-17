import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Container, Input, Text } from '@nextui-org/react';

import ButtonBack from '../../components/ButtonBack';
import { notifyInfo } from '../../consts/notify';
import { validationRegisterUser } from '../../services/validations/validationUser';
import useUser from '../../hooks/useUser';
import ComponentGrouper from '../../components/common/ComponentGrouper';
import SpinnerLoadingButton from '../../components/common/SpinnerLoadingButton';

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
      <ContainerRegister fluid>
        <ButtonBack />
        <ContainerRegisterData>
          <Indication>
            <Text h2 size="$2xl">Editar mis datos</Text>
            <Text css={ { paddingBottom: '10px' } }>
              Hola, para editar, solo basta con cambiar lo necesario
            </Text>
          </Indication>
          <FormContainer onSubmit={ (evt) => handleChangeData(evt) }
            id="form-data-user"
          >
            { isLoadingInitial && <SpinnerLoadingButton /> }
            <ComponentGrouper>
              <Input label="Nombre" placeholder="Ingresa tu nombre"
                bordered fullWidth
                ref={ nameInputRef } required
              />
              <Input label="Apellido paterno" placeholder="Ingresa tu apellido paterno"
                bordered fullWidth
                ref={ lastnameInputRef } required
              />
            </ComponentGrouper>
            <ComponentGrouper>
              <Input label="Apellido materno" placeholder="Ingresa tu apellido materno"
                bordered fullWidth
                ref={ motherLastnameInputRef } required
              />
              <Input label="Telefono" placeholder="Ingresa tu telefono"
                bordered fullWidth
                ref={ phoneInputRef } required
                type="number"
              />
            </ComponentGrouper>
            <ComponentGrouper>
              <Input label="Correo electronico" placeholder="Ingresa tu correo electronico"
                bordered fullWidth
                ref={ emailInputRef } required
                type="email"
              />
              <Input label="Usuario" placeholder="Ingresa tu usuario"
                bordered fullWidth
                ref={ userInputRef } required
              />
            </ComponentGrouper>
            <Button shadow color="primary"
              type="submit"
              disabled={ isLoading || isLoadingInitial }
              css={ { px: '$13', marginTop: '1rem' } }
              auto size="lg"
            >
              { isLoading && <SpinnerLoadingButton /> }
              Actualizar
            </Button>
          </FormContainer>
        </ContainerRegisterData>
      </ContainerRegister>
    </section>
  );
};


const FormContainer = styled.form`
  padding-left: 1rem;

  @media only screen and (max-width: 600px) {
    padding: 0;
  }
`;
const ContainerRegister = styled(Container)`
  width: 70%;
  @media only screen and (max-width: 900px) {
    width: 80%;
  }
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;
const ContainerRegisterData = styled.div`
  border: solid 1.5px #8a8a8a;
  border-radius: 10px;
  background: white;
  padding: 10px 1rem;

  @media only screen and (max-width: 600px) {
    border: none;
  }
`;
const Indication = styled.div`
  @media only screen and (max-width: 600px) {
    text-align: center;
  }
`;

export default EditUser;
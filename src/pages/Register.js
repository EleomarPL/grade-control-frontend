import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Input, Text } from '@nextui-org/react';
import styled from 'styled-components';

import ButtonBack from '../components/ButtonBack';
import Logo from '../components/Logo';
import { notifyInfo } from '../consts/notify';
import { validationRegisterUser } from '../services/validations/validationUser';
import useUser from '../hooks/useUser';
import ComponentGrouper from '../components/common/ComponentGrouper';
import SpinnerLoadingButton from '../components/common/SpinnerLoadingButton';

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
    <Container>
      <Logo />
      <ContainerRegister fluid>
        <ButtonBack />
        <ContainerRegisterData>
          <Indication>
            <Text h2 size="$2xl">Registrar usuario</Text>
            <Text css={ { paddingBottom: '10px' } }>
              Hola, para registrarte debes rellenar los siguientes campos
            </Text>
          </Indication>
          <FormContainer onSubmit={ handleChangeData }>
            <ComponentGrouper>
              <Input label="Nombre" placeholder="Ingresa tu nombre"
                bordered fullWidth
              />
              <Input label="Apellido paterno" placeholder="Ingresa tu apellido paterno"
                bordered fullWidth
              />
            </ComponentGrouper>
            <ComponentGrouper>
              <Input label="Apellido materno" placeholder="Ingresa tu apellido materno"
                bordered fullWidth
              />
              <Input label="Telefono" placeholder="Ingresa tu telefono"
                bordered fullWidth
              />
            </ComponentGrouper>
            <ComponentGrouper>
              <Input label="Correo electronico" placeholder="Ingresa tu correo electronico"
                bordered fullWidth
              />
              <Input label="Usuario" placeholder="Ingresa tu usuario"
                bordered fullWidth
              />
            </ComponentGrouper>
            <ComponentGrouper>
              <Input label="Contraseña" placeholder="Ingresa tu contraseña"
                bordered fullWidth
              />
              <Input label="Confirmar contraseña" placeholder="Confirma tu contraseña"
                bordered fullWidth
              />
            </ComponentGrouper>
            <Button shadow color="primary"
              type="submit"
              disabled={ isLoading }
              css={ { px: '$13', margin: '1rem auto 0 auto' } }
              auto size="lg"
            >
              { isLoading && <SpinnerLoadingButton /> }
              Registrar
            </Button>
          </FormContainer>
        </ContainerRegisterData>
      </ContainerRegister>
    </Container>
  );
};

const FormContainer = styled.form`
  padding-left: 1rem;

  @media only screen and (max-width: 600px) {
    padding: 0;
  }
`;
const ContainerRegister = styled(Container)`
  width: 80%;
  @media only screen and (max-width: 900px) {
    width: 90%;
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

export default Register;
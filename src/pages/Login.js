import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Text } from '@nextui-org/react';

import useLogin from '../hooks/useLogin';
import CustomizedInput from '../components/CustomizedInput';
import Logo from '../components/Logo';
import { notifyInfo } from '../consts/notify';
import SpinnerLoadingButton from '../components/common/SpinnerLoadingButton';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useLogin();

  const handleLogin = (evt) => {
    evt.preventDefault();

    if (userName.trim() === '' || password.trim === '') {
      notifyInfo('Rellene todos los campos');
    } else {
      setIsLoading(true);
      login({userName, password, setState: setIsLoading});
    }
  };

  return (
    <ContainerSection>
      <BorderContainer>
        <Form onSubmit={ handleLogin }>
          <Logo />
          <div>
            <Text h2 size="$xl">Inserta tus datos, y accede para gestionar tus calificaciones</Text>
            <Text h3
              style={ {
                fontSize: '1rem', fontWeight: 'normal',
                padding: '5px 0'
              } }
            >
              Controla tus calificaciones, de una manera personalizada y en la nube
            </Text>
          </div>
          <div style={ { marginTop: '10px' } }>
            <CustomizedInput
              type="text" placeholder="Usuario"
              state={ userName } setState={ setUserName }
              classNameIcon="bi bi-person-fill"
            />
            <CustomizedInput
              type="password" placeholder="Contraseña"
              state={ password } setState={ setPassword }
              classNameIcon="bi bi-lock-fill"
            />
          </div>
          <Button shadow color="primary"
            type="submit"
            disabled={ isLoading }
            css={ { px: '$13' } }
            auto style={ { width: '100%' } }
          >
            { isLoading && <SpinnerLoadingButton /> }
            Iniciar ahora
          </Button>
          <Text css={ { textAlign: 'center', paddingTop: '0.6rem' } }>Todavía no tienes cuenta?<Text span>
            <Link to="/register"> Registrate aquí</Link>
          </Text></Text>
        </Form>
      </BorderContainer>
    </ContainerSection>
  );
};

const ContainerSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #EDEDE9;
`;
const BorderContainer = styled.div`
  background: #F8F9FA;
  width: 40%;

  border: solid 1.5px #8a8a8a;
  border-radius: 10px;
  @media only screen and (max-width: 900px) {
    width: 55%;
  }
  @media only screen and (max-width: 700px) {
    width: 100%;
    border: 0;
  }
`;
const Form = styled.form`
  margin: 2rem;
  padding: 10px;
`;

export default Login;
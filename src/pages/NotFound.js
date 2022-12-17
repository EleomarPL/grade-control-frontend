import { Button, Text } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Logo from '../components/Logo';

const NotFound = () => {

  return (
    <ContainerSection>
      <BorderContainer>
        <div>
          <Logo />
          <div>
            <Text h1 size="$xl">Error 404. La página solicitada no existe</Text>
            <Text b
              style={ {
                fontSize: '1rem', fontWeight: 'normal',
                padding: '5px 0'
              } }
            >
              La página a la que intento navegar no existe dentro del sitio gestiocal.
            </Text>
          </div>
          <Button css={ {margin: '1rem 0'} }
            color="primary" shadow
            as={ Link } to="/"
          >
            Ir al inicio
          </Button>
        </div>
      </BorderContainer>
    </ContainerSection>
  );
};

const BorderContainer = styled.div`
  background: #F8F9FA;
  width: 40%;

  border: solid 1.5px #8a8a8a;
  border-radius: 10px;

  margin: 2rem;
  padding: 10px;
  @media only screen and (max-width: 900px) {
    width: 55%;
  }
  @media only screen and (max-width: 700px) {
    width: 100%;
    border: 0;
  }
`;
const ContainerSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #EDEDE9;
`;

export default NotFound;
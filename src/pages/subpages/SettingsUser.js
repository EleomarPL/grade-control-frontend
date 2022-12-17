import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Container, Grid, Table, Text } from '@nextui-org/react';

import Auth from '../../context/Auth';
import { ModalDeleteAccount } from '../../components/ModalDeleteAccount';

const SettingsUser = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const {userData} = useContext(Auth);
  const navigate = useNavigate();

  const showModalConfirm = () => {
    setVisibleModal(true);
  };

  let traslationToSpanish = {
    name: 'Nombre',
    lastName: 'Apellido paterno',
    motherLastName: 'Apellido materno',
    phone: 'Telefono',
    email: 'Correo electronico',
    userName: 'Usuario'
  };

  return (
    <section>
      <SettingsContainer fluid>
        <SettingsContainerData className="container-settings-data px-4 pt-2">
          <Grid.Container gap={ 2 }
            css={ {width: '100%'} }
          >
            <Grid sm={ 12 } justify="space-between"
              css={ {margin: 'auto auto'} }
            >
              <Indication className="indications">
                <Text h2 size="$2xl">Tus datos</Text>
                <Text css={ { paddingBottom: '10px' } }>
                  Hola, estos son tus datos actuales
                </Text>
              </Indication>
              <Button as={ Link } color="secondary"
                auto to="/home/edit"
                css={ {margin: 'auto 0'} } shadow
              >
                Editar mis datos
              </Button>
            </Grid>
          </Grid.Container>
          <Table
            aria-label="Datos usuario"
            css={ {
              height: 'auto',
              minWidth: '100%'
            } }
          >
            <Table.Header>
              <Table.Column>Dato</Table.Column>
              <Table.Column>Dato</Table.Column>
            </Table.Header>
            <Table.Body>
              { userData !== null &&
                  Object.keys(userData).map((key, index) =>
                    <Table.Row className="text-left mx-2" key={ index }>
                      <Table.Cell style={ {opacity: '0.5'} }>
                        <Text>{ traslationToSpanish[key] }</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text>{ userData[key] }</Text>
                      </Table.Cell>
                    </Table.Row>
                  )
              }
            </Table.Body>
          </Table>
          <Container gap={ 2 }
            css={ {width: '100%'} }
          >
            <Button color="warning"
              shadow auto
              onPress={ () => navigate('/home/editpassword') }
              css={ {margin: '10px 0'} }
            >
              Cambiar mi contraseña
            </Button>
            <Button color="error"
              shadow css={ {margin: '10px 0'} }
              auto
              onPress={ showModalConfirm }
            >
              Eliminar mi cuenta
            </Button>
          </Container>
        </SettingsContainerData>
      </SettingsContainer>
      <ModalDeleteAccount
        setVisible={ setVisibleModal }
        visible={ visibleModal }
      />
    </section>
  );
};

const SettingsContainer = styled(Container)`
  width: 70%;
  margin: 1rem auto;

  @media only screen and (max-width: 900px) {
    width: 80%;
  }
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;
const SettingsContainerData = styled.div`
  border: solid 1.5px #8a8a8a;
  border-radius: 10px;
  background: white;

  @media only screen and (max-width: 600px) {
    border: none;
  }
`;
const Indication = styled.div`
  @media only screen and (max-width: 600px) {
    text-align: center;
  }
`;


export default SettingsUser;
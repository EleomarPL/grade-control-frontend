import { Avatar, Dropdown, Text } from '@nextui-org/react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import Auth from '../context/Auth';
import Icon from './Icon';

const OptionsUser = () => {
  const { userData, setUserData } = useContext(Auth);

  const logout = (type) => {
    if (type === 'logout') {
      window.localStorage.clear();
      setUserData(null);
    }
  };
  return (
    <Dropdown placement="bottom-left">
      <Dropdown.Button css={ {backgroundColor: 'transparent', overflow: 'unset'} }>
        <Avatar
          bordered
          size="lg"
          as="span"
          text={ userData.name }
          color="gradient"
          textColor="white"
        />
      </Dropdown.Button>
      <Dropdown.Menu color="secondary" aria-label="Avatar Actions"
        onAction={ type => logout(type) }
      >
        <Dropdown.Item key="profile"
          css={ { height: '$18', overflow: 'hidden' } }
          textValue="Datos usuario"
        >
          <Text b color="inherit"
            css={ { d: 'flex' } }>
            { userData.name }
          </Text>
          <Text b color="inherit"
            css={ { d: 'flex' } }>
            { userData.email }
          </Text>
        </Dropdown.Item>
        <Dropdown.Item key="settings" withDivider
          icon={ <Icon classNameIcon="bi-gear" /> }
          textValue="Configuración"
        >
          <Link to="settings" style={ {color: 'inherit'} }>
            Configuración
          </Link>
        </Dropdown.Item>
        <Dropdown.Item key="history"
          icon={ <Icon classNameIcon="bi-clock-history" /> }
          textValue="Historial"
        >
          <Link to="history" style={ {color: 'inherit'} }>
            Historial
          </Link>
        </Dropdown.Item>
        <Dropdown.Item key="logout" color="error"
          withDivider type="button"
          icon={ <Icon classNameIcon="bi-box-arrow-left" /> }
          variant="shadow"
          textValue="Cerrar sesión"
        >
          Cerrar sesión
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default OptionsUser;
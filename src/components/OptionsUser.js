import { useContext } from 'react';
import { Link } from 'react-router-dom';

import Auth from '../context/Auth';

import { ButtonDropdown, DropdownMenu } from '../stylesComponents/optionUserStyles';
import Icon from './Icon';

const OptionsUser = () => {
  const { userData, setUserData } = useContext(Auth);

  const logout = () => {
    window.localStorage.clear();
    setUserData(null);
  };
  return (
    <>
      <div className="dropdown">
        <ButtonDropdown
          className="dropdown-toggle button-user"
          type="button" id="dropdownMenuButton2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-person-circle"></i>
        </ButtonDropdown>
        <DropdownMenu
          className="dropdown-menu text-center px-3"
          aria-labelledby="dropdownMenuButton2"
          style={ {fontSize: '1.1rem'} }
        >
          <li><i className="bi bi-person-circle" style={ {fontSize: '2.5rem'} }></i></li>
          <li>{ userData.name }</li>
          <li className="py-1">{ userData.email }</li>
          <li><hr className="dropdown-divider" /></li>
          <li className="pb-2">
            <Link
              to="settings"
              end
              className="text-dark text-decoration-none w-100"
            >
              <Icon classNameIcon="bi-gear" />
              Configuración
            </Link>
          </li>
          <li className="pb-2">
            <Link
              to="history"
              end
              className="text-dark text-decoration-none w-100"
            >
              <Icon classNameIcon="bi-clock-history" />
              Historial
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="btn text-danger w-100"
              onClick={ logout }
            >
              <Icon classNameIcon="bi-box-arrow-left" />
              Cerrar sesión
            </button>
          </li>
        </DropdownMenu>
      </div>
    </>
  );
};

export default OptionsUser;
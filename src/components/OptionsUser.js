import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import Auth from '../context/Auth';

import { ButtonDropdown, DropdownMenu } from '../stylesComponents/optionUserStyles';

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
            <NavLink
              to={ 'settings' }
              end
              className="btn btn-primary w-100"
            >
              <i className="bi bi-gear"> </i>
              Configuración
            </NavLink>
          </li>
          <li className="pb-2">
            <NavLink
              to={ '/home/history' }
              end
              className="btn btn-secondary w-100"
            >
              <i className="bi bi-clock-history"> </i>
              Historial
            </NavLink>
          </li>
          <li>
            <button
              type="button"
              className="btn btn-danger w-100"
              onClick={ logout }
            >
              Cerrar sesión
            </button>
          </li>
        </DropdownMenu>
      </div>
    </>
  );
};

export default OptionsUser;
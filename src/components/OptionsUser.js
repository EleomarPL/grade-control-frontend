import React, { Fragment, useContext } from 'react';

import '../styles/optionsUser.css';
import Auth from '../context/Auth';

const OptionsUser = () => {
  const {userData, setUserData} = useContext(Auth);

  const logout = () => {
    window.localStorage.clear();
    setUserData(null);
  };
  return (
    <Fragment>
      <div className="dropdown">
        <button
          className="dropdown-toggle button-user"
          type="button" id="dropdownMenuButton2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-person-circle"></i>
        </button>
        <ul
          className="dropdown-menu text-center px-3"
          aria-labelledby="dropdownMenuButton2"
          style={ {fontSize: '1.1rem'} }
        >
          <li><i className="bi bi-person-circle" style={ {fontSize: '2.5rem'} }></i></li>
          <li>{ userData.name }</li>
          <li className="py-1">{ userData.email }</li>
          <li><hr className="dropdown-divider" /></li>
          <li>
            <button
              type="button"
              className="btn btn-danger w-100"
              onClick={ logout }
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default OptionsUser;
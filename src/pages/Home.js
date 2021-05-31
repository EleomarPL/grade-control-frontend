import React, { useEffect, useState } from 'react';
import Logo from '../components/Logo';
import OptionsUser from '../components/OptionsUser';

import {getAllQualificationUser} from '../services/apis/qualification';
import {notifyError, notifyWarning} from '../consts/notify';

import '../styles/home.css';
import { HashRouter, NavLink, Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../routes/PrivateRoute';
import {ModalAddQualification, showModalStatic} from '../components/ModalAddQualification';

const Home = () => {
  const [qualifications, setQualification] = useState(null);
  const { url } = useRouteMatch();

  useEffect(() => {
    const getToken = window.localStorage.getItem('session');
    getAllQualificationUser({token: JSON.parse(getToken)}).then(response => {
      setQualification(response.data);
    }).catch(err => {
      if (err.message === 'Network Error') {
        notifyError('No encontramos una conexión a internet');
      } else if (err.response.data.error === 'Token missing or invalid') {
        notifyWarning('Al parecer, perdiste los permisos, te recomiendo cerrar sesión');
      }
    });
  }, []);
  const showModal = () => {
    console.log(qualifications);
    showModalStatic();
  };

  return (
    <section>
      <div className="px-0 mx-0 d-flex flex-wrap justify-content-around align-items-center navbar-user">
        <Logo />
        <OptionsUser />
      </div>
      <div className="d-flex flex-wrap justify-content-center pt-4 pb-2" style={ {fontSize: '2.1rem'} }>
        <strong>Calificaciones</strong>
      </div>
      <HashRouter>
        <div className="home">
          <div className="d-flex justify-content-center">
            <NavLink
              className="option-router"
              exact
              to={ url }
              activeClassName="active-nav-user"
            >
              Lista
            </NavLink>
            <NavLink
              className="option-router"
              to={ url + 'ordenated' }
              activeClassName="active-nav-user"
            >
              Ordenados
            </NavLink>
          </div>
          <div className="content p-3 mt-3">
            <Switch>
              <PrivateRoute exact path={ url }>
                <p>Lista</p>
              </PrivateRoute>
              <PrivateRoute path={ url + 'ordenated' }>
                <p>Ordenado</p>
              </PrivateRoute>
            </Switch>
          </div>
        </div>
      </HashRouter>
      <div className="add-new-qualification add-new-qualification">
        <button type="button" onClick={ showModal }>
          <i className="bi bi-plus-circle-fill" />
        </button>
      </div>
      <ModalAddQualification setQualifications={ setQualification } qualifications={ qualifications } />
    </section>
  );
};

export default Home;
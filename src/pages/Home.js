import React, { useEffect, useState } from 'react';
import Logo from '../components/Logo';
import OptionsUser from '../components/OptionsUser';

import {getAllQualificationUser} from '../services/apis/qualification';
import {notifyError, notifyWarning} from '../consts/notify';

import '../styles/home.css';

const Home = () => {
  const [qualifications, setQualification] = useState(null);
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
  return (
    <section>
      <div className="px-0 mx-0 d-flex flex-wrap justify-content-around align-items-center navbar-user">
        <Logo />
        <OptionsUser />
      </div>
      <div className="home d-flex flex-wrap">
        <div className="menu-selection">
          <p>Lista</p>
          <p>Ordenados</p>
        </div>
        <div className="content">

        </div>
      </div>
    </section>
  );
};

export default Home;
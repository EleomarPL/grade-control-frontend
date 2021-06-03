import React, { Suspense } from 'react';
import Logo from '../components/Logo';
import OptionsUser from '../components/OptionsUser';

import '../styles/home.css';
import { BrowserRouter, Link, Switch } from 'react-router-dom';
import PrivateRoute from '../routes/PrivateRoute';
import SpinnerLoading from '../components/SpinnerLoading';
import { Helmet } from 'react-helmet';
const Qualifications = React.lazy(() => import('./subpages/Qualifications'));
const SettingsUser = React.lazy(() => import('./subpages/SettingsUser'));
const History = React.lazy(() => import('./subpages/History'));
const EditUser = React.lazy(() => import('./subpages/EditUser'));
const EditPassword = React.lazy(() => import('./subpages/EditPassword'));

const Home = () => {
  return (
    <section>
      <BrowserRouter>
        <div className="px-0 mx-0 d-flex flex-wrap justify-content-around align-items-center navbar-user sticky-top">
          <Link to="/home" style={ {color: 'black', textDecoration: 'none'} }>
            <Logo />
          </Link>
          <OptionsUser />
        </div>
        <Switch>
          <PrivateRoute exact path={ '/home' }>
            <Helmet>
              <title>Inicio | Calificaciones</title>
              <meta name="description" content="Gestiona mediante una hermosa interfaz de usuario, tus calificaciones" />
            </Helmet>
            <Suspense fallback={ <SpinnerLoading /> }>
              <Qualifications />
            </Suspense>
          </PrivateRoute>
          <PrivateRoute path={ '/home/settings' }>
            <Helmet>
              <title>Configuración | Calificaciones</title>
              <meta name="description" content="Configurar tus datos de usuario para esta cuenta" />
            </Helmet>
            <Suspense fallback={ <SpinnerLoading /> }>
              <SettingsUser />
            </Suspense>
          </PrivateRoute>
          <PrivateRoute path={ '/home/history' }>
            <Helmet>
              <title>Historial | Calificaciones</title>
              <meta name="description" content="Ver y eliminar tu historial de acciones u operaciones" />
            </Helmet>
            <Suspense fallback={ <SpinnerLoading /> }>
              <History />
            </Suspense>
          </PrivateRoute>
          <PrivateRoute path={ '/home/edit' }>
            <Helmet>
              <title>Actualizar datos | Calificaciones</title>
              <meta name="description" content="Editar tus datos de usuario" />
            </Helmet>
            <Suspense fallback={ <SpinnerLoading /> }>
              <EditUser />
            </Suspense>
          </PrivateRoute>
          <PrivateRoute path={ '/home/editpassword' }>
            <Helmet>
              <title>Actualizar contraseña | Calificaciones</title>
              <meta name="description" content="Editar tu contraseña de usuario" />
            </Helmet>
            <Suspense fallback={ <SpinnerLoading /> }>
              <EditPassword />
            </Suspense>
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </section>
  );
};

export default Home;
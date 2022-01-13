import { Suspense, lazy } from 'react';
import Logo from '../components/Logo';
import OptionsUser from '../components/OptionsUser';

import '../styles/home.css';
import { Link, Routes, Route } from 'react-router-dom';
import SpinnerLoading from '../components/SpinnerLoading';
import { Helmet } from 'react-helmet';
const Qualifications = lazy(() => import('./subpages/Qualifications'));
const SettingsUser = lazy(() => import('./subpages/SettingsUser'));
const History = lazy(() => import('./subpages/History'));
const EditUser = lazy(() => import('./subpages/EditUser'));
const EditPassword = lazy(() => import('./subpages/EditPassword'));

const Home = () => {
  return (
    <section>
      <div className="px-0 mx-0 d-flex flex-wrap justify-content-around align-items-center navbar-user sticky-top">
        <Link to="/home" style={ {color: 'black', textDecoration: 'none'} }>
          <Logo />
        </Link>
        <OptionsUser />
      </div>
      <Routes>
        <Route path="/*"
          element={
            <>
              <Helmet>
                <title>Inicio | Calificaciones</title>
                <meta name="description" content="Gestiona mediante una hermosa interfaz de usuario, tus calificaciones" />
              </Helmet>
              <Suspense fallback={ <SpinnerLoading /> }>
                <Qualifications />
              </Suspense>
            </>
          }
        />
        <Route path="/settings"
          element={
            <>
              <Helmet>
                <title>Configuración | Calificaciones</title>
                <meta name="description" content="Configurar tus datos de usuario para esta cuenta" />
              </Helmet>
              <Suspense fallback={ <SpinnerLoading /> }>
                <SettingsUser />
              </Suspense>
            </>
          }
        />
        <Route path="/history"
          element={
            <>
              <Helmet>
                <title>Historial | Calificaciones</title>
                <meta name="description" content="Ver y eliminar tu historial de acciones u operaciones" />
              </Helmet>
              <Suspense fallback={ <SpinnerLoading /> }>
                <History />
              </Suspense>
            </>
          }
        />
        <Route path="/edit"
          element={
            <>
              <Helmet>
                <title>Actualizar datos | Calificaciones</title>
                <meta name="description" content="Editar tus datos de usuario" />
              </Helmet>
              <Suspense fallback={ <SpinnerLoading /> }>
                <EditUser />
              </Suspense>
            </>
          }
        />
        <Route path="/editpassword"
          element={
            <>
              <Helmet>
                <title>Actualizar contraseña | Calificaciones</title>
                <meta name="description" content="Editar tu contraseña de usuario" />
              </Helmet>
              <Suspense fallback={ <SpinnerLoading /> }>
                <EditPassword />
              </Suspense>
            </>
          }
        />
      </Routes>
    </section>
  );
};

export default Home;
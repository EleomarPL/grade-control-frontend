import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import SpinnerLoading from '../components/SpinnerLoading';
import HeaderUser from '../components/HeaderUser';

const Qualifications = lazy(() => import('./subpages/Qualifications'));
const SettingsUser = lazy(() => import('./subpages/SettingsUser'));
const History = lazy(() => import('./subpages/History'));
const EditUser = lazy(() => import('./subpages/EditUser'));
const EditPassword = lazy(() => import('./subpages/EditPassword'));

const Home = () => {
  return (
    <section>
      <HeaderUser />
      <Routes>
        <Route path="*"
          element={
            <>
              <Helmet>
                <title>Inicio | Calificaciones</title>
                <meta name="description" content="Gestiona mediante una hermosa interfaz de usuario, tus calificaciones." />
                <meta name="twitter:title" content="Inicio | Calificaciones" />
                <meta name="twitter:description" content="Gestiona mediante una hermosa interfaz de usuario, tus calificaciones." />
                <meta property="og:title" content="Inicio | Calificaciones" />
                <meta property="og:description" content="Gestiona mediante una hermosa interfaz de usuario, tus calificaciones." />
                <meta name="twitter:url" content="https://gestiocal.vercel.app/home/" />
                <meta property="og:url" content="https://gestiocal.vercel.app/home/" />
              </Helmet>
              <Suspense fallback={ <SpinnerLoading /> }>
                <Qualifications />
              </Suspense>
            </>
          }
        />
        <Route path="settings"
          element={
            <>
              <Helmet>
                <title>Configuración | Calificaciones</title>
                <meta name="description" content="Configurar tus datos de usuario para esta cuenta." />
                <meta name="twitter:title" content="Configuración | Calificaciones" />
                <meta name="twitter:description" content="Configurar tus datos de usuario para esta cuenta." />
                <meta property="og:title" content="Configuración | Calificaciones" />
                <meta property="og:description" content="Configurar tus datos de usuario para esta cuenta." />
                <meta name="twitter:url" content="https://gestiocal.vercel.app/home/settings/" />
                <meta property="og:url" content="https://gestiocal.vercel.app/home/settings/" />
              </Helmet>
              <Suspense fallback={ <SpinnerLoading /> }>
                <SettingsUser />
              </Suspense>
            </>
          }
        />
        <Route path="history"
          element={
            <>
              <Helmet>
                <title>Historial | Calificaciones</title>
                <meta name="description" content="Ver y eliminar tu historial de acciones u operaciones." />
                <meta name="twitter:title" content="Historial | Calificaciones" />
                <meta name="twitter:description" content="Ver y eliminar tu historial de acciones u operaciones." />
                <meta property="og:title" content="Historial | Calificaciones" />
                <meta property="og:description" content="Ver y eliminar tu historial de acciones u operaciones." />
                <meta name="twitter:url" content="https://gestiocal.vercel.app/home/history/" />
                <meta property="og:url" content="https://gestiocal.vercel.app/home/history/" />
              </Helmet>
              <Suspense fallback={ <SpinnerLoading /> }>
                <History />
              </Suspense>
            </>
          }
        />
        <Route path="edit"
          element={
            <>
              <Helmet>
                <title>Actualizar datos | Calificaciones</title>
                <meta name="description" content="Editar tus datos de usuario." />
                <meta name="twitter:title" content="Actualizar datos | Calificaciones" />
                <meta name="twitter:description" content="Editar tus datos de usuario." />
                <meta property="og:title" content="Actualizar datos | Calificaciones" />
                <meta property="og:description" content="Editar tus datos de usuario." />
                <meta name="twitter:url" content="https://gestiocal.vercel.app/home/edit/" />
                <meta property="og:url" content="https://gestiocal.vercel.app/home/edit/" />
              </Helmet>
              <Suspense fallback={ <SpinnerLoading /> }>
                <EditUser />
              </Suspense>
            </>
          }
        />
        <Route path="editpassword"
          element={
            <>
              <Helmet>
                <title>Actualizar contraseña | Calificaciones</title>
                <meta name="description" content="Editar tu contraseña de usuario." />
                <meta name="twitter:title" content="Actualizar contraseña | Calificaciones" />
                <meta name="twitter:description" content="Editar tu contraseña de usuario." />
                <meta property="og:title" content="Actualizar contraseña | Calificaciones" />
                <meta property="og:description" content="Editar tu contraseña de usuario." />
                <meta name="twitter:url" content="https://gestiocal.vercel.app/home/editpassword/" />
                <meta property="og:url" content="https://gestiocal.vercel.app/home/editpassword/" />
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
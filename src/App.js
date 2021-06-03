import React, { Fragment, Suspense } from 'react';
import {Helmet} from 'react-helmet';
import { BrowserRouter, Switch } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles/index.css';

import '@fontsource/roboto';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from './context/Auth';
import PublicRoute from './routes/PublicRoute';
import Login from './pages/Login';
const Register = React.lazy(() => import('./pages/Register'));
import PrivateRoute from './routes/PrivateRoute';
import SpinnerLoading from './components/SpinnerLoading';
const Home = React.lazy(() => import('./pages/Home'));

const App = () => {
  return (
    <Fragment>
      <main>
        <AuthProvider>
          <BrowserRouter>
            <Switch>
              <PublicRoute exact path="/">
                <Helmet>
                  <title>Login | Calificaciones</title>
                  <meta name="description" content="Login para acceder, y poder gestionar o controlar tus calificaciones" />
                </Helmet>
                <Login />
              </PublicRoute>
              <PublicRoute path="/register">
                <Helmet>
                  <title>Registrarse | Calificaciones</title>
                  <meta name="description" content="Registrate, y obten la facilidad de gestionar tus calificaciones" />
                </Helmet>
                <Suspense fallback={ <SpinnerLoading /> }>
                  <Register />
                </Suspense>
              </PublicRoute>
              <PrivateRoute path="/home">
                <Suspense fallback={ <SpinnerLoading /> }>
                  <Home />
                </Suspense>
              </PrivateRoute>
            </Switch>
          </BrowserRouter>
        </AuthProvider>
      </main>
      <ToastContainer position="top-right"
        autoClose={ 5000 } hideProgressBar={ false }
        newestOnTop={ false } closeOnClick
        rtl={ false } pauseOnFocusLoss
        draggable={ false } pauseOnHover
      />
    </Fragment>
  );
};

export default App ;

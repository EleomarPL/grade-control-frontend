import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
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
import Register from './pages/Register';

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
                  <title>Register | Calificaciones</title>
                  <meta name="description" content="Registrate, y obten la facilidad de gestionar tus calificaciones" />
                </Helmet>
                <Register />
              </PublicRoute>
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

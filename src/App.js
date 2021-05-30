import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { BrowserRouter, Switch } from 'react-router-dom';

import './styles/index.css';

import '@fontsource/roboto';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from './context/Auth';
import PublicRoute from './routes/PublicRoute';

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
                <p>Login</p>
              </PublicRoute>
            </Switch>
          </BrowserRouter>
        </AuthProvider>
      </main>
    </Fragment>
  );
};

export default App ;

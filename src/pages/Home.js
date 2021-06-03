import React, { Suspense } from 'react';
import Logo from '../components/Logo';
import OptionsUser from '../components/OptionsUser';

import '../styles/home.css';
import { BrowserRouter, Link, Switch } from 'react-router-dom';
import PrivateRoute from '../routes/PrivateRoute';
import SpinnerLoading from '../components/SpinnerLoading';
const Qualifications = React.lazy(() => import('./subpages/Qualifications'));
const SettingsUser = React.lazy(() => import('./subpages/SettingsUser'));
const History = React.lazy(() => import('./subpages/History'));

const Home = () => {
  return (
    <section>
      <BrowserRouter>
        <div className="px-0 mx-0 d-flex flex-wrap justify-content-around align-items-center navbar-user">
          <Link to="/home" style={ {color: 'black', textDecoration: 'none'} }>
            <Logo />
          </Link>
          <OptionsUser />
        </div>
        <Switch>
          <PrivateRoute exact path={ '/home' }>
            <Suspense fallback={ <SpinnerLoading /> }>
              <Qualifications />
            </Suspense>
          </PrivateRoute>
          <PrivateRoute path={ '/home/settings' }>
            <Suspense fallback={ <SpinnerLoading /> }>
              <SettingsUser />
            </Suspense>
          </PrivateRoute>
          <PrivateRoute path={ '/home/history' }>
            <Suspense fallback={ <SpinnerLoading /> }>
              <History />
            </Suspense>
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </section>
  );
};

export default Home;
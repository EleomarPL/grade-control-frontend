import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import PropTypes from 'prop-types';

import Auth from '../context/Auth';

const PrivateRoute = ({children}, props) => {
  const {userData} = useContext(Auth);
  let isLogged = userData === null ? false : true;

  if (isLogged) {
    return <Route { ...props }>{ children }</Route>;
  } else {
    return <Redirect to="/" />;
  }

};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default PrivateRoute;
import { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import PropTypes from 'prop-types';

import Auth from '../context/Auth';

const PublicRoute = ({children}, props) => {
  const {userData} = useContext(Auth);
  let isLogged = userData === null || userData === {} ? false : true;

  if (isLogged) {
    return <Redirect to="/home" />;
  } else {
    return <Route { ...props }>{ children }</Route>;
  }

};
PublicRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default PublicRoute;
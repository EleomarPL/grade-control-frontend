import { useContext } from 'react';
import { Navigate } from 'react-router';
import PropTypes from 'prop-types';

import Auth from '../context/Auth';

const PublicRoute = ({ children }) => {
  const {userData} = useContext(Auth);
  let isLogged = userData === null || userData === {} ? false : true;

  if (isLogged) {
    return <Navigate to="/home" />;
  } else {
    return children;
  }

};
PublicRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default PublicRoute;
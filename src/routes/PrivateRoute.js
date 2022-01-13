import { useContext } from 'react';
import { Navigate } from 'react-router';
import PropTypes from 'prop-types';

import Auth from '../context/Auth';

const PrivateRoute = ({ children }) => {
  const {userData} = useContext(Auth);
  let isLogged = userData === null ? false : true;

  if (isLogged) {
    return children;
  } else {
    return <Navigate to="/" />;
  }

};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default PrivateRoute;
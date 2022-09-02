import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Auth from '../context/Auth';

const PrivateRoute = () => {
  const {userData} = useContext(Auth);
  let isLogged = userData === null ? false : true;

  if (isLogged) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }

};

export default PrivateRoute;
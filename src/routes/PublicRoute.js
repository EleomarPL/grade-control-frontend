import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Auth from '../context/Auth';

const PublicRoute = () => {
  const {userData} = useContext(Auth);
  let isLogged = userData === null || userData === {} ? false : true;

  if (isLogged) {
    return <Navigate to="/home" />;
  } else {
    return <Outlet />;
  }

};

export default PublicRoute;
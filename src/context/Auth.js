
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Auth = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const getUserFromStorage = window.localStorage.getItem('datauser');
    if (getUserFromStorage) {
      setUserData(JSON.parse(getUserFromStorage));
    }
  }, []);
  return (
    <Auth.Provider value={ { userData, setUserData } }>
      { children }
    </Auth.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default Auth;

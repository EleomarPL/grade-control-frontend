
import { useEffect, useState, createContext } from 'react';
import PropTypes from 'prop-types';

const Auth = createContext({});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const getUserFromStorage = window.localStorage.getItem('datauser');
    if (getUserFromStorage) {
      setUserData(JSON.parse(getUserFromStorage));
    } else {
      setUserData(null);
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

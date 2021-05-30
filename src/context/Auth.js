
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Auth = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
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

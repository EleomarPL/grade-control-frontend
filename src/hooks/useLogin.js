import { loginAxios } from '../services/apis/login';
import Auth from '../context/Auth';
import { useContext } from 'react';
import { notifyError, notifyInfo } from '../consts/notify';

const useLogin = () => {
  const {setUserData} = useContext(Auth);

  const login = async({userName, password, setState}) => {
    try {
      const {data} = await loginAxios({password, userName});
      let dataUser = {
        name: data.name,
        lastName: data.lastName,
        motherLastName: data.motherLastName,
        phone: data.phone,
        email: data.email,
        userName: data.userName
      };

      window.localStorage.setItem('datauser', JSON.stringify(dataUser));
      window.localStorage.setItem('session', JSON.stringify(data.token));
      setState(false);
      setUserData(dataUser);

    } catch (err) {
      setState(false);
      if (err.message === 'Network Error') {
        notifyError('No encontramos una conexión a internet');
      } else if (err.response.data.error === 'Invalid user or password') {
        notifyInfo('Usuario o contraseña invalido');
      }
      return false;
    }
  };
  
  return {
    login
  };
};

export default useLogin;
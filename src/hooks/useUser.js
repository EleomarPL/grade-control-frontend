import { useContext } from 'react';

import { notifyError, notifySuccess, notifyWarning } from '../consts/notify';
import Auth from '../context/Auth';
import {
  createUserAxios, deleteUserAxios, getDataUserAxios, updateDataUserAxios, updatePasswordUserAxios
} from '../services/apis/user';

const useUser = () => {
  const { setUserData } = useContext(Auth);

  const createUser = async({
    name, lastName, motherLastName, phone,
    email, password, userName
  }) => {
    try {
      await createUserAxios({
        name, lastName, motherLastName, phone, email, userName, password
      });
      notifySuccess('Usuario creado correctamente');
      return true;
    } catch (err) {
      if (err.message === 'Request failed with status code 409') {
        notifyWarning('Ingresa un diferente nombre de usuario');
      }
      if (err.message === 'Network Error') {
        notifyError('No encontramos una conexión a internet');
      }
      return false;
    }
  };
  const updatePasswordUser = async({oldPassword, newPassword}) => {
    const token = JSON.parse(window.localStorage.getItem('session'));
    try {
      await updatePasswordUserAxios({token, oldPassword, newPassword});
      notifySuccess('Contraseña actualizado correctamente');

      return true;
    } catch (err) {
      if (err.message === 'Request failed with status code 401') {
        notifyWarning('Tu contraseña actual no es valida');
      } else if (err.message === 'Network Error') {
        notifyError('No encontramos una conexión a internet');
      }

      return false;
    }
  };
  const getDataUser = async() => {
    const token = JSON.parse(window.localStorage.getItem('session'));
    try {
      const { data } = await getDataUserAxios({token});
      return data;
    } catch (err) {
      if (err.message === 'Network Error') {
        notifyError('No encontramos una conexión a internet');
      } else if (err.response.data.error === 'Token missing or invalid') {
        notifyWarning('Al parecer, perdiste los permisos, te recomiendo cerrar sesión');
      }
      return false;
    }

  };
  const updateDataUser = async({
    name, lastName, motherLastName, phone,
    email, password, userName
  }) => {
    const token = JSON.parse(window.localStorage.getItem('session'));
    try {
      const { data } = await updateDataUserAxios({
        token, name, lastName, motherLastName, phone,
        email, password, userName
      });
      setUserData({
        name: data.name,
        lastName: data.lastName,
        motherLastName: data.motherLastName,
        phone: data.phone,
        email: data.email,
        userName: data.userName
      });
      notifySuccess('Usuario actualizado correctamente');

      return true;
    } catch (err) {
      if (err.message === 'Request failed with status code 409')
        notifyWarning('Ingresa un diferente nombre de usuario');
      if (err.message === 'Network Error')
        notifyError('No encontramos una conexión a internet');
      return false;
    }
  };
  const deleteAccountUser = async({ setState, hideModalStatic }) => {
    const token = JSON.parse(window.localStorage.getItem('session'));

    try {
      const response = await deleteUserAxios({token});
      if (response.status === 204) {
        setState(false);
        hideModalStatic();
        
        notifySuccess('Cuenta eliminada correctamente');
        window.localStorage.clear();
        setUserData(null);

        return true;
      }

      return false;
    } catch (err) {
      if (err.message === 'Network Error')
        notifyError('No encontramos una conexión a internet');
      else if (err.response.data.error === 'Token missing or invalid')
        notifyWarning('Al parecer, perdiste los permisos, te recomiendo cerrar sesión');

      return false;
    }
  };
  
  return {
    getDataUser, createUser, updatePasswordUser, updateDataUser,
    deleteAccountUser
  };
};

export default useUser;
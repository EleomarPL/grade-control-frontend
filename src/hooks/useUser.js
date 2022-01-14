import { notifyError, notifySuccess, notifyWarning } from '../consts/notify';
import { createUserAxios, updatePasswordUserAxios } from '../services/apis/user';

const useUser = () => {
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
  
  return {
    createUser, updatePasswordUser
  };
};

export default useUser;
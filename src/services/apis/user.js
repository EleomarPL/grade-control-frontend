import axios from 'axios';
import { BASE_API } from './BASE_API';

const baseAPI = `${BASE_API}api`;

export const createUserAxios = async({
  name, lastName, motherLastName, phone,
  email, password, userName
}) => {
  let response = await axios.post(`${baseAPI}/users/create-user`, {
    name, lastName, motherLastName, phone,
    email, password, userName
  });
  return response;
};
export const getDataUserAxios = async({token}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  let response = await axios.get(`${baseAPI}/users`, config);
  return response;
};
export const updatePasswordUserAxios = async({token, oldPassword, newPassword}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  let response = await axios.put(
    `${baseAPI}/users/edit-password`,
    { oldPassword, newPassword },
    config
  );
  return response;
};
export const updateDataUserAxios = async({
  name, lastName, motherLastName, phone,
  email, password, userName, token
}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  let response = await axios.put(
    `${baseAPI}/users/edit-data`,
    {
      name, lastName, motherLastName, phone, email, password, userName
    },
    config
  );
  return response;
};
export const deleteUserAxios = async({token}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  let response = await axios.delete(`${baseAPI}/users/delete`, config);
  return response;
};
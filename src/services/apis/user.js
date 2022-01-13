import axios from 'axios';

const baseAPI = 'https://radiant-journey-60007.herokuapp.com/api';

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
export const getDataUser = async({token}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  let response = await axios.get(`${baseAPI}/users`, config);
  return response;
};
export const updatePasswordUser = async({token, dataUser}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  let response = await axios.put(`${baseAPI}/users/edit-password`, dataUser, config);
  return response;
};
export const updateDataUser = async({token, dataUser}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  let response = await axios.put(`${baseAPI}/users/edit-data`, dataUser, config);
  return response;
};
export const deleteUser = async({token}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  let response = await axios.delete(`${baseAPI}/users/delete`, config);
  return response;
};
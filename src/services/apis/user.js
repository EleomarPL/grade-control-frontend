import axios from 'axios';

const baseAPI = 'https://radiant-journey-60007.herokuapp.com/api';

export const createUser = async(dataUser) => {
  let response = await axios.post(`${baseAPI}/users/create-user`, dataUser);
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
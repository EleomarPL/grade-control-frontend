import axios from 'axios';

const baseAPI = 'https://radiant-journey-60007.herokuapp.com/api';

export const createUser = async(dataUser) => {
  let response = await axios.post(`${baseAPI}/users/create-user`, dataUser);
  return response;
};
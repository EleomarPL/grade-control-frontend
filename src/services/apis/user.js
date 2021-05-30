import axios from 'axios';

const baseAPI = 'http://localhost:4000/api';

export const createUser = async(dataUser) => {
  let response = await axios.post(`${baseAPI}/users/create-user`, dataUser);
  return response;
};
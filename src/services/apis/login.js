import axios from 'axios';

const baseAPI = 'https://radiant-journey-60007.herokuapp.com/api';

export const loginAxios = async({ userName, password }) => {
  let response = await axios.post(`${baseAPI}/login`, {userName, password});
  return response;
};
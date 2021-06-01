import axios from 'axios';

const baseAPI = 'https://radiant-journey-60007.herokuapp.com/api';

export const login = async credentials => {
  let response = await axios.post(`${baseAPI}/login`, credentials);
  return response;
};
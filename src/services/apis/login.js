import axios from 'axios';

const baseAPI = 'http://localhost:4000/api';

export const login = async credentials => {
  let response = await axios.post(`${baseAPI}/login`, credentials);
  return response;
};
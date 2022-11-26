import axios from 'axios';
import { BASE_API } from './BASE_API';

const baseAPI = `${BASE_API}api`;

export const loginAxios = async({ userName, password }) => {
  let response = await axios.post(`${baseAPI}/login`, {userName, password});
  return response;
};
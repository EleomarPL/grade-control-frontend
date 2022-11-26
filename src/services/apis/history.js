import axios from 'axios';
import { BASE_API } from './BASE_API';

const baseAPI = `${BASE_API}api`;

export const createHistoryAxios = async({token, dataHistory}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  let response = await axios.post(`${baseAPI}/history/create-history`, dataHistory, config);
  return response;
};
export const getAllHistoryUserAxios = async({token}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  let response = await axios.get(`${baseAPI}/history`, config);
  return response;
};
export const deleteHistoryAxios = async({token, idHistory}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  let response = await axios.delete(`${baseAPI}/history/delete/${idHistory}`, config);
  return response;
};
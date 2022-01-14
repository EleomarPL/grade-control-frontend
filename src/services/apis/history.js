import axios from 'axios';

const baseAPI = 'https://radiant-journey-60007.herokuapp.com/api';

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
export const deleteHistory = async({token, idHistory}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  let response = await axios.delete(`${baseAPI}/history/delete/${idHistory}`, config);
  return response;
};
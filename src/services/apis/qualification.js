import axios from 'axios';

const baseAPI = 'http://localhost:4000/api';

export const getAllQualificationUser = async({token}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  let response = await axios.get(`${baseAPI}/qualifications`, config);
  return response;
};
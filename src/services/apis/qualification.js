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
export const createQualification = async({token, dataQualification}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  let response = await axios.post(`${baseAPI}/qualifications/create-qualification`, dataQualification, config);
  return response;
};
export const deleteQualification = async({token, idQualification}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  let response = await axios.delete(`${baseAPI}/qualifications/delete/${idQualification}`, config);
  return response;
};
export const editQualification = async({token, idQualification, dataQualification}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  let response = await axios.put(`${baseAPI}/qualifications/edit/${idQualification}`, dataQualification, config);
  return response;
};
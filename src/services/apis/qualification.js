import axios from 'axios';

const baseAPI = 'https://radiant-journey-60007.herokuapp.com/api';

export const getAllQualificationUserAxios = async({token}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  let response = await axios.get(`${baseAPI}/qualifications`, config);
  return response;
};
export const createQualificationAxios = async({
  token, course, unit, score, semester
}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  let response = await axios.post(
    `${baseAPI}/qualifications/create-qualification`,
    { course, unit, score, semester },
    config
  );
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
import axios from 'axios';
import { BASE_API } from './BASE_API';

const baseAPI = `${BASE_API}api`;

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
export const deleteQualificationAxios = async({token, idQualification}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  let response = await axios.delete(`${baseAPI}/qualifications/delete/${idQualification}`, config);
  return response;
};
export const editQualificationAxios = async({
  token, idQualification, course,
  unit, score, semester
}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  let response = await axios.put(
    `${baseAPI}/qualifications/edit/${idQualification}`,
    {course, unit, score, semester},
    config
  );
  return response;
};
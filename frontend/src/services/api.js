import axios from 'axios';

const API_URL = 'http://localhost:8001'; //  Node.js backend URL

export const getCars = async () => {
  const response = await axios.get(`${API_URL}/cars`);
  return response.data;
};

export const getCarById = async (id) => {
  const response = await axios.get(`${API_URL}/cars/${id}`);
  return response.data;
};

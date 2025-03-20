import axios from 'axios';

const API_URL = 'http://localhost:8001'; // Update this to match your backend URL (8000, not 8001)

// Existing car-related functions
export const getCars = async () => {
  const response = await axios.get(`${API_URL}/cars`);
  return response.data;
};

export const getCarById = async (id) => {
  const response = await axios.get(`${API_URL}/cars/${id}`);
  return response.data;
};

// New auth-related functions
export const signup = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/api/auth/signup`, {
    username,
    email,
    password,
  }, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const login = async (email, password, rememberMe) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, {
    email,
    password,
    rememberMe,
  }, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data; // Returns { token, username }
};
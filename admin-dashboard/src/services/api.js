import axios from 'axios';

const API_URL = 'http://localhost:8001';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('username');
  window.location.href = '/login';
};

export const getProfile = async () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const response = await axios.get(`${API_URL}/api/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { timestamp: Date.now() }
  });
  return response.data;
};


export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  return !decoded?.exp || decoded.exp * 1000 < Date.now();
};


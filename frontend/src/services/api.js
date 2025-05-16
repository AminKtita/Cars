import axios from 'axios';

const API_URL = 'http://localhost:8001'; 

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
  });
  return response.data;
};

export const logUserAction = async (actionData) => {
  try {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    const response = await axios.post(`${API_URL}/api/user-actions`, actionData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (err) {
    console.error('Error logging action:', err);
    throw err;
  }
};

export const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    return payload;
  } catch (err) {
    return null;
  }
};

export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded?.exp) return true;
  return decoded.exp * 1000 < Date.now();
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('username');
  window.location.href = '/login';
};

export const toggleFavorite = async (carId) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const response = await axios.post(`${API_URL}/api/favorites/toggle/${carId}`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const checkFavorite = async (carId) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const response = await axios.get(`${API_URL}/api/favorites/check/${carId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Filter presets API
export const saveFilterPreset = async (presetData) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const response = await axios.post(`${API_URL}/api/filter-presets`, presetData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getFilterPresets = async () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const response = await axios.get(`${API_URL}/api/filter-presets`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteFilterPreset = async (presetId) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/api/filter-presets/${presetId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getRecommendations = async () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const response = await axios.get(`${API_URL}/api/recommend`, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

export const getFavoriteCars = async () => {
  try {
    const response = await fetch(`${API_URL}/api/favorites`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};

export const getHistory = async () => {
  try {
    const response = await fetch(`${API_URL}/api/user-actions/history`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};

export const getMostViewedCarIdsByBrand = async (brand) => {
  try {
    const response = await axios.get(`${API_URL}/cars/most-viewed-ids/${encodeURIComponent(brand)}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top viewed car IDs:', error);
    throw error;
  }
};

export const getMostViewedCar = async () => {
  try {
    const response = await axios.get(`${API_URL}/cars/most-viewed`);
    return response.data;
  } catch (error) {
    console.error('Error fetching most viewed car:', error);
    throw error;
  }
};

export const getProfile = async () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const response = await axios.get(`${API_URL}/api/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Update profile
export const updateProfile = async (formData) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const response = await axios.put(`${API_URL}/api/auth/profile`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};


// Submit review
export const submitReview = async (carId, reviewData) => {
  try {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/cars/${carId}/reviews`,
      {
        comfort: reviewData.comfort,
        performance: reviewData.performance,
        interiorDesign: reviewData.interiorDesign,
        speed: reviewData.speed,
        comment: reviewData.comment
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Review submission error:', error.response?.data);
    throw error;
  }
};// Get car reviews
export const getCarReviews = async (carId) => {
  const response = await axios.get(`${API_URL}/cars/${carId}/reviews`);
  return response.data;
};

export const getTopReviews = async () => {
  try {
    const response = await axios.get(`${API_URL}/cars/reviews/top`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top reviews:', error);
    throw error;
  }
};

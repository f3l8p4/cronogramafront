import axios from 'axios';

const apiAuth = process.env.REACT_API_URL

export const login = async (credentials) => {
  try {
    const response = await apiAuth.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const setAuthToken = (token) => {
  if (token) {
    apiAuth.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiAuth.defaults.headers.common['Authorization'];
  }
};

export default apiAuth;

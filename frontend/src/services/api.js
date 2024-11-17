import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});


api.defaults.headers.common['Content-Type'] = 'application/json';

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized! Logging out...');
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;

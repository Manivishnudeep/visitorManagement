import axios from 'axios';

// Create an instance of Axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});


api.defaults.headers.common['Content-Type'] = 'application/json';

api.interceptors.request.use(
  (config) => {
    // Check if token is available in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // If token exists, add it to the headers of the request
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle errors globally (optional)
api.interceptors.response.use(
  (response) => response, // If request succeeds, just return the response
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized, you might want to log out or show an alert
      console.log('Unauthorized! Logging out...');
      localStorage.removeItem('token');
      // Redirect to login page or any other action
    }
    return Promise.reject(error); // Return the error to be handled by the calling component
  }
);

// Now, you can use this 'api' instance to make API calls
export default api;

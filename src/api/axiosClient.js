import axios from 'axios';

/**
 * Single Axios instance configured with base URL from environment variables,
 * Request Interceptor for Bearer token injection, and Response Interceptor for 401 handling.
 */
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: Attach Authorization Bearer token from localStorage
axiosClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving token from localStorage:', error);
    }
    return config;
  },
  (error) => {
    // Re-throw request configuration error
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global 401 Unauthorized & propagate errors
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Auto logout and clear storage on 401 Unauthorized
      console.warn('Unauthorized request (401). Clearing session and credentials.');
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Broadcast auth change event or redirect if not already on login page
        if (!window.location.pathname.includes('/login')) {
          window.dispatchEvent(new Event('auth:unauthorized'));
        }
      } catch (storageErr) {
        console.error('Error clearing localStorage on 401:', storageErr);
      }
    }

    // Always re-throw error so calling pages/forms/components can catch it and display alerts
    return Promise.reject(error);
  }
);

export default axiosClient;

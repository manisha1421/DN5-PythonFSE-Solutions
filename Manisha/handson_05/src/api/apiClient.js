import axios from 'axios';

// Centralised Axios instance
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor - attaches mock auth token
apiClient.interceptors.request.use(config => {
  config.headers['Authorization'] = 'Bearer mock-token-12345';
  console.log('API call started:', config.url);
  return config;
});

// Response interceptor - returns data directly, standardises errors
apiClient.interceptors.response.use(
  response => response.data,
  error => {
    const message = error.response
      ? `Error ${error.response.status}: ${error.response.statusText}`
      : 'Network error — please check your connection';
    throw new Error(message);
  }
);

export default apiClient;
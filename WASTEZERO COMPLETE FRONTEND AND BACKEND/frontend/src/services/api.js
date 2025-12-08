import axios from 'axios';
import { getAuthToken, removeAuthToken, removeUser } from '../utils/auth';

axios.defaults.baseURL = 'http://localhost:5000';

// Add token to requests
axios.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeAuthToken();
      removeUser();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => axios.post('/auth/register', data),
  login: (data) => axios.post('/auth/login', data),
};

// User API
export const userAPI = {
  getMe: () => axios.get('/users/me'),
  update: (data) => axios.put('/users/update', data),
};

// Opportunity API
export const opportunityAPI = {
  create: (data) => axios.post('/opportunity/create', data),
  getAll: () => axios.get('/opportunity/all'),
  getById: (id) => axios.get(`/opportunity/${id}`),
  update: (id, data) => axios.put(`/opportunity/update/${id}`, data),
  delete: (id) => axios.delete(`/opportunity/delete/${id}`),
};

// Application API
export const applicationAPI = {
  apply: (data) => axios.post('/applications/apply', data),
  getMyApplications: () => axios.get('/applications/my-applications'),
};

// Message API
export const messageAPI = {
  getMessages: (userId) => axios.get(`/messages/${userId}`),
  sendMessage: (data) => axios.post('/messages/send', data),
};

// Admin API
export const adminAPI = {
  getDashboard: () => axios.get('/admin/dashboard'),
  suspendUser: (userId) => axios.put(`/admin/suspend/${userId}`),
  removeOpportunity: (id) => axios.delete(`/admin/remove-opportunity/${id}`),
};

export default axios;


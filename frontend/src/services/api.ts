import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User endpoints
export const userAPI = {
  read: (email: string) => apiClient.get('/user', { params: { email } }),
  create: (userData: { name: string; email: string; role: string; token: string }) =>
    apiClient.post('/user', userData),
};

// Company endpoints
export const companyAPI = {
  create: (data: any) => apiClient.post('/company', data),
  read: (id?: string) =>
    apiClient.get(`/company${id ? `/${id}` : ''}`),
  update: (id: string, data: any) => apiClient.patch(`/company/${id}`, data),
  delete: (id: string) => apiClient.delete(`/company/${id}`),
};

// Nifty endpoints
export const niftyAPI = {
  create: (data: any) => apiClient.post('/nifty', data),
  read: (id?: string) =>
    apiClient.get(`/nifty${id ? `/${id}` : ''}`),
  update: (id: string, data: any) => apiClient.patch(`/nifty/${id}`, data),
  delete: (id: string) => apiClient.delete(`/nifty/${id}`),
};

export default apiClient;

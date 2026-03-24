import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    if (Array.isArray(response.data)) {
      response.data = response.data.map(item => ({
        ...item,
        id: item._id || item.id
      }));
    } else if (response.data && typeof response.data === 'object') {
      response.data.id = response.data._id || response.data.id;
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export default api;
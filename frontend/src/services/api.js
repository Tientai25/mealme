import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

// Add token to requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// Response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Meals
export const getMeals = (params) => API.get('/meals', { params });
export const getMealById = (id) => API.get(`/meals/${id}`);
export const suggestMeals = (data) => API.post('/meals/suggest', data);
export const toggleFavorite = (id) => API.post(`/meals/favorite/${id}`);
export const getFavorites = () => API.get('/meals/favorites');

// Meal Plans
export const getDayPlan = (data) => API.post('/meal-plan/day', data);
export const getWeekPlan = (data) => API.post('/meal-plan/week', data);

// User Profile
export const updateProfile = (data) => API.put('/auth/profile', data);

export default API;

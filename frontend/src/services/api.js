import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  withCredentials: true // Gửi cookies với mọi request
});

// Interceptor để tự động refresh token khi hết hạn
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Nếu lỗi 401 và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Gọi refresh token
        await axios.post('/api/auth/refresh', {}, { withCredentials: true });
        
        // Retry request gốc
        return API(originalRequest);
      } catch (refreshError) {
        // Refresh thất bại, redirect login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
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

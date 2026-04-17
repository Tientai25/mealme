import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Không còn check localStorage
    fetchUser();
    
    // Auto refresh token mỗi 14 phút
    const interval = setInterval(() => {
      refreshAccessToken();
    }, 14 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/auth/me', { withCredentials: true });
      setUser(data);
    } catch (error) {
      // Nếu access token hết hạn, thử refresh
      await refreshAccessToken();
    } finally {
      setLoading(false);
    }
  };
  
  const refreshAccessToken = async () => {
    try {
      const { data } = await axios.post('/api/auth/refresh', {}, { withCredentials: true });
      setUser(data);
    } catch (error) {
      // Refresh token hết hạn, logout
      setUser(null);
    }
  };

  const login = async (email, password) => {
    const { data } = await axios.post('/api/auth/login', { email, password }, { withCredentials: true });
    setUser(data);
    return data;
  };

  const register = async (username, email, password, goal) => {
    const { data } = await axios.post('/api/auth/register', { username, email, password, goal }, { withCredentials: true });
    setUser(data);
    return data;
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

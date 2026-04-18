import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
    
    const newSocket = io(API_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 10,
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);
      setConnected(true);
      
      if (user) {
        newSocket.emit('user:online', user._id);
      }
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
      setConnected(false);
    });

    newSocket.on('notification', (notification) => {
      setNotifications(prev => [notification, ...prev].slice(0, 50));
      
      // Show browser notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('MealMe', {
          body: notification.message,
          icon: '/logo.png'
        });
      }
    });

    newSocket.on('users:online', (users) => {
      setOnlineUsers(users);
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, [user]);

  const emitFavorite = (mealName) => {
    if (socket && user) {
      socket.emit('meal:favorite', {
        username: user.username,
        mealName
      });
    }
  };

  const emitMealCreated = (mealName) => {
    if (socket) {
      socket.emit('meal:created', { mealName });
    }
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  return (
    <SocketContext.Provider value={{
      socket,
      connected,
      notifications,
      onlineUsers,
      emitFavorite,
      emitMealCreated,
      clearNotifications,
      requestNotificationPermission
    }}>
      {children}
    </SocketContext.Provider>
  );
};

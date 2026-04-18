import { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import './NotificationBell.css';

const NotificationBell = () => {
  const { notifications, clearNotifications, connected, requestNotificationPermission } = useSocket();
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setUnreadCount(notifications.length);
  }, [notifications]);

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const handleToggle = () => {
    setShowDropdown(!showDropdown);
    if (!showDropdown) {
      setUnreadCount(0);
    }
  };

  const formatTime = (timestamp) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return 'Vừa xong';
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    return new Date(timestamp).toLocaleDateString('vi-VN');
  };

  return (
    <div className="notification-bell">
      <button className="bell-button" onClick={handleToggle}>
        <span className="bell-icon">🔔</span>
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
        <span className={`status-dot ${connected ? 'online' : 'offline'}`}></span>
      </button>

      {showDropdown && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Thông báo</h3>
            {notifications.length > 0 && (
              <button onClick={clearNotifications} className="clear-btn">Xóa tất cả</button>
            )}
          </div>
          
          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <span>📭</span>
                <p>Chưa có thông báo mới</p>
              </div>
            ) : (
              notifications.map((notif, index) => (
                <div key={index} className={`notification-item ${notif.type}`}>
                  <span className="notif-icon">
                    {notif.type === 'favorite' ? '❤️' : '🍽️'}
                  </span>
                  <div className="notif-content">
                    <p>{notif.message}</p>
                    <span className="notif-time">{formatTime(notif.timestamp)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;

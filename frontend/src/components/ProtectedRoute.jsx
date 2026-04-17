import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="container" style={{ textAlign: 'center', padding: '100px' }}>
      <h2>Đang tải...</h2>
    </div>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

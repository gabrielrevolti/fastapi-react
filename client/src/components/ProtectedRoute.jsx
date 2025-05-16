// src/components/ProtectedRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { token, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  return token ? <Outlet /> : <Navigate to="/tracking/login" />;
};

export default ProtectedRoute;

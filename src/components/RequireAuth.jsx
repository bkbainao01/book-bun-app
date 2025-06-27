// src/components/RequireAuth.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore'; // สมมุติใช้ zustand

export default function RequireAuth({ children }) {
  const isAuthenticated = useAuthStore(state => state.isLoggedIn);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
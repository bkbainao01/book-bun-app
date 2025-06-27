// src/routes.jsx
import { Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import LoginPage from '@/pages/LoginPage';
import UserList from '@/components/user/UserList';
import RequireAuth from '@/components/RequireAuth';
import Dashboard from '@/components/Dashboard';

const routes = [
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/',
    element: (
        <RequireAuth>
            <MainLayout />
        </RequireAuth>
    ),
    children: [
      { path: '', element:  <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'users', element: <UserList /> },
    ]
  }
];

export default routes;

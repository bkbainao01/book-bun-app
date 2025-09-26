// src/routes.jsx
import { Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import LoginPage from '@/pages/ff';
import UserList from '@/components/user/UserList';
import UserViewer from '@/components/user/UserViewer';
import BookList from '@/components/book/BookList';
import BookViewer from '@/components/book/BookViewer';
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
      { path: '', element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      {
        path: 'base-info',
        children: [
          { path: 'users/', element: <UserList /> },
          { path: 'users/create/', element: <UserViewer viewMode={false} editable={true} /> },
          { path: 'users/view/:id/', element: <UserViewer viewMode={true} editable={true} /> },
          { path: 'books/', element: <BookList /> },
          { path: 'books/create/', element: <BookViewer viewMode={false} editable={true} /> },
          { path: 'books/view/:id/', element: <BookViewer viewMode={true} editable={true} /> },
        ]
      }
    ]
  }
];

export default routes;
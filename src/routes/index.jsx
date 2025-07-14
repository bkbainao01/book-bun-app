// src/routes.jsx
import { Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import LoginPage from '@/pages/LoginPage';
import UserList from '@/components/user/UserList';
import UserCreator from '@/components/user/UserCreator';
import UserEditor from '@/components/user/UserEditor';
import BookList from '@/components/book/BookList';
import BookCreator from '@/components/book/BookCreator';
import BookEditor from '@/components/book/BookEditor';
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
          { path: 'users', element: <UserList /> },
          { path: 'users/create/', element: <UserCreator /> },
          { path: 'users/view/:id', element: <UserEditor /> },
          { path: 'books', element: <BookList /> },
          { path: 'books/create', element: <BookCreator /> },
          { path: 'books/view/:id', element: <BookEditor /> },
        ]
      }
    ]
  }
];

export default routes;
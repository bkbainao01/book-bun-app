import { useState } from 'react';
import UserList from '@/components/user/UserList';
import LoginPage from '@/pages/LoginPage';
import ToastContainer from '@/components/ToastContainer';
import { useRoutes } from 'react-router-dom'
import routes from '@/routes';
import './assets/css/index.css'
import './assets/scss/index.scss'

function App() {
  const routing = useRoutes(routes);
  return (
    <div>
      {routing}
      <ToastContainer />
    </div>
  );
}

export default App

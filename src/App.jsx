import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import UserList from '@/components/userComponent/userList';
import LoginPage from '@/pages/loginPage';
import './App.css'

function App() {
  return (
    <>
    <div>
      {/* <UserList></UserList> */}
      <LoginPage></LoginPage>
    </div>
    </>
  )
}

export default App

import { create } from 'zustand';
import { login, logout, register } from '@/services/authService.js';
import { toast } from "sonner"

const getInitialUser = () => {
  try {
    const userData = JSON.parse(localStorage.getItem('userData'))
    return userData?.user || null
  } catch (error) {
    console.error("error >> ",error);
    return null
  }
}

const getInitialToken = () => {
  try {
    const userData = JSON.parse(localStorage.getItem('userData'))
    return userData?.token || null
  } catch (error) {
    console.error("error >> ",error);
    return null
  }
}

const getInitialIsLoggedIn = () => {
  try {
    const userData = JSON.parse(localStorage.getItem('userData'))
    return userData?.isLoggedIn || false
  } catch (error) {
    console.error("error >> ",error);
    return false
  }
}

export const useAuthStore = create((set) => ({
  user: getInitialUser(),
  token:  getInitialToken(),
  isLoggedIn : getInitialIsLoggedIn(),

  login: async (email, password) => {
    try {
      const res = await login(email, password)
      localStorage.setItem('userData',  JSON.stringify(res.data))
      set({ user: res.data.user, token: res.data.token, isLoggedIn: true })
      toast.success('Login Success')
      return res.data
    } catch (error) {
      toast.error(error.title, { description: error.message });
    }
  },
  logout: async () => {
    try {
      const token = useAuthStore.getState().token
      await logout(token)
      localStorage.removeItem('userData')
      set({ user: null, token: null, isLoggedIn: false });
      toast.success('Logout Success')
      window.location.href = '/login';
    } catch (error) {
      toast.error(error.title, { description: error.message });
    }
  },
  register: async (payload)=>{
    try {
      await register(payload)
      toast.success('Register / Create User Success')
    } catch (error) {
      toast.error(error.title, { description: error.message });
    }
  }
}))

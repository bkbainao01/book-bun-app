import { create } from 'zustand';
import { login, logout, register, authGoogle, authGoogleCallback } from '@/services/authService.js';
import { toast } from "sonner"
import { jwtDecode } from "jwt-decode"

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

  resetAuth: () => {
    localStorage.removeItem('userData');
    set({ user: null, token: null, isLoggedIn: false });
  },

  login: async (email, password, navigate=null) => {
    try {
      const res = await login(email, password)
      localStorage.setItem('userData',  JSON.stringify(res.data))
      set({ user: res.data.user, token: res.data.token, isLoggedIn: true })
      toast.success('Login Success')
      if(navigate) {
        navigate('/dashboard', { replace: true })
      }
      return res.data
    } catch (error) {
      toast.error(error.title, { description: error.message });
    }
  },

  authGoogle: async () => {
    try {
      return authGoogle();
    } catch (error) {
      toast.error(error.title, { description: error.message });
    }
  },

  afterAuthGoogleCallback: async (token, navigate=null) => {
    try {
      const userData = jwtDecode(token)

      if (!userData && !userData.user && !userData.token) {
        toast.error('Login failed', { description: 'Invalid token data' });
        return;
      }

      localStorage.setItem('userData', JSON.stringify(userData))
      set({ user: userData.user , token: userData.token, isLoggedIn: true })

      toast.success('Login Success')
      setTimeout(() => {
        if (navigate) {
          navigate('/dashboard', { replace: true })
        }
      }, 3000);
      return userData
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

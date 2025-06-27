import { create } from 'zustand'
import { login } from '@/services/authService.js'

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
      return res.data
    } catch (error) {
      throw new Error(error.message)
    }
  },
  logout: () => set({ user: null, token: null }),
}))

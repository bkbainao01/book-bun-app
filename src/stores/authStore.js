import { create } from 'zustand'
import authService from '@/services/authService.js'

export const useAuthStore = create((set) => ({
  user: null,
  token: null,

  login: async (username, password) => {
    try {
      const res = authService.login(username, password)
      set({ user: res.data.user, token: res.data.token })
      return res.data
    } catch (err) {
      throw err
    }
  },

  logout: () => set({ user: null, token: null }),
}))

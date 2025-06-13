import { create } from 'zustand'
import { login } from '@/services/authService.js'

export const useAuthStore = create((set) => ({
  user: null,
  token: null,

  login: async (email, password) => {
    const res = await login(email, password)
    set({ user: res.data.user, token: res.data.token })
    return res.data
  },

  logout: () => set({ user: null, token: null }),
}))

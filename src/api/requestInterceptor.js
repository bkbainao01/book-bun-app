import { useAuthStore } from "@/stores/authStore"
export default function requestInterceptor(config) {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

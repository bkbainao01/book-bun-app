const authPath = '/api/v1/auth'
import axios from '@/api/axios'
// ฟังก์ชันเรียก API login
export async function login(email, password) {
  try {
    const res = await axios.post(`${authPath}/login`, { email, password })
    return res.data
  } catch (error) {
    throw new Error(error)
  }
}

// ฟังก์ชัน logout
export async function logout() {
  try {
    const res = await axios.post(`${authPath}/logout`)
    return res.data
  } catch (error) {
    throw new Error('Logout failed')
  }
}

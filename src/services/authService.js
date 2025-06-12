import axios from 'axios'
const authPath = '/api/v1/auth'
// ฟังก์ชันเรียก API login
export async function login(username, password) {
  try {
    const res = await axios.post(`${authPath}/login`, { username, password })
    return res.data
  } catch (error) {
    throw new Error('Login failed')
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

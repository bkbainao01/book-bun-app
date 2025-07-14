import axios from '@/api/axios'

const authPath = '/api/v1/auth'

// function for login
export async function login(email, password) {
  try {
    const res = await axios.post(`${authPath}/login`, { email, password })
    return res.data
  } catch (error) {
    throw new Error(error)
  }
}

// function logout
export async function logout(token) {
  try {
    const res = await axios.post(`${authPath}/logout`, {token: token})
    return res.data
  } catch (error) {
    throw new Error(error)
  }
}

// function new user
export async function register(payload) {
  try {
    const res = await axios.post(`${authPath}/register`, payload)
    return res.data
  } catch (error) {
    throw new Error(error)
  }
}

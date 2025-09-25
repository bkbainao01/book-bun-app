import axios from '@/api/axios'
import { config } from '@/config/config.js';
const authPath = '/api/v1/auth'
// function for login
export async function login(email, password) {
  try {
    const res = await axios.post(`${authPath}/login`, { email, password })
    return res.data
  } catch (error) {
    console.error("error: ", error)
    throw error
  }
}

// function logout
export async function logout(token) {
  try {
    const res = await axios.post(`${authPath}/logout`, {token: token})
    return res.data
  } catch (error) {
    console.error("error: ", error)
    throw error
  }
}

// function new user
export async function register(payload) {
  try {
    const res = await axios.post(`${authPath}/register`, payload)
    return res.data
  } catch (error) {
    console.error("error: ", error)
    throw error
  }
}

export async function authGoogle() {
  try {
    window.location.href = `${config.baseUrl}${authPath}/google`;
    return { };
  } catch (error) {
    console.error("error: ", error)
    throw error
  }
}

export async function authMicrosoft() {
  try {
    window.location.href = `${config.baseUrl}${authPath}/microsoft`;
    return { };
  } catch (error) {
    console.error("error: ", error)
    throw error
  }
}

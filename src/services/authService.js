import axios from '@/api/axios'

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
    // const res = await axios.get(`${authPath}/google`)
    // console.log("🚀 ~ authGoogle ~ res:", res)
    window.location.href = 'http://localhost:5175/api/v1/auth/google'
    return { };
  } catch (error) {
    console.error("error: ", error)
    throw error
  }
}

export async function authGoogleCallback() {
  try {
    const res = await axios.get(`${authPath}/google/callback`)
    return res.data
  } catch (error) {
    console.error("error: ", error)
    throw error
  }
}

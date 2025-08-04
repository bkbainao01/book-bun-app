
import axios from '@/api/axios'

const rolePath = '/api/v1/roles'

// ฟังก์ชันเรียก API ข้อมูล user
export async function getAll(params) {
  try {
    const queryParams = ''
    const res = await axios.get(`${rolePath}?${queryParams}`)
    return res.data
  } catch (error) {
    console.error("error: ", error)
    throw error
  }
}

export async function getById(id) {
  try {
    const res = await axios.get(`${rolePath}/${id}`)
    return res.data
  } catch (error) {
    console.error("error: ", error)
    throw error
  }
}

// export async function create(payload) {
//   try {
//     const res = await axios.post(`${rolePath}`, payload)
//     return res.data
//   } catch (error) {
//     console.error("error: ", error)
//     throw error
//   }
// }

// export async function update(id,payload) {
//   try {
//     const res = await axios.put(`${rolePath}/${id}`, payload)
//     return res.data
//   } catch (error) {
//     console.error("error: ", error)
//     throw error
//   }
// }

// export async function remove(id) {
//   try {
//     const res = await axios.delete(`${rolePath}/${id}`)
//     return res.data
//   } catch (error) {
//     console.error("error: ", error)
//     throw error
//   }
// }


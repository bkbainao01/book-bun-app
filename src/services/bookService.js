
import axios from '@/api/axios'

const bookPath = '/api/v1/books'

// ฟังก์ชันเรียก API ข้อมูล user
export async function getAll(params) {
  try {
    const queryParams = ''
    const res = await axios.get(`${bookPath}?${queryParams}`)
    return res.data
  } catch (error) {
    console.error("error: ", error)
    throw error
  }
}

export async function getById(id) {
  try {
    const res = await axios.get(`${bookPath}/${id}`)
    return res.data
  } catch (error) {
    console.error("error: ", error)
    throw error
  }
}

export async function create(payload) {
  try {
    const res = await axios.post(`${bookPath}`, payload)
    return res.data
  } catch (error) {
    console.error("error: ", error)
    throw error
  }
}

export async function update(id,payload) {
  try {
    const res = await axios.put(`${bookPath}/${id}`, payload)
    return res.data
  } catch (error) {
    console.error("error: ", error)
    throw error
  }
}

export async function remove(id) {
  try {
    const res = await axios.delete(`${bookPath}/${id}`)
    return res.data
  } catch (error) {
    console.error("error: ", error)
    throw error
  }
}

export async function deleteBook(id) {
  try {
    const res = await axios.delete(`${bookPath}/${id}`);
    return res.data
  } catch (error) {
    console.error("error: ", error)
    throw error
  }
}

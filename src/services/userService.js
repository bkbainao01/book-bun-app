import config from '@/config/config'

const userPath = '/api/v1/users'

// ฟังก์ชันเรียก API ข้อมูล user
export async function getAll(params) {
  try {
    const queryParams = ''
    const res = await axios.get(`${userPath}?${queryParams}`)
    return res.data
  } catch (error) {
    throw new Error('Fetch user failed')
  }
}

export async function getById(id) {
  try {
    const res = await axios.get(`${userPath}/${id}`)
    return res.data
  } catch (error) {
    throw new Error('Fetch user failed')
  }
}

export async function create(payload) {
  try {
    const res = await axios.post(`${userPath}`, payload)
    return res.data
  } catch (error) {
    throw new Error('Fetch user failed')
  }
}

export async function update(id,payload) {
  try {
    const res = await axios.put(`${userPath}/${id}`, payload)
    return res.data
  } catch (error) {
    throw new Error('Fetch user failed')
  }
}

export async function remove(id) {
  try {
    const res = await axios.delete(`${userPath}/${id}`)
    return res.data
  } catch (error) {
    throw new Error('Fetch user failed')
  }
}


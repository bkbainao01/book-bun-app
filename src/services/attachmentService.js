
import axios from '@/api/axios'

const attachmentPath = '/api/v1/attachments'

// ฟังก์ชันเรียก API ข้อมูล user
export async function getAll(params) {
  try {
    const queryParams = ''
    const res = await axios.get(`${attachmentPath}?${queryParams}`)
    return res.data
  } catch (error) {
    console.error("error: ", error)
    throw error
  }
}

export async function getById(id) {
  try {
    const res = await axios.get(`${attachmentPath}/${id}`)
    return res.data
  } catch (error) {
    console.error("error: ", error)
    throw error
  }
}

export async function create(payload, onProgress) {
  try {
    const setProgress = (evt)=>{
        if (evt.total > 0 && onProgress) {
          const percent = Math.round((evt.loaded * 100) / evt.total);
          onProgress(percent);
        }
      }
    const res = await axios.post(`${attachmentPath}`, payload, {
      onUploadProgress: (evt) => setProgress(evt),
    });
    return res.data;
  } catch (error) {
    console.error("error: ", error);
    throw error;
  }
}

export async function update(id,payload) {
  try {
    const res = await axios.put(`${attachmentPath}/${id}`, payload)
    return res.data
  } catch (error) {
    console.error("error: ", error)
    throw error
  }
}

export async function remove(id) {
  try {
    const res = await axios.delete(`${attachmentPath}/${id}`)
    return res.data
  } catch (error) {
    console.error("error: ", error)
    throw error
  }
}


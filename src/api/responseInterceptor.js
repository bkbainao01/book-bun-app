
const onSuccess = (response) => {
  return response
}

const onError = (error) => {
  let errorMessage = 'Something went wrong.'

  if (error.response) {
    // ถ้ามี response จาก server
    const { status, data } = error.response;

    if (data?.message) {
      errorMessage = data.message
    } else if (status === 404) {
      errorMessage = 'Resource not found.'
    } else if (status === 401) {
      errorMessage = 'Unauthorized.'
      // อาจ logout อัตโนมัติ หรือ redirect ได้เลย
    }
  } else if (error.request) {
    // ถ้า network error ไม่มี response กลับมา
    errorMessage = 'Network error. Please check your internet connection.'
  } else {
    // ถ้าเป็น error อื่น ๆ (เช่น syntax, timeout ฯลฯ)
    errorMessage = error.message
  }
  console.error('API Error:', errorMessage)
  // ส่ง errorMessage ออกไปให้คนเรียกใช้งานไป handle ต่อ
  throw errorMessage
}

export default { onSuccess, onError }

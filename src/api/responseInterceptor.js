import { useAuthStore } from "@/stores/authStore"

const onSuccess = (response) => {
  return response
}

const onError = async (error) => {
  let errorObj = {
    title: 'Error',
    message: 'Error occurred while processing your request.',
    statusCode: error.response?.status,
  }

  if (error.response) {
    // ถ้ามี response จาก server
    const { status, data } = error.response;

    if (data?.message) {
      errorObj.message = data.message
    } else if (status === 404) {
      errorObj.title = 'Not Found'
      errorObj.message = 'Resource not found.'
    } else if (status === 401) {
      errorObj.title = 'Unauthorized'
      errorObj.message = `${error.response.data}. Please login again.`
      await useAuthStore.getState().logout()
    }

  } else if (error.request) {
    // ถ้า network error ไม่มี response กลับมา
    errorObj.message = 'Network error. Please check your internet connection.'
  } else {
    // ถ้าเป็น error อื่น ๆ (เช่น syntax, timeout ฯลฯ)
    errorObj.message = error.message
  }

  throw errorObj
}

export default { onSuccess, onError }

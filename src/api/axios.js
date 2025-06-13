import axios from 'axios'
import requestInterceptor from './requestInterceptor'
import responseInterceptor from './responseInterceptor'
import { config } from '../config/config'

const baseURL = config.baseUrl
console.log("🚀 ~ baseURL:", baseURL)

const api = axios.create({
  baseURL: baseURL,
  timeout: 10000,
})

api.interceptors.request.use(requestInterceptor)
api.interceptors.response.use(
  responseInterceptor.onSuccess,
  responseInterceptor.onError
)

export default api

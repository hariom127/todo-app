import axios from 'axios'
import config from '../config'
const language = localStorage.getItem('language')

// create Intance of axios
const axiosInc = axios.create({
  baseURL: config.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    language: language ? language : 'en',
  },
})

axiosInc.interceptors.request.use((config) => {
  return config
})

export default axiosInc

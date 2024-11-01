import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8888',
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('persist:root')
            ? JSON.parse(JSON.parse(localStorage.getItem('persist:root')).admin)
                  .token
            : null

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

export default axiosInstance

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8888',
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Log the error for debugging
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;

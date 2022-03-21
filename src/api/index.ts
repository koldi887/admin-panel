import axios from 'axios';

export const API_URL = 'https://piar.meew.me/'

export const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// instance.interceptors.request.use((config) => {
//     // @ts-ignore
//     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
//     return config
// })

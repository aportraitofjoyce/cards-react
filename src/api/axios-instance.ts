import axios from 'axios'

const developmentMode = true

export const axiosInstance = axios.create({
    baseURL: developmentMode ? 'http://localhost:7542/2.0' : 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true
})
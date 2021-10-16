import {axiosInstance} from './axios-instance'
import {AxiosResponse} from 'axios'

export type RegisterUsersData = {
    email: string
    password: string
}

export const registerAPI = {
    register: (data: RegisterUsersData) => axiosInstance
        .post<RegisterUsersData, AxiosResponse<{ error?: string }>>('/auth/register', data)
        .then(res => res.data)
}
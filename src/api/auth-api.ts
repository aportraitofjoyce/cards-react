import {instance} from './axios-instance'
import {AxiosResponse} from 'axios'

// Types
type ResponseError = {
    error?: string
}

export type RegistrationsData = {
    email: string
    password: string
}

type LogoutResponse = {
    info: string
    error?: string
}

export type UsersInfoResponse = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}

export type ChangeUsersInfoPayload = {
    name: string
    avatar: string
}

// API
export const authAPI = {
    registration: (registrationData: RegistrationsData) => instance
        .post<RegistrationsData, AxiosResponse<ResponseError>>('/auth/register', registrationData),

    logout: () => instance
        .delete<LogoutResponse>('/auth/me'),

    checkAuth: () => instance
        .post<{}, AxiosResponse<UsersInfoResponse>>('/auth/me', {}),

    changeUsersInfo: (info: ChangeUsersInfoPayload) => instance
        .put<ChangeUsersInfoPayload, AxiosResponse<UsersInfoResponse>>('/auth/me', info),


    login: () => instance,
    passwordRecovery: () => instance,
    newPassword: () => instance
}
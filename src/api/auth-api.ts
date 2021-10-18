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

export type  ForgotRequestType = {
    email: string,
    from: string,
    message: string
}

export type SetNewPasswordRequestType = {
    password: string,
    resetPasswordToken: string | undefined
}

export type PasswordResponse = {
    info: string,
    error: string
}

// API
export const authAPI = {
    registration: (payload: RegistrationsData) => instance
        .post<RegistrationsData, AxiosResponse<ResponseError>>('/auth/register', payload),

    logout: () => instance
        .delete<LogoutResponse>('/auth/me'),

    checkAuth: () => instance
        .post<{}, AxiosResponse<UsersInfoResponse>>('/auth/me', {}),

    changeUsersInfo: (payload: ChangeUsersInfoPayload) => instance
        .put<ChangeUsersInfoPayload, AxiosResponse<UsersInfoResponse>>('/auth/me', payload),

    login: () => instance,

    passwordRecovery: (payload: ForgotRequestType) => instance
        .post<ForgotRequestType, AxiosResponse<PasswordResponse>>(`/auth/forgot`, payload),

    newPassword: (payload: SetNewPasswordRequestType) => instance
        .post<SetNewPasswordRequestType, AxiosResponse<PasswordResponse>>(`/auth/set-new-password`, payload)
}
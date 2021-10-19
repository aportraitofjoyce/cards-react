import {AxiosResponse} from "axios";
import {instance} from './axios-instance'

export type LoginRequestType = {
    email: string,
    password: string,
    rememberMe: boolean
}

export type LoginResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}

export const loginApi = {
    login(data: LoginRequestType) {
        return instance.post<LoginRequestType, AxiosResponse<LoginResponseType>>(`/auth/login`, data)
    },
}

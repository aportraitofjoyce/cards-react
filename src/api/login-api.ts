import {Instance} from "./axios-instance";
import {AxiosResponse} from "axios";

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
    login(email: string, password: string,
          rememberMe: boolean) {
        return Instance.post<LoginRequestType, AxiosResponse<LoginResponseType>>(`/auth/login`, {
            email,
            password,
            rememberMe
        })
    },
}

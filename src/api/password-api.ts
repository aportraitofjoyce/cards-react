import {instance} from "./axios-instance";
import {AxiosResponse} from "axios";

export type ForgotRequestType = {
    email: string,
    from: string,
    message: string
}

export type SetNewPasswordRequestType = {
    password: string,
    resetPasswordToken: string | undefined
}


export type ResponseType = {
    info: string,
    error: string
}

export const passwordApi = {
    forgot(payload: ForgotRequestType) {
        return instance.post<ForgotRequestType, AxiosResponse<ResponseType>>(`/auth/forgot`, payload);
    },

    setNewPassword(payload: SetNewPasswordRequestType) {
        return instance.post<SetNewPasswordRequestType, AxiosResponse<ResponseType>>(`/auth/set-new-password`, payload);
    }
}

//TYPES


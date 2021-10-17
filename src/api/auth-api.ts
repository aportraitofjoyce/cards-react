import {Instance} from "./axios-instance";

export const authApi = {
    authME() {
        return Instance.post(`auth/me`)
    },
}
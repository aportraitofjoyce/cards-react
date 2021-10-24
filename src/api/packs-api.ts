import {instance} from './axios-instance'
import {AxiosResponse} from 'axios'


// Requests

export type PackResponseType = {
    cardPacks: [
        {
            _id: string
            user_id: string
            name: string
            path: string // папка
            cardsCount: number
            grade: number // средняя оценка карточек
            shots: number // количество попыток
            rating: number // лайки
            type: string // ещё будет "folder" (папка)
            created: string
            updated: string
            __v: number
        },
    ]
    cardPacksTotalCount: number // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number // количество элементов на странице
}

export const packsAPI = {
    getPacks: () => instance
        .get<AxiosResponse<PackResponseType>>('/cards/pack'),

    // logout: () => instance
    //     .delete<LogoutResponse>('/auth/me'),
    //
    // checkAuth: () => instance
    //     .post<{}, AxiosResponse<UsersInfoResponse>>('/auth/me', {}),
    //
    // changeUsersInfo: (payload: ChangeUsersInfoData) => instance
    //     .put<ChangeUsersInfoData, AxiosResponse<UpdateUserResponse>>('/auth/me', payload),
    //
    // login: (payload: LoginData) => instance
    //     .post<LoginData, AxiosResponse<UsersInfoResponse>>(`/auth/login`, payload),
    //
    // passwordRecovery: (payload: PasswordRecoveryData) => axios
    //     .post<PasswordRecoveryData, AxiosResponse<PasswordResponse>>('https://neko-back.herokuapp.com/2.0/auth/forgot', payload),
    //
    // newPassword: (payload: NewPasswordData) => axios
    //     .post<NewPasswordData, AxiosResponse<PasswordResponse>>(`https://neko-back.herokuapp.com/2.0/auth/set-new-password`, payload)
}
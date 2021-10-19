import {loginApi, LoginRequestType} from "../../api/login-api";
import {Dispatch} from "redux";
import {AxiosError} from "axios";

const SET_USER_DATA = 'SET_USER_DATA'
const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS'

export type TouchedStatusType = 'isTouched' | 'notTouched'
export type LoginStatusType = 'succeeded' | 'failed'

type LoginInitialState = {
    name: string,
    avatar: string,
    publicCardPacksCount: number,
    status: LoginStatusType
}

const initialState: LoginInitialState = {
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    status: 'failed'
}


export const loginReducer = (state = initialState, action: LoginActionType): LoginInitialState => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                avatar: action.payload.avatar,
                name: action.payload.name,
                publicCardPacksCount: action.payload.publicCardPacksCount
            }
        }
        case SET_LOGIN_STATUS:
            return {...state, status: action.status}

        default:
            return state
    }
}

// ActionsTypes

export type LoginActionType =
    ReturnType<typeof setUserData>
    | ReturnType<typeof setLoginStatus>

// Actions

export const setUserData = (name: string, avatar: string, publicCardPacksCount: number) => {
    return {type: SET_USER_DATA, payload: {name, avatar, publicCardPacksCount}} as const
}

export const setLoginStatus = (status: LoginStatusType) => {
    return {type: SET_LOGIN_STATUS, status} as const
}

//Thunk

export const userPostLogin = (data: LoginRequestType) => (dispatch: Dispatch) => {
    loginApi.login(data)
        .then((res) => {
            let {email, avatar, publicCardPacksCount} = res.data
            dispatch(setUserData(email, avatar, publicCardPacksCount))
            dispatch(setLoginStatus('succeeded'))
        })
        .catch((e: AxiosError<any>) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log('Error:', {...e})
            dispatch(setLoginStatus('failed'))
            alert(error)
        })
        .finally()
}
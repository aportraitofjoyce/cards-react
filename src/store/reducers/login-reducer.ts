import {loginApi} from "../../api/login-api";
import {Dispatch} from "redux";

const SET_USER_DATA = 'SET_USER_DATA'

type InitialStateType = {
    name: string,
    avatar: string,
    publicCardPacksCount: number,
}

const initialState: InitialStateType = {
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
}


export const loginReducer = (state = initialState, action: LoginActionType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                avatar: action.payload.avatar,
                name: action.payload.name,
                publicCardPacksCount: action.payload.publicCardPacksCount
            }
        }
        default:
            return state
    }
}

// ActionsTypes

export type LoginActionType =
    ReturnType<typeof setUserData>

// Actions

export const setUserData = (name: string, avatar: string, publicCardPacksCount: number) => {
    return {type: SET_USER_DATA, payload: {name, avatar, publicCardPacksCount}} as const
}

//Thunk


export const userPostLogin = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    loginApi.login(email, password, rememberMe)
        .then((res) => {
            let {email, avatar, publicCardPacksCount} = res.data
            dispatch(setUserData(email, avatar, publicCardPacksCount))
        })
        .catch((e: any) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log('Error:', {...e})
        })
        .finally()
}
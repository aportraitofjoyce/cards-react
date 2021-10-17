import {authAPI, ChangeUsersInfoPayload, RegistrationsData, UsersInfoResponse} from '../../api/auth-api'
import {AppDispatch} from '../store'
import {AxiosResponse} from 'axios'

// Types
enum AUTH_ACTIONS_TYPES {
    SET_REGISTRATION_SUCCESS = 'AUTH/SET_REGISTRATION_SUCCESS',
    SET_USERS_INFO = 'AUTH/SET_USERS_INFO',
    SET_IS_LOGGED_IN = 'AUTH/SET_IS_LOGGED_IN',
}

export type AuthActions =
    | ReturnType<typeof setRegistrationSuccess>
    | ReturnType<typeof setUsersInfo>
    | ReturnType<typeof setIsLoggedIn>

type InitialState = {
    registrationSuccess: boolean,
    isLoggedIn: boolean,
    userInfo: UsersInfoResponse | null
}


// State
const initialState: InitialState = {
    registrationSuccess: false,
    isLoggedIn: false,
    userInfo: null
}


// Reducer
export const authReducer = (state = initialState, action: AuthActions): InitialState => {
    switch (action.type) {
        case AUTH_ACTIONS_TYPES.SET_REGISTRATION_SUCCESS:
            return {...state, registrationSuccess: action.payload.status}

        case AUTH_ACTIONS_TYPES.SET_USERS_INFO:
            return {...state, userInfo: action.payload}

        case AUTH_ACTIONS_TYPES.SET_IS_LOGGED_IN:
            return {...state, isLoggedIn: action.payload.status}

        default:
            return state
    }
}


// Actions
const setRegistrationSuccess = (status: boolean) => ({
    type: AUTH_ACTIONS_TYPES.SET_REGISTRATION_SUCCESS,
    payload: {status}
} as const)

const setUsersInfo = (info: UsersInfoResponse | null) => ({
    type: AUTH_ACTIONS_TYPES.SET_USERS_INFO,
    payload: info
} as const)

const setIsLoggedIn = (status: boolean) => ({
    type: AUTH_ACTIONS_TYPES.SET_IS_LOGGED_IN,
    payload: {status}
} as const)


// Thunks
export const registration = (registrationsData: RegistrationsData) => async (dispatch: AppDispatch) => {
    try {
        await authAPI.registration(registrationsData)
        dispatch(setRegistrationSuccess(true))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        console.log({...e})
    } finally {
        dispatch(setRegistrationSuccess(false))
    }
}

export const logout = () => async (dispatch: AppDispatch) => {
    try {
        const response = await authAPI.logout()
        dispatch(setUsersInfo(null))
        dispatch(setIsLoggedIn(false))
    } catch (e) {
    }
}

export const checkAuth = () => async (dispatch: AppDispatch) => {
    try {
        const response = await authAPI.checkAuth()
        dispatch(setUsersInfo(response.data))
        dispatch(setIsLoggedIn(true))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        console.log({...e})
    }
}

export const changeUsersInfo = (info: ChangeUsersInfoPayload) => async (dispatch: AppDispatch) => {
    try {
        const response = await authAPI.changeUsersInfo(info)
        dispatch(setUsersInfo(response.data))
    } catch (e) {
    }
}


export const login = () => async (dispatch: AppDispatch) => {
}

export const passwordRecovery = () => async (dispatch: AppDispatch) => {
}

export const newPassword = () => async (dispatch: AppDispatch) => {
}
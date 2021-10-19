import {
    authAPI,
    ChangeUsersInfoPayload,
    ForgotRequestType,
    RegistrationsData,
    UsersInfoResponse
} from '../../api/auth-api'
import {AppDispatch} from '../store'
import {setAppError, setAppInitialized, setAppStatus} from './app-reducer'
import {PATH} from '../../routes/routes'

// Types
enum AUTH_ACTIONS_TYPES {
    SET_REGISTRATION_SUCCESS = 'AUTH/SET_REGISTRATION_SUCCESS',
    SET_USERS_INFO = 'AUTH/SET_USERS_INFO',
    SET_IS_LOGGED_IN = 'AUTH/SET_IS_LOGGED_IN',
    SET_EMAIL_RECOVERY = 'AUTH/SET_EMAIL_RECOVERY',
    SET_SUCCESS_PASSWORD = 'AUTH/SET_SUCCESS_PASSWORD',
    SEND_RECOVERY_EMAIL_SUCCESS = 'AUTH/SEND_RECOVERY_EMAIL_SUCCESS',
}

export type AuthActions =
    | ReturnType<typeof setRegistrationSuccess>
    | ReturnType<typeof setUsersInfo>
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setEmailRecovery>
    | ReturnType<typeof setSuccessPassword>
    | ReturnType<typeof setSendEmailSuccess>

export type AuthInitialState = {
    registrationSuccess: boolean,
    isLoggedIn: boolean,
    recoveryEmail: string | null,
    userInfo: UsersInfoResponse | null,
    setSuccessNewPass: boolean,
    sendSuccessEmail: boolean,
}

// State
const initialState: AuthInitialState = {
    registrationSuccess: false,
    isLoggedIn: false,
    recoveryEmail: null,
    userInfo: null,
    setSuccessNewPass: false,
    sendSuccessEmail: false,
}

// Reducer
export const authReducer = (state = initialState, action: AuthActions): AuthInitialState => {
    switch (action.type) {
        case AUTH_ACTIONS_TYPES.SET_REGISTRATION_SUCCESS:
            return {...state, registrationSuccess: action.payload.status}

        case AUTH_ACTIONS_TYPES.SET_USERS_INFO:
            return {...state, userInfo: action.payload}

        case AUTH_ACTIONS_TYPES.SET_IS_LOGGED_IN:
            return {...state, isLoggedIn: action.payload.status}

        case AUTH_ACTIONS_TYPES.SET_EMAIL_RECOVERY:
            return {...state, recoveryEmail: action.payload.email}

        case AUTH_ACTIONS_TYPES.SET_SUCCESS_PASSWORD:
            return {...state, setSuccessNewPass: action.payload.changePassSuccess}

        case AUTH_ACTIONS_TYPES.SEND_RECOVERY_EMAIL_SUCCESS:
            return {...state, sendSuccessEmail: action.payload.successSend}

        default:
            return state
    }
}

// Actions
export const setRegistrationSuccess = (status: boolean) => ({
    type: AUTH_ACTIONS_TYPES.SET_REGISTRATION_SUCCESS,
    payload: {status}
} as const)

export const setUsersInfo = (info: UsersInfoResponse | null) => ({
    type: AUTH_ACTIONS_TYPES.SET_USERS_INFO,
    payload: info
} as const)

export const setIsLoggedIn = (status: boolean) => ({
    type: AUTH_ACTIONS_TYPES.SET_IS_LOGGED_IN,
    payload: {status}
} as const)

export const setEmailRecovery = (email: string) => ({
    type: AUTH_ACTIONS_TYPES.SET_EMAIL_RECOVERY,
    payload: {email}
} as const)

export const setSuccessPassword = (changePassSuccess: boolean) => ({
    type: AUTH_ACTIONS_TYPES.SET_SUCCESS_PASSWORD,
    payload: {changePassSuccess}
} as const)

export const setSendEmailSuccess = (successSend: boolean) => ({
    type: AUTH_ACTIONS_TYPES.SEND_RECOVERY_EMAIL_SUCCESS,
    payload: {successSend}
} as const)

// Thunks
export const registration = (registrationsData: RegistrationsData) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatus('loading'))
        await authAPI.registration(registrationsData)
        dispatch(setRegistrationSuccess(true))
        dispatch(setAppStatus('succeeded'))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        dispatch(setAppStatus('failed'))
        dispatch(setAppError(error))
        alert(error)
    } finally {
        dispatch(setRegistrationSuccess(false))
    }
}

export const logout = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatus('loading'))
        await authAPI.logout()
        dispatch(setUsersInfo(null))
        dispatch(setIsLoggedIn(false))
        dispatch(setAppStatus('succeeded'))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        dispatch(setAppStatus('failed'))
        dispatch(setAppError(error))
    }
}

export const checkAuth = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatus('loading'))
        const response = await authAPI.checkAuth()
        dispatch(setUsersInfo(response.data))
        dispatch(setIsLoggedIn(true))
        dispatch(setAppStatus('succeeded'))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        dispatch(setAppStatus('failed'))
        dispatch(setAppError(error))
    } finally {
        dispatch(setAppInitialized(true))
    }
}

export const changeUsersInfo = (info: ChangeUsersInfoPayload) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatus('loading'))
        const response = await authAPI.changeUsersInfo(info)
        dispatch(setUsersInfo(response.data))
        dispatch(setAppStatus('succeeded'))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        dispatch(setAppStatus('failed'))
        dispatch(setAppError(error))
    }
}

export const login = () => async (dispatch: AppDispatch) => {
}

export const passwordRecovery = (email: string) => async (dispatch: AppDispatch) => {
    const linkInRecoverEmailToLocal = `http://localhost:3000/cards-react/#${PATH.NEW_PASSWORD}/$token$`
    const linkInRecoverEmailToGithubPages = `https://aportraitofjoyce.github.io/cards-react/#${PATH.NEW_PASSWORD}/$token$`
    try {
        const payload: ForgotRequestType = {
            email,
            from: 'test-front-admin,<sberBank_security@gmail.com>',
            message: `<div style='background-color: #ffb700; padding: 15px'>password recovery link: <a href='${linkInRecoverEmailToLocal}'>link</a></div>`
        }
        dispatch(setAppStatus('loading'))
        await authAPI.passwordRecovery(payload)
        dispatch(setSendEmailSuccess(true))
        dispatch(setEmailRecovery(email))
        dispatch(setAppStatus('succeeded'))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        dispatch(setAppStatus('failed'))
        dispatch(setAppError(error))
    }
}

export const newPassword = (password: string, resetPasswordToken: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatus('loading'))
        const response = await authAPI.newPassword({password, resetPasswordToken})
        if (response.status === 200) {
            dispatch(setSuccessPassword(true))
            dispatch(setAppStatus('succeeded'))
        }
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        dispatch(setAppStatus('failed'))
        dispatch(setAppError(error))
    }
}
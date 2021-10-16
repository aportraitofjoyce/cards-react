import {AppDispatch} from '../store'
import {registerAPI, RegisterUsersData} from '../../api/register-api'

const initialState = {
    registerSuccess: false
}

export const registerReducer = (state = initialState, action: RegisterActionsType): typeof initialState => {
    switch (action.type) {
        case 'REGISTER':
            return {...state, registerSuccess: action.payload.status}
        default:
            return state
    }
}

export type RegisterActionsType = ReturnType<typeof setRegisterData>

const setRegisterData = (status: boolean) => ({
    type: 'REGISTER', payload: {status}
} as const)

export const register = (data: RegisterUsersData) => async (dispatch: AppDispatch) => {
    try {
        await registerAPI.register(data)
        dispatch(setRegisterData(true))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
        alert(error)
    } finally {
    }
}
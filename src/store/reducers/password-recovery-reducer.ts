import {Dispatch} from "redux";
import {ForgotRequestType, passwordApi} from "../../api/password-api";
import {PATH} from "../../routes/routes";

type InitialStateType = {
    email: string
}

const initialState: InitialStateType = {
    email: 'your email'
}

export const passwordRecoveryReducer = (state = initialState, action: ActionsType): typeof initialState => {
    switch (action.type) {
        case "recovery/SET-EMAIL":
            return {...state, email: action.email}
        default:
            return state
    }
}

//THUNKS
//TODO при деплое на GH-PAGES изменить на linkInRecoverEmailToGithubPages
export const forgotPassTC = (email: string) => async (dispatch: Dispatch) => {
    const linkInRecoverEmailToLocal = `http://localhost:3000/cards-react#${PATH.NEW_PASSWORD}/$token$`
    const linkInRecoverEmailToGithubPages = `https://aportraitofjoyce.github.io/cards-react#${PATH.NEW_PASSWORD}/$token$`

    try {
        const payload: ForgotRequestType = {
            email,
            from: 'test-front-admin,<sberBank_security@gmail.com>',
            message: `<div style='background-color: lime; padding: 15px'>password recovery link: <a href=${linkInRecoverEmailToLocal}>link</a></div>`
        };
        dispatch(setEmailRecovery(email));
        await passwordApi.forgot(payload);
    } catch (error) {
        console.log('some error forgotPassTC');
    }
}

export const setNewPasswordTC = (token: string, password: string) => async (dispatch: Dispatch) => {
    try {
        const payload = {
            password: password,
            resetPassToken: token
        }
        await passwordApi.setNewPassword(payload);
        alert('пароль изменён');
    } catch (error) {
        console.log('some error setNewPasswordTC');
    }
}

//ACTIONS

export const setEmailRecovery = (email: string) => ({type: 'recovery/SET-EMAIL', email} as const);

//TYPES

type ActionsType = SetEmailRecoveryType;

type SetEmailRecoveryType = ReturnType<typeof setEmailRecovery>;
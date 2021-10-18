import {Dispatch} from "redux";
import {ForgotRequestType, passwordApi, SetNewPasswordRequestType} from "../../api/password-api";
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
//TODO при деплое на GH-PAGES изменить в payload:message <a href на linkInRecoverEmailToGithubPages
//добавил / в пути. надо проверить на gh-pages
export const forgotPassTC = (email: string) => async (dispatch: Dispatch) => {
    const linkInRecoverEmailToLocal = `http://localhost:3000/cards-react/#${PATH.NEW_PASSWORD}/$token$`
    const linkInRecoverEmailToGithubPages = `https://aportraitofjoyce.github.io/cards-react/#${PATH.NEW_PASSWORD}/$token$`

    try {
        const payload: ForgotRequestType = {
            email,
            from: 'test-front-admin,<sberBank_security@gmail.com>',
            message: `<div style='background-color: lime; padding: 15px'>password recovery link: <a href=${linkInRecoverEmailToLocal}>link</a></div>`
        };
        dispatch(setEmailRecovery(email));
        await passwordApi.forgot(payload);
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + 'some error')
        alert(error)
    }
}

export const setNewPasswordTC = (password: string, resetPasswordToken: string | undefined) => async (dispatch: Dispatch) => {
    debugger
    try {
        const payload: SetNewPasswordRequestType = {
            password,
            resetPasswordToken
        }
        let res = await passwordApi.setNewPassword(payload);

        if (res.status === 200) {
            alert('пароль изменён')
        }
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + 'some error')
        alert(error)
    }
}

//ACTIONS

export const setEmailRecovery = (email: string) => ({type: 'recovery/SET-EMAIL', email} as const);

//TYPES

type ActionsType = SetEmailRecoveryType;

type SetEmailRecoveryType = ReturnType<typeof setEmailRecovery>;
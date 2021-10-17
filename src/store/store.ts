import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import {profileReducer} from './reducers/profile-reducer'
import {authReducer} from './reducers/auth-reducer'
import {appReducer} from './reducers/app-reducer'
import {loginReducer} from './reducers/login-reducer'
import {passwordRecoveryReducer} from './reducers/password-recovery-reducer'

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,

    login: loginReducer,
    password: passwordRecoveryReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof rootReducer>
export type RootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store
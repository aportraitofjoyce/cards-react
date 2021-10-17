import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import {profileReducer} from './reducers/profile-reducer'
import {authReducer} from './reducers/auth-reducer'
import {appReducer} from './reducers/app-reducer'
import {loginReducer} from './reducers/login-reducer'
import {registerReducer} from './reducers/register-reducer'
import {passwordRecoveryReducer} from './reducers/password-recovery-reducer'

const rootReducer = combineReducers({
    profile: profileReducer,
    auth: authReducer,
    app: appReducer,
    login: loginReducer,
    register: registerReducer,
    password: passwordRecoveryReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof rootReducer>
import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import {profileReducer} from './reducers/profile-reducer'
import {authReducer} from './reducers/auth-reducer'
import {appReducer} from './reducers/app-reducer'
import {accountReducer} from './reducers/account-reducer'

const rootReducer = combineReducers({
    profile: profileReducer,
    auth: authReducer,
    app: appReducer,
    account: accountReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof rootReducer>
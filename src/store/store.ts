import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import {profileReducer} from './reducers/profile-reducer'
import {authReducer} from './reducers/auth-reducer'
import {appReducer} from './reducers/app-reducer'
import {packsReducer} from "./reducers/packs-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    pack: packsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store
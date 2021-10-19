export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

// Types
enum APP_ACTIONS_TYPES {
    SET_APP_STATUS = 'APP/SET_APP_STATUS',
    SET_APP_ERROR = 'APP/SET_APP_ERROR',
    SET_APP_INITIALIZED = 'APP/SET_INITIALIZED',
}

export type AppActions =
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof setAppInitialized>

export type InitialState = {
    status: AppStatusType
    error: null | string
    isInitialized: boolean
}

// State
const initialState: InitialState = {
    status: 'idle',
    error: null,
    isInitialized: false
}

// Reducer
export const appReducer = (state = initialState, action: AppActions): InitialState => {
    switch (action.type) {
        case APP_ACTIONS_TYPES.SET_APP_INITIALIZED:
            return {...state, isInitialized: action.payload.status}
        case APP_ACTIONS_TYPES.SET_APP_STATUS:
            return {...state, status: action.payload.status}
        case APP_ACTIONS_TYPES.SET_APP_ERROR:
            return {...state, error: action.payload.error}
        default:
            return state
    }
}

// Actions
export const setAppStatus = (status: AppStatusType) => ({
    type: APP_ACTIONS_TYPES.SET_APP_STATUS,
    payload: {status}
} as const)

export const setAppError = (error: string | null) => ({
    type: APP_ACTIONS_TYPES.SET_APP_ERROR,
    payload: {error}
} as const)

export const setAppInitialized = (status: boolean) => ({
    type: APP_ACTIONS_TYPES.SET_APP_INITIALIZED,
    payload: {status}
} as const)
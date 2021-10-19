import {appReducer, InitialState, setAppError, setAppInitialized, setAppStatus} from './app-reducer'

let startState: InitialState

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialized: false
    }
})

describe('App reducer', () => {
    it('App Status should be change', () => {
        const action = setAppStatus('succeeded')

        const endState = appReducer(startState, action)

        expect(startState).not.toBe(endState)
        expect(endState.status).toBe('succeeded')
    })

    it('Error must be fixed', () => {
        const action = setAppError('Some Error')

        const endState = appReducer(startState, action)

        expect(startState).not.toBe(endState)
        expect(endState.error).toBe('Some Error')
    })
    it('App should initialized', () => {
        const action = setAppInitialized(true)
        const endState = appReducer(startState, action)

        expect(startState).not.toBe(endState)
        expect(endState.isInitialized).toBeTruthy()
    })
})
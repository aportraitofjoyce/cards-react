import {
    CardsPackResponse,
    DeleteCardsPackData,
    GetCardPacksQueryParams,
    NewCardsPackData,
    packsAPI,
    UpdateCardsPackData
} from '../../api/packs-api'
import {AppDispatch, ThunkType} from '../store'
import {setAppIsLoading} from './app-reducer'
import {errorsHandler} from '../../utils/errors'

enum PACKS_ACTIONS_TYPES {
    SET_CARD_PACKS = 'PACKS/SET_CARD_PACKS',
}

export type PacksActionsTypes = ReturnType<typeof setCardPacks>

export type PacksInitialState = {
    cardsInfo: CardsPackResponse | null
}

const initialState: PacksInitialState = {
    cardsInfo: null
}

export const packsReducer = (state = initialState, action: PacksActionsTypes): PacksInitialState => {
    switch (action.type) {
        case PACKS_ACTIONS_TYPES.SET_CARD_PACKS:
            return {...state, cardsInfo: action.payload}

        default:
            return state
    }
}

const setCardPacks = (payload: CardsPackResponse) => ({
    type: PACKS_ACTIONS_TYPES.SET_CARD_PACKS,
    payload
} as const)

export const fetchCardPacks = (payload?: GetCardPacksQueryParams) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppIsLoading(true))
        const response = await packsAPI.getCardPacks(payload)
        dispatch(setCardPacks(response.data))
    } catch (e) {
        errorsHandler(e, dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
    }
}

export const createCardsPack = (payload: NewCardsPackData): ThunkType => async dispatch => {
    try {
        dispatch(setAppIsLoading(true))
        await packsAPI.createCardsPack(payload)
        await dispatch(fetchCardPacks())
    } catch (e) {
        errorsHandler(e, dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
    }
}

export const deleteCardsPack = (payload: DeleteCardsPackData): ThunkType => async dispatch => {
    try {
        dispatch(setAppIsLoading(true))
        await packsAPI.deleteCardsPack(payload)
        await dispatch(fetchCardPacks())
    } catch (e) {
        errorsHandler(e, dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
    }
}

export const updateCardsPack = (payload: UpdateCardsPackData): ThunkType => async dispatch => {
    try {
        dispatch(setAppIsLoading(true))
        await packsAPI.updateCardsPack(payload)
        await dispatch(fetchCardPacks())
    } catch (e) {
        errorsHandler(e, dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
    }
}
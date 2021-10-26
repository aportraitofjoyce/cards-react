import {CardsPack, CardsPackResponse, GetCardPacksQueryParams, packsAPI} from '../../api/packs-api'
import {AppDispatch, RootState} from '../store'
import {setAppInfo, setAppIsLoading} from './app-reducer'
import {errorsHandler} from '../../utils/errors'

enum PACKS_ACTIONS_TYPES {
    SET_CARD_PACKS = 'PACKS/SET_CARD_PACKS'
}

export type PacksActionsTypes =
    | ReturnType<typeof setCardPacks>

export type PacksInitialState = CardsPackResponse | null

const initialState: PacksInitialState = {
}

export const packsReducer = (state = initialState, action: PacksActionsTypes): PacksInitialState => {
    switch (action.type) {
        case PACKS_ACTIONS_TYPES.SET_CARD_PACKS:
            return {...state, ...action.payload}
        default:
            return state
    }
}

const setCardPacks = (payload: CardsPackResponse) => ({
    type: PACKS_ACTIONS_TYPES.SET_CARD_PACKS,
    payload
} as const)

export const fetchCardPacks = (payload?: GetCardPacksQueryParams) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
        dispatch(setAppIsLoading(true))
        //const {} = getState().packs
        const response = await packsAPI.getCardPacks(payload)
        dispatch(setCardPacks(response.data))
        dispatch(setAppInfo('All packs are loaded!'))
    } catch (e) {
        errorsHandler(e, dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
    }
}
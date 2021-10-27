import {
    Card,
    cardsAPI,
    CardsResponse,
    DeleteCardData,
    GetCardsQueryParams,
    NewCardData,
    UpdateCardData
} from '../../api/cards-api'
import {AppDispatch, RootState, ThunkType} from '../store'
import {setAppInfo, setAppIsLoading} from './app-reducer'
import {errorsHandler} from '../../utils/errors'
import {DeleteCardsPackData, NewCardsPackData, packsAPI, UpdateCardsPackData} from '../../api/packs-api'
import {fetchCardPacks} from './packs-reducer'

enum CARDS_ACTIONS_TYPES {
    SET_CARDS = 'CARDS/SET_CARDS'
}

type CardsActions = ReturnType<typeof setCards>

export type CardsInitialState = CardsResponse

const initialState: CardsInitialState = {
    cards: [],
    page: 1,
    pageCount: 10,
    cardsTotalCount: 0,
    packUserId: '',
    minGrade: 0,
    maxGrade: 0
}

export const cardsReducer = (state = initialState, action: CardsActions): CardsInitialState => {
    switch (action.type) {
        case CARDS_ACTIONS_TYPES.SET_CARDS:
            return {...state, cards: action.payload}
        default:
            return state
    }
}

const setCards = (payload: Card[]) => ({
    type: CARDS_ACTIONS_TYPES.SET_CARDS,
    payload
} as const)

export const fetchCards = (payload?: GetCardsQueryParams) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
        dispatch(setAppIsLoading(true))
        const response = await cardsAPI.getCards(payload)
        dispatch(setCards(response.data.cards))
        dispatch(setAppInfo('All cards are loaded!'))
    } catch (e) {
        errorsHandler(e, dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
    }
}

export const createCard = (payload?: NewCardData): ThunkType => async dispatch => {
    try {
        dispatch(setAppIsLoading(true))
        await cardsAPI.createCard(payload)
        //await dispatch(fetchCards())
    } catch (e) {
        errorsHandler(e, dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
    }
}

export const deleteCard = (payload: DeleteCardData): ThunkType => async dispatch => {
    try {
        dispatch(setAppIsLoading(true))
        await cardsAPI.deleteCard(payload)
        //await dispatch(fetchCards())
    } catch (e) {
        errorsHandler(e, dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
    }
}

export const updateCard = (payload: UpdateCardData): ThunkType => async dispatch => {
    try {
        dispatch(setAppIsLoading(true))
        await cardsAPI.updateCard(payload)
        //await dispatch(fetchCards())
    } catch (e) {
        errorsHandler(e, dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
    }
}
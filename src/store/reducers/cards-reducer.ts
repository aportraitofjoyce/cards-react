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
import {setAppIsLoading} from './app-reducer'
import {errorsHandler} from '../../utils/errors'

enum CARDS_ACTIONS_TYPES {
    SET_CARDS = 'CARDS/SET_CARDS',
    SET_CURRENT_CARDS_PACK_ID = 'CARDS/SET_CURRENT_CARDS_PACK_ID',
}

type CardsActions =
    | ReturnType<typeof setCards>
    | ReturnType<typeof setCurrentCardsPackID>

export type CardsInitialState = CardsResponse & {
    currentCardsPackID: string
}

const initialState: CardsInitialState = {
    cards: [],
    page: 1,
    pageCount: 10,
    cardsTotalCount: 0,
    packUserId: '',
    minGrade: 0,
    maxGrade: 0,
    currentCardsPackID: ''
}

export const cardsReducer = (state = initialState, action: CardsActions): CardsInitialState => {
    switch (action.type) {
        case CARDS_ACTIONS_TYPES.SET_CARDS:
            return {...state, cards: action.payload}
        case CARDS_ACTIONS_TYPES.SET_CURRENT_CARDS_PACK_ID:
            return {...state, currentCardsPackID: action.payload.id}
        default:
            return state
    }
}

const setCards = (payload: Card[]) => ({
    type: CARDS_ACTIONS_TYPES.SET_CARDS,
    payload
} as const)

export const setCurrentCardsPackID = (payload: { id: string }) => ({
    type: CARDS_ACTIONS_TYPES.SET_CURRENT_CARDS_PACK_ID,
    payload
} as const)

export const fetchCards = (payload?: GetCardsQueryParams) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const {cards, cardsTotalCount, pageCount, page, minGrade, maxGrade, packUserId, currentCardsPackID} = getState().cards
    try {
        dispatch(setAppIsLoading(true))
        const response = await cardsAPI.getCards({cardsPack_id: currentCardsPackID, page, pageCount})
        dispatch(setCards(response.data.cards))
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
        await dispatch(fetchCards())
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
        await dispatch(fetchCards())
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
        await dispatch(fetchCards())
    } catch (e) {
        errorsHandler(e, dispatch)
    } finally {
        dispatch(setAppIsLoading(false))
    }
}
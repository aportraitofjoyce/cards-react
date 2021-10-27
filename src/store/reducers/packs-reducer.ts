import {
    CardsPack,
    CardsPackResponse,
    DeleteCardsPackData,
    GetCardPacksQueryParams,
    NewCardsPackData,
    packsAPI,
    UpdateCardsPackData
} from '../../api/packs-api'
import {AppDispatch, RootState, ThunkType} from '../store'
import {setAppIsLoading} from './app-reducer'
import {errorsHandler} from '../../utils/errors'

enum PACKS_ACTIONS_TYPES {
    SET_CARD_PACKS = 'PACKS/SET_CARD_PACKS',
    SET_CURRENT_PAGE = 'PACKS/SET_CURRENT_PAGE',
    SET_PACKS_COUNT_ON_PAGE = 'PACKS/SET_PACKS_COUNT_ON_PAGE',
}

export type PacksActionsTypes =
    | ReturnType<typeof setCardPacks>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setPacksCountOnPage>

export type PacksInitialState = CardsPackResponse

const initialState: PacksInitialState = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 0,
}

export const packsReducer = (state = initialState, action: PacksActionsTypes): PacksInitialState => {
    switch (action.type) {
        case PACKS_ACTIONS_TYPES.SET_CARD_PACKS:
            return {...state, ...action.payload}

        case PACKS_ACTIONS_TYPES.SET_CURRENT_PAGE:
            return {...state, page: action.payload.page}

        case PACKS_ACTIONS_TYPES.SET_PACKS_COUNT_ON_PAGE:
            return {...state, pageCount: action.payload.count}

        default:
            return state
    }
}

const setCardPacks = (payload: CardsPackResponse) => ({
    type: PACKS_ACTIONS_TYPES.SET_CARD_PACKS,
    payload
} as const)

export const setCurrentPage = (payload: { page: number }) => ({
    type: PACKS_ACTIONS_TYPES.SET_CURRENT_PAGE,
    payload
} as const)

export const setPacksCountOnPage = (payload: { count: number }) => ({
    type: PACKS_ACTIONS_TYPES.SET_PACKS_COUNT_ON_PAGE,
    payload
} as const)

export const fetchCardPacks = (payload?: GetCardPacksQueryParams) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const {cardPacks, page, pageCount, cardPacksTotalCount, minCardsCount, maxCardsCount} = getState().packs
    const userID = getState().auth.userInfo?._id
    const queryParams: GetCardPacksQueryParams = {
        page,
        pageCount,
        min: minCardsCount,
        max: maxCardsCount,
        user_id: userID,
        packName: '',
        sortPacks: ''
    }

    try {
        dispatch(setAppIsLoading(true))
        const response = await packsAPI.getCardPacks()
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
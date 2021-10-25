import { Dispatch } from "redux";
import {CardPacksType, packsAPI} from "../../api/packs-api";
import {RootState} from "../store";


enum PACKS_ACTIONS_TYPES {
    SET_PACKS = 'PACKS/SET_PACKS',
    SET_CREATE_PACKS = 'PACKS/SET_CREATE_PACKS',
    SET_DELETE_PACK = 'PACKS/SET_DELETE_PACK',
    SET_UPDATE_PACK = 'PACKS/SET_UPDATE_PACK',
}

export type PacksActionsTypes =
    ReturnType<typeof setPacks>
    | ReturnType<typeof setCreatePacks>
    | ReturnType<typeof setDeletePacks>
    | ReturnType<typeof setUpdatePacks>

export type PacksInitialState = {
    cardPacks: CardPacksType
    cardPacksTotalCount: number // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number // количество элементов на странице
}

const initialState: PacksInitialState = {
    cardPacks: [{
        _id: '',
        user_id: '',
        name: '',
        path: '', // папка
        cardsCount: 0,
        grade: 0, // средняя оценка карточек
        shots: 0, // количество попыток
        rating: 0, // лайки
        type: '', // ещё будет "folder" (папка)
        created: '',
        updated: '',
        __v: 0,
    }],
    cardPacksTotalCount: 1, // количество колод
    maxCardsCount: 10,
    minCardsCount: 1,
    page: 1, // выбранная страница
    pageCount: 10 // количество элементов на странице
}


export const packsReducer = (state = initialState, action: PacksActionsTypes) => {
    switch (action.type) {
        // case PACKS_ACTIONS_TYPES.SET_PACKS:{
        //     return action.cardPack.map(p => ({...p}))
        // }
        default:
            return state
    }
}

// Actions

export const setPacks = (cardPack: Array<CardPacksType>) => {
    return {type: PACKS_ACTIONS_TYPES.SET_PACKS, cardPack} as const
}

export const setCreatePacks = () => {
    return {type: PACKS_ACTIONS_TYPES.SET_CREATE_PACKS} as const
}

export const setDeletePacks = () => {
    return {type: PACKS_ACTIONS_TYPES.SET_DELETE_PACK} as const
}

export const setUpdatePacks = () => {
    return {type: PACKS_ACTIONS_TYPES.SET_UPDATE_PACK} as const
}

// Thunks

// export const fetchPacks = () => {
//     return (dispatch: Dispatch,  getState: () => RootState) => {
//         packsAPI.getPacks()
//         .then((res) => {
//
//         })
//     }
// }
//
// export const createPack = () => {
//     return (dispatch: Dispatch,  getState: () => RootState) => {
//         packsAPI.createPack()
//         .then((res) => {
//
//         })
//     }
// }
//
// export const deletePack = () => {
//     return (dispatch: Dispatch,  getState: () => RootState) => {
//         packsAPI.deletePack()
//         .then((res) => {
//
//         })
//     }
// }
//
// export const updatePack = () => {
//     return (dispatch: Dispatch,  getState: () => RootState) => {
//         packsAPI.updatePack()
//         .then((res) => {
//
//         })
//     }
// }

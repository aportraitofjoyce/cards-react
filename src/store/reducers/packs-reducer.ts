import {Dispatch} from "redux";
import {CardPacksType, PackResponseType, packsAPI} from "../../api/packs-api";
import {RootState} from "../store";


export type InitialStateType = {
    cardPacks: CardPacksType[]
    cardPacksTotalCount: null | number
    maxCardsCount: null | number
    minCardsCount: null | number
    page: number
    pageCount: number
    sortPacks: string
    message: string
    user_id: string
}

export const initialState: InitialStateType = {
    cardPacks: [],
    cardPacksTotalCount: null,
    maxCardsCount: null,
    minCardsCount: null,
    page: 1,
    pageCount: 10,
    sortPacks: '0updated',
    message: '',
    user_id: ''
}

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



export const packsReducer = (state = initialState, action: PacksActionsTypes) => {
    switch (action.type) {
        case PACKS_ACTIONS_TYPES.SET_PACKS:
            return {...state, ...action.data}
        default:
            return state
    }
}

// Actions

export const setPacks = (data: PackResponseType) => {
    return {type: PACKS_ACTIONS_TYPES.SET_PACKS, data} as const
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

export const fetchPacks = () => (dispatch: Dispatch, getState: () => RootState) => {
    let {sortPacks, page, pageCount, user_id} = getState().packs
    packsAPI.getPacks(sortPacks, page, pageCount, user_id).then((res) => {
        dispatch(setPacks(res.data.data))
    })
}

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
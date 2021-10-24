

enum PACKS_ACTIONS_TYPES {
    SET_PACKS = 'PACKS/SET_PACKS',
    SET_CREATE_PACKS = 'PACKS/SET_CREATE_PACKS',
    SET_DELETE_PACK = 'PACKS/SET_DELETE_PACK',
    SET_UPDATE_PACK = 'PACKS/SET_UPDATE_PACK',
}

export type PacksActionsTypes =
    ReturnType<typeof setPacks>
    | ReturnType<typeof createPacks>
    | ReturnType<typeof deletePacks>
    | ReturnType<typeof updatePacks>

export type PacksInitialState = {
    _id: string
    user_id: string
    name: string
    path: string // папка
    cardsCount: number
}

const initialState: PacksInitialState = {
    _id: '',
    user_id: '',
    name: '',
    path: '' ,// папка
    cardsCount: 0,
}

export const packsReducer = (state = initialState, action: PacksActionsTypes) => {
    switch (action.type) {
        case PACKS_ACTIONS_TYPES.SET_PACKS:{
            return {...state}
        }
    }
}

// Actions

export const setPacks = () => {
    return {type: PACKS_ACTIONS_TYPES.SET_PACKS} as const
}

export const createPacks = (id: string, title: string) => {
    return {type: PACKS_ACTIONS_TYPES.SET_CREATE_PACKS, id, title} as const
}

export const deletePacks = (id: string) => {
    return {type: PACKS_ACTIONS_TYPES.SET_DELETE_PACK, id} as const
}

export const updatePacks = (id: string, newTitle: string) => {
    return {type: PACKS_ACTIONS_TYPES.SET_UPDATE_PACK, id, newTitle} as const
}

// Thunks


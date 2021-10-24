type PacksActions = ReturnType<typeof test>

export type PacksInitialState = {
    packs: {name: string, count: number, something: string}[]
}

const initialState: PacksInitialState = {
    packs: [
        {name: 'First', count: 5, something: 'Ooo'},
        {name: 'Second', count: 2, something: 'Aaa'},
        {name: 'Third', count: 10, something: 'Eee'},
    ]
}

export const packsReducer = (state = initialState, action: PacksActions): PacksInitialState => {
    switch (action.type) {
        default:
            return state

    }
}

export const test = () => ({
    type: 'test'
})
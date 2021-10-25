type CardsActions = ReturnType<typeof test>

export type CardsInitialState = {}

const initialState: CardsInitialState = {}

export const cardsReducer = (state = initialState, action: CardsActions): CardsInitialState => {
    switch (action.type) {
        default:
            return state
    }
}

export const test = () => ({
    type: 'test'
})
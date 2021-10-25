type PacksActions = ReturnType<typeof test>

export type Pack = {
    _id: string
    user_id: string
    user_name: string
    private: boolean

    name: string
    path: string
    grade: number // back count
    shots: number // back count

    cardsCount: number // back count
    deckCover: string

    type: string
    rating: number // hz
    more_id: string

    created: string
    updated: string
}

export type PacksInitialState = {
    packs: Pack[]
}

const initialState: PacksInitialState = {
    packs: [
        {
            _id: '617581e2078d82123090325a',
            user_id: '616b1e1dee53e41fc82f4cc9',
            user_name: 'tosha.trishin@bk.ru',
            private: false,
            name: 'Anton Trishin',
            path: '/def',
            grade: 0,
            shots: 0,
            cardsCount: 0,
            type: 'pack',
            rating: 0,
            created: '2021-10-24T15:55:14.809Z',
            updated: '2021-10-24T16:10:07.322Z',
            more_id: '616b1e1dee53e41fc82f4cc9',
            deckCover: '1',
        },
        {
            _id: '61757f9d078d821230903258',
            user_id: '616b1e1dee53e41fc82f4cc9',
            user_name: 'tosha.trishin@bk.ru',
            private: false,
            name: 'no Name',
            path: '/def',
            grade: 0,
            shots: 0,
            cardsCount: 0,
            type: 'pack',
            rating: 0,
            created: '2021-10-24T15:45:33.041Z',
            updated: '2021-10-24T15:45:33.041Z',
            more_id: '616b1e1dee53e41fc82f4cc9',
            deckCover: '2'
        },
        {
            _id: '61757f1e078d821230903257',
            user_id: '616b1e1dee53e41fc82f4cc9',
            user_name: 'tosha.trishin@bk.ru',
            private: false,
            name: 'no Name',
            path: '/def',
            grade: 0,
            shots: 0,
            cardsCount: 0,
            type: 'pack',
            rating: 0,
            created: '2021-10-24T15:43:26.712Z',
            updated: '2021-10-24T15:43:26.712Z',
            more_id: '616b1e1dee53e41fc82f4cc9',
            deckCover: '3'
        },
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
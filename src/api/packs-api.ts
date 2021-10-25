import {instance} from './axios-instance'
import {AxiosResponse} from 'axios'


// Requests
// Packs

export type CreatePackType = {
    cardsPack: {
        name: string // если не отправить будет таким
        path: string // если не отправить будет такой
        grade?: number // не обязателен
        shots?: number // не обязателен
        rating?: number // не обязателен
        deckCover?: string // не обязателен
        private: boolean // если не отправить будет такой
        type: string // если не отправить будет таким
    }
}


export type UpdatePackType = {
    cardPack: {
        _id: string
        name: string
    }
}

// Cards
export type CardsRequestType = {
    cardsPack_id: string
    cardAnswer?: string
    cardQuestion?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}


export type CreateCardType = {
    card: {
        cardsPack_id: string
        question: string // если не отправить будет таким
        answer: string // если не отправить будет таким
        grade?: number // 0..5, не обязателен
        shots?: number // не обязателен
        rating?: number // не обязателен
        answerImg?: string // не обязателен
        questionImg?: string // не обязателен
        questionVideo?: string // не обязателен
        answerVideo?: string // не обязателен
        type: string // если не отправить будет таким
    }
}

export type UpdateCardType = {
    card: {
        _id: string
        question?: string // не обязательно
        comments?: string // не обязателен
    }
}

// Response
// Packs
export type CardPacksType = {
    _id: string
    user_id: string
    name: string
    path: string // папка
    cardsCount: number
    grade: number // средняя оценка карточек
    shots: number // количество попыток
    rating: number // лайки
    type: string // ещё будет "folder" (папка)
    created: string
    updated: string
    __v: number
}

export type PackResponseType = {
    cardPacks: CardPacksType[]
    cardPacksTotalCount: number // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number // количество элементов на странице
}

// Cards
export type  CardsResponseType = {
    cards: [
        {
            answer: string
            question: string
            cardsPack_id: string
            grade: number
            rating: number
            shots: number
            type: string
            user_id: string
            created: string
            updated: string
            __v: number
            _id: string
        },
    ]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string // id юзера, создавшего данную колоду
}

// API
export const packsAPI = {
    getPacks: (sortPacks: string, page: number, pageCount: number, user_id: string ) => instance
        .get<AxiosResponse<PackResponseType>>(`cards/pack?sortPacks=${sortPacks}&page=${page}&pageCount=${pageCount}&user_id=${user_id}`),

    createPack: (payload: CreatePackType) => instance
        .post<CreatePackType, AxiosResponse<any>>('/cards/pack', payload),

    deletePack: (id: string) => instance
        .delete(`/cards/pack?id=${id}`),

    updatePack: (payload: UpdatePackType) => instance
        .put<UpdatePackType, AxiosResponse<any>>('/cards/pack', payload),
}

export const cardsAPI = {
    getCards: (cardsPack_id: string, page: number, pageCount: number) => instance
        .get<AxiosResponse<CardsResponseType>>(`/cards/card?cardsPack_id=${cardsPack_id}&page=${page}&pageCount${pageCount}`),

    createCard: (payload: CreateCardType) => instance
        .post<CreateCardType, AxiosResponse<any>>('/cards/card', payload),

    deleteCard: (id: string) => instance
        .delete(`/cards/pack?id=${id}`),

    updateCard: (payload: UpdateCardType) => instance
        .put<UpdateCardType, AxiosResponse<any>>('/cards/card', payload),
}
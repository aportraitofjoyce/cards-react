import {instance} from './axios-instance'
import {AxiosResponse} from 'axios'

export type Card = {
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
}

export type CardsResponse = {
    cards?: Card[]
    cardsTotalCount?: number
    maxGrade?: number
    minGrade?: number
    page?: number
    pageCount?: number
    packUserId?: string
}

export type GetCardsQueryParams = {
    cardsPack_id?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}

export type NewCardData = {
    card: {
        cardsPack_id: string
        question: string
        answer: string
        grade?: number
        shots?: number
        rating?: number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string
        type: string
    }
}

export type UpdateCardData = {
    card: {
        _id: string
        question?: string
        comments?: string
    }
}

export const cardsAPI = {
    getCards: (payload?: GetCardsQueryParams) => instance
        .get<CardsResponse>('/cards/card', {params: payload}),

    createCard: (payload: NewCardData) => instance
        .post<NewCardData, AxiosResponse<Card>>('/cards/card', payload),

    deleteCard: (payload: { id: string }) => instance
        .delete<Card>(`/cards/pack`, {params: payload}),

    updateCard: (payload: UpdateCardData) => instance
        .put<UpdateCardData, AxiosResponse<Card>>('/cards/card', payload),
}
import React, {FC} from 'react'
import {cardsModel} from '../cardsModel'
import {createCard, deleteCard, updateCard} from '../../../store/reducers/cards-reducer'
import {useDispatch} from 'react-redux'
import {Card} from '../../../api/cards-api'
import {Table} from '../../../components/UI/Table/Table'

type CardsTableProps = {
    cards: Card[]
    id: string
}

export const CardsTable: FC<CardsTableProps> = ({cards, id}) => {
    const dispatch = useDispatch()

    const model = cardsModel(
        () => {
            const question = prompt()
            dispatch(createCard({card: {cardsPack_id: id, question: question!}}))
        },
        id => {
            dispatch(deleteCard({id: id}))
        },
        id => {
            const question = prompt()
            dispatch(updateCard({card: {_id: id, question: question!}}))
        }
    )

    return (
        <Table model={model} data={cards}/>
    )
}
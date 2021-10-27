import React, {FC, useEffect} from 'react'
import {cardsModel} from './cardsModel'
import {useDispatch} from 'react-redux'
import {createCard, deleteCard, fetchCards, setCurrentCardsPackID, updateCard} from '../../store/reducers/cards-reducer'
import {useParams} from 'react-router-dom'
import {Table} from '../../components/UI/Table/Table'
import {useTypedSelector} from '../../hooks/hooks'

export const Cards: FC = () => {
    const dispatch = useDispatch()
    const {id} = useParams<{ id: string }>()
    const cards = useTypedSelector(state => state.cards.cards)
    const cardPacks = useTypedSelector(state => state.packs.cardPacks)

    const currentCardsPack = cardPacks.find(p => p._id === id)

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

    useEffect(() => {
        dispatch(setCurrentCardsPackID({id}))
    }, [id])

    useEffect(() => {
        id && dispatch(fetchCards())
    }, [])

    return (
        <div>
            <h1>Cards</h1>
            {currentCardsPack && <>
				<p>Pack owner: {currentCardsPack.user_name}</p>
				<p>Pack name: {currentCardsPack.name}</p>
			</>}
            <Table model={model} data={cards}/>
        </div>
    )
}
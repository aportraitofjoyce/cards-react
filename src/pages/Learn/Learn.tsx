import React, {FC, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {Button} from '../../components/UI/Button/Button'
import {Card} from '../../api/cards-api'
import {useTypedSelector} from '../../hooks/hooks'
import {useDispatch} from 'react-redux'
import {fetchCards} from '../../store/reducers/cards-reducer'

const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал']

const getCard = (cards: Card[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
    const rand = Math.random() * sum
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1})
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1]
}

export const Learn: FC = () => {
    const dispatch = useDispatch()
    const {id} = useParams<{ id: string }>()

    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [first, setFirst] = useState<boolean>(true)

    const cards = useTypedSelector(state => state.cards.cards)

    const [card, setCard] = useState<Card>({
        _id: 'fake',
        cardsPack_id: '',
        answer: 'answer fake',
        question: 'question fake',
        grade: 0,
        shots: 0,
        type: '',
        rating: 0,
        __v: 346,
        user_id: '',
        created: '',
        updated: '',
    })


    useEffect(() => {
        console.log('LearnContainer useEffect')

        if (first) {
            dispatch(fetchCards({cardsPack_id: id}))
            setFirst(false)
        }

        console.log('cards', cards)
        if (cards.length > 0) setCard(getCard(cards))

        return () => {
            console.log('LearnContainer useEffect off')
        }
    }, [dispatch, id, cards, first])

    const onNext = () => {
        setIsChecked(false)

        if (cards.length > 0) {
            // dispatch
            setCard(getCard(cards))
        } else {

        }
    }

    return (
        <div>
            <h1>Learn</h1>
            <div>{card.question}</div>
            <div>
                <Button onClick={() => setIsChecked(true)}>check</Button>
            </div>

            {isChecked && (
                <>
                    <div>{card.answer}</div>
                    {grades.map(g => <Button key={g} onClick={() => {
                    }}>{g}</Button>)}
                    <Button onClick={onNext}>next</Button>
                </>
            )}
        </div>
    )
}
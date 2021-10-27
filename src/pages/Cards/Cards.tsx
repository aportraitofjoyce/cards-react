import React, {FC, useEffect} from 'react'
import {cardsModel} from './cardsModel'
import {useDispatch} from 'react-redux'
import {fetchCards} from '../../store/reducers/cards-reducer'
import {useParams} from 'react-router-dom'

export const Cards: FC = () => {
    const dispatch = useDispatch()

    const model = cardsModel(
        () => {
        },
        (id) => {
        },
        (id) => {
        }
    )

    const {id} = useParams<{id: string}>()

    useEffect(() => {
        dispatch(fetchCards({cardsPack_id: id}))
    }, [id])


    return (
        <div>
            <h1>Cards</h1>
            {/*<Table model={model} data={cards}/>*/}
        </div>
    )
}
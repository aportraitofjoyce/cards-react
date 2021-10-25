import React, {FC} from 'react'
import {useTypedSelector} from '../../hooks/hooks'
import {cardsModel} from './CardsModel'
import {Table} from '../../components/UI/Table/Table'

export const Cards: FC = () => {
    const cards = useTypedSelector(state => state.packs.packs)
    const model = cardsModel(
        () => {
        },
        (id) => {
        },
        (id) => {
        }
    )

    return (
        <div>
            <h1>Cards</h1>
            <Table model={model} data={cards}/>
        </div>
    )
}
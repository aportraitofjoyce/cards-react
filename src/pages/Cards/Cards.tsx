import React, {FC, useEffect} from 'react'
import {cardsModel} from './cardsModel'
import {fetchCardPacks} from '../../store/reducers/packs-reducer'
import {useDispatch} from 'react-redux'
import {fetchCards} from '../../store/reducers/cards-reducer'


export const Cards: FC = () => {
    const dispatch = useDispatch()
    //const cards = useTypedSelector(state => state.packs.packs)
    const model = cardsModel(
        () => {
        },
        (id) => {
        },
        (id) => {
        }
    )

    useEffect(() => {
        dispatch(fetchCards())
    }, [])

    return (
        <div>
            <h1>Cards</h1>
            {/*<Table model={model} data={cards}/>*/}
        </div>
    )
}
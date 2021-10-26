import React, {FC, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {packsModel} from './packsModel'
import {fetchCardPacks} from '../../store/reducers/packs-reducer'

export const Packs: FC = () => {
    const dispatch = useDispatch()
    //const packs = useTypedSelector(state => state.packs.packs)
    const model = packsModel(
        () => {
        },
        (id) => {
        },
        (id) => {
        }
    )
    useEffect(() => {
        dispatch(fetchCardPacks())
    }, [])

    return (
        <div>
            <h1>Packs</h1>
            <div>Search Form, Double Range, Pagination</div>
            {/*<Table model={model} data={packs}/>*/}
        </div>
    )
}
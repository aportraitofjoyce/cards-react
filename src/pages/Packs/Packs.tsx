import React, {FC} from 'react'
import {useTypedSelector} from '../../hooks/hooks'
import {Table} from '../../components/UI/Table/Table'
import {packsModel} from './packsModel'

export const Packs: FC = () => {
    //const packs = useTypedSelector(state => state.packs.packs)
    const model = packsModel(
        () => {
        },
        (id) => {
        },
        (id) => {
        }
    )

    return (
        <div>
            <h1>Packs</h1>
            <div>Search Form, Double Range, Pagination</div>
            {/*<Table model={model} data={packs}/>*/}
        </div>
    )
}
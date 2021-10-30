import React, {FC} from 'react'
import {Table} from '../../../components/UI/Table/Table'
import {packsModel} from '../packsModel'
import {createCardsPack, deleteCardsPack, updateCardsPack} from '../../../store/reducers/packs-reducer'
import {useDispatch} from 'react-redux'
import {CardsPack} from '../../../api/packs-api'

type PacksTableProps = {
    cardPacks: CardsPack[]
}

export const PacksTable: FC<PacksTableProps> = ({cardPacks}) => {
    const dispatch = useDispatch()

    const model = packsModel(
        () => {
            const name = prompt()
            dispatch(createCardsPack({cardsPack: {name: name!, private: false}}))
        },
        (id) => {
            dispatch(deleteCardsPack({id}))
        },
        (id) => {
            const name = prompt()
            dispatch(updateCardsPack({cardsPack: {_id: id, name: name!}}))
        },
    )

    return (
        <Table model={model}
               data={cardPacks}/>
    )
}
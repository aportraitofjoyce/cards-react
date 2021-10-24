import React, {FC} from 'react'
import s from './Table.module.css'
import {TableModel} from '../../../pages/Packs/packsModel'


type TableProps = {
    model: TableModel[]
    data: any
}

export const Table: FC<TableProps> = props => {
    const {model, data} = props

    return (
        <div className={s.container}>
            <div className={s.header}>
                {model.map((m, index) => m.title(index, false))}
            </div>

            <div className={s.body}>
                {data.map((dataItem: any, dataIndex: number) => (
                    <div key={'-row-' + (dataItem._id || dataIndex)} className={s.row}>
                        {model.map((m, modelIndex) => m.render(dataItem, modelIndex, dataIndex, false))}
                    </div>
                ))}
            </div>

        </div>
    )
}
import React, {FC, ReactNode} from 'react'
import s from './Table.module.css'

export type TableModel = {
    title: (index: number) => ReactNode
    render: (dataItem: any) => ReactNode
}

type TableProps = {
    model: TableModel[]
    data: any
}

export const Table: FC<TableProps> = props => {
    const {model, data} = props

    return (
        <div className={s.container}>
            <div className={s.header}>
                {model.map((m, index) => m.title(index))}
            </div>

            <div className={s.body}>
                {data.map((dataItem: any, dataIndex: number) => (
                    <div key={'-row-' + (dataItem._id || dataIndex)} className={s.row}>
                        {model.map(m => m.render(dataItem))}
                    </div>
                ))}
            </div>
        </div>
    )
}
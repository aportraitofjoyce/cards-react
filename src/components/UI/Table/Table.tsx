import React, {FC, ReactNode} from 'react'

export type TableModel = {
    header: (index: number) => ReactNode
    body: (data: any) => ReactNode
}

type TableProps = {
    model: TableModel[]
    data: any[]
}

export const Table: FC<TableProps> = props => {
    const {model, data} = props

    return (
        <div style={{overflowX: 'auto'}}>
            {data.length > 0 ?
                <table>
                    <thead>
                    <tr>{model.map((m, index) => m.header(index))}</tr>
                    </thead>

                    <tbody>
                    {data.map((item: any, index: number) => (
                        <tr key={'row' + (item._id || index)}>
                            {model.map(m => m.body(item))}
                        </tr>
                    ))}
                    </tbody>
                </table> : <h2 style={{margin: '40px 0'}}>No data to show!</h2>}
        </div>

    )
}
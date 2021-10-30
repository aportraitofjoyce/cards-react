import React, {FC} from 'react'

type SortPacksProps = {
    sortBy: string
    sortCallback: (sortMethod: string) => void
}

export const Sort: FC<SortPacksProps> = ({sortBy, sortCallback}) => {
    const onSortHandler = (method: 0 | 1) => sortCallback(`${method}${sortBy}`)

    return (
        <div>
            <span onClick={() => onSortHandler(0)}>Up</span>
            <span onClick={() => onSortHandler(1)}>Down</span>
        </div>
    )
}
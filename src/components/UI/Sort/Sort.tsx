import React, {FC} from 'react'

type SortPacksProps = {
    sortBy: string
    sortCallback: (sortMethod: string) => void
}

export const Sort: FC<SortPacksProps> = ({sortBy, sortCallback}) => {
    const onSortHandler1 = () => sortCallback(`1${sortBy}`)
    const onSortHandler0 = () => sortCallback(`0${sortBy}`)

    return (
        <div>
            <span onClick={onSortHandler0}>ᐃ</span>
            <span onClick={onSortHandler1}>ᐁ</span>
        </div>
    )
}
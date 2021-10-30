import React from 'react'
import s from './Sort.module.css'


type SortPacksPropsType = {
    sortTitle: string
    sortHandlerUp: (sortTitle: string) => void
    sortHandlerDown: (sortTitle: string) => void
}

export const Sort = (props: SortPacksPropsType) => {
    const {sortTitle, sortHandlerUp, sortHandlerDown} = props

    const onSortHandler1 = () => {
        sortHandlerUp(`1${sortTitle}`)
    }
    const onSortHandler0 = () => {
        sortHandlerDown(`0${sortTitle}`)

    }
    return (
        <div className={s.sort}>
            <div>
                <span onClick={onSortHandler0}>ᐃ</span>
            </div>
            <div>
                <span onClick={onSortHandler1}>ᐁ</span>
            </div>
        </div>
    )
}
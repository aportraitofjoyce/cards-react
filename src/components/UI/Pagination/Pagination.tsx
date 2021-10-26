import React, {useEffect, useState} from 'react'
import s from './Pagination.module.css'

type PaginationProps = {
    totalCount: number,
    countPerPage: number,
    currentPage: number,
    onChangePage: (page: number) => void
    acc?: number
}

export const Pagination = ({totalCount, countPerPage, currentPage, onChangePage, acc = 10}: PaginationProps) => {
    const [visPre, setVisPre] = useState(false)
    const [visNext, setVisNext] = useState(false)

    let pageNumbers: number = Math.ceil(totalCount / countPerPage)

    let pages = []
    for (let i = 1; i <= pageNumbers; i++) {
        pages.push(i)
    }

    const previousPage = currentPage !== 1 ? currentPage - 1 : 1
    const nextPage = currentPage !== pageNumbers ? currentPage + 1 : pageNumbers
    let pageNextAcc = (currentPage + acc) > pageNumbers ? pageNumbers : currentPage + acc
    let pagePreviousAcc = (currentPage - acc) < 1 ? 1 : currentPage - acc

    useEffect(() => {
        previousPage === currentPage ? setVisPre(true) : setVisPre(false)
        nextPage === currentPage ? setVisNext(true) : setVisNext(false)
    }, [currentPage, nextPage, previousPage])

    if (isNaN(pageNumbers) || totalCount === 0) {
        return <div></div>
    }
    return (
        <div className={s.paginationWrapper}>
            <ul className={s.pagination}>
                <li>
                    <button title={`Page Previos`} className={`${visPre && s.visible}`} onClick={() => {
                        onChangePage(currentPage - 1)
                    }}>❮
                    </button>
                </li>
                <li>
                    <button title={`Page 1`} className={`${visPre && s.visible}`} onClick={() => {
                        onChangePage(1)
                    }}>1
                    </button>
                </li>
                <li><span title={`Page ${currentPage - acc}`} onClick={() => {
                    onChangePage(pagePreviousAcc)
                }} className={`${visPre && s.visible}`}>...</span></li>
                <li>
                    <button className={`${visPre && s.visible}`} onClick={() => {
                        onChangePage(previousPage)
                    }} title={`Page ${pageNumbers}`}>{previousPage}</button>
                </li>
                <li>
                    <button title={`Page ${currentPage}`} className={s.active}>{currentPage}</button>
                </li>
                <li>
                    <button className={`${visNext && s.visible}`} onClick={() => {
                        onChangePage(nextPage)
                    }} title={`Page ${nextPage}`}>{nextPage}</button>
                </li>

                <li><span title={`Page ${currentPage + acc}`} onClick={() => {
                    onChangePage(pageNextAcc)
                }} className={`${visNext && s.visible}`}>...</span></li>
                <li>
                    <button className={`${visNext && s.visible}`} onClick={() => {
                        onChangePage(pageNumbers)
                    }} title={`Page ${pageNumbers}`}>{pageNumbers}</button>
                </li>
                <li>
                    <button className={`${visNext && s.visible}`} onClick={() => {
                        onChangePage(currentPage + 1)
                    }} title={'page Next'}>❯
                    </button>
                </li>
            </ul>
        </div>
    )
}
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
        return <div/>
    }

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <span className={`${visPre && s.visible}`}
                      onClick={() => onChangePage(currentPage - 1)}>Prev</span>

                <span className={`${visPre && s.visible}`}
                      onClick={() => onChangePage(1)}>1</span>

                <span className={`${visPre && s.visible}`}
                      onClick={() => onChangePage(pagePreviousAcc)}>...</span>

                <span className={`${visPre && s.visible}`}
                      onClick={() => onChangePage(previousPage)}>{previousPage}</span>

                <span className={s.active}>{currentPage}</span>

                <span className={`${visNext && s.visible}`}
                      onClick={() => onChangePage(nextPage)}>{nextPage}</span>

                <span className={`${visNext && s.visible}`}
                      onClick={() => onChangePage(pageNextAcc)}>...</span>

                <span className={`${visNext && s.visible}`}
                      onClick={() => onChangePage(pageNumbers)}>{pageNumbers}</span>

                <span className={`${visNext && s.visible}`}
                      onClick={() => onChangePage(currentPage + 1)}>Next</span>
            </div>
        </div>
    )
}
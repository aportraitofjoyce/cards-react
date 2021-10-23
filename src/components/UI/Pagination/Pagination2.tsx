import React, {useState, useEffect} from 'react'
import s from './Pagination2.module.css'
import {Button} from '../Button/Button'

type PaginationProps = {
    totalPages: number,
    setCurrentPage: Function,
    currentPage:any
}

export const Pagination2 = (props: PaginationProps) => {
    const {totalPages, setCurrentPage,currentPage} = props

    //Set number of pages
    const numberOfPages: any = []
    for (let i = 1; i <= totalPages; i++) {
        numberOfPages.push(i)
    }

    // Current active button number


    // Array of buttons what we see on the page
    const [arrOfCurrButtons, setArrOfCurrButtons] = useState([])

    useEffect(() => {
        let tempNumberOfPages: any = [...arrOfCurrButtons]

        let dotsInitial = '...'
        let dotsLeft = '... '
        let dotsRight = ' ...'

        if (numberOfPages.length < 6) {
            tempNumberOfPages = numberOfPages
        } else if (currentPage >= 1 && currentPage <= 3) {
            tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length]
        } else if (currentPage === 4) {
            const sliced = numberOfPages.slice(0, 5)
            tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length]
        } else if (currentPage > 4 && currentPage < numberOfPages.length - 2) {
            const sliced1 = numberOfPages.slice(currentPage - 2, currentPage)
            const sliced2 = numberOfPages.slice(currentPage, currentPage + 1)
            tempNumberOfPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPages.length])
        } else if (currentPage > numberOfPages.length - 3) {                 // > 7
            const sliced = numberOfPages.slice(numberOfPages.length - 4)       // slice(10-4)
            tempNumberOfPages = ([1, dotsLeft, ...sliced])
        } else if (currentPage === dotsInitial) {
            setCurrentPage(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1)
        } else if (currentPage === dotsRight) {
            setCurrentPage(arrOfCurrButtons[3] + 2)
        } else if (currentPage === dotsLeft) {
            setCurrentPage(arrOfCurrButtons[3] - 2)
        }

        setArrOfCurrButtons(tempNumberOfPages)
        setCurrentPage(currentPage)
    }, [currentPage])

    const prevClickHandler = () => setCurrentPage((prev: any) => prev <= 1 ? prev : prev - 1)
    const nextClickHandler = () => setCurrentPage((prev: any) => prev <= 1 ? prev : prev + 1)

    return (
        <div className={s.paginationContainer}>
            <Button className={`${currentPage === 1 ? `${s.disabled}` : ''}`}
                    onClick={prevClickHandler}
            >Prev</Button>

            {arrOfCurrButtons.map(((item, index) => {
                return <span
                    key={index}
                    className={`${currentPage === item ? `${s.active}` : ''}`}
                    onClick={() => setCurrentPage(item)}
                >
                    {item}
                </span>
            }))}

            <Button className={`${currentPage === numberOfPages.length ? `${s.disabled}` : ''}`}
                    onClick={nextClickHandler}
            > Next</Button>
        </div>
    )
}




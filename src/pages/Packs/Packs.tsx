import React, {FC, useEffect, useRef} from 'react'
import {useDispatch} from 'react-redux'
import {fetchCardPacks} from '../../store/reducers/packs-reducer'
import {useTypedSelector} from '../../hooks/hooks'
import {Redirect} from 'react-router-dom'
import {PATH} from '../../routes/routes'
import {useModal} from '../../hooks/useModal'
import {PacksPagination} from './PacksPagination/PacksPagination'
import {PrivatePacksToggle} from './PrivatePacksToggle/PrivatePacksToggle'
import {PacksSearch} from './PacksSearch/PacksSearch'
import {CardsCountRange} from './CardsCountRange/CardsCountRange'
import {PacksTable} from './PacksTable/PacksTable'

export const Packs: FC = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn)
    const userID = useTypedSelector(state => state.auth.userInfo?._id)
    const {
        page,
        pageCount,
        cardPacksTotalCount,
        minCardsCount,
        maxCardsCount,
        cardPacks,
        privatePacks,
        sortPacksMethod
    } = useTypedSelector(state => state.packs)
    const paginationScrollTopRef = useRef<HTMLHeadingElement>(null)
    const {isOpen, onOpen, onClose, onToggle} = useModal()

    useEffect(() => {
        dispatch(fetchCardPacks())
    }, [page, pageCount, minCardsCount, maxCardsCount, privatePacks, sortPacksMethod])

    useEffect(() => {
        paginationScrollTopRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [page, pageCount])

    if (!isLoggedIn) return <Redirect to={PATH.LOGIN}/>

    return (
        <div>
            <h1 ref={paginationScrollTopRef}>Packs</h1>
            <PacksSearch/>
            <CardsCountRange minCardsCount={minCardsCount} maxCardsCount={maxCardsCount}/>
            <PrivatePacksToggle privatePacks={privatePacks}/>
            <PacksTable cardPacks={cardPacks} userID={userID}/>
            <PacksPagination totalCount={cardPacksTotalCount}
                             countPerPage={pageCount}
                             currentPage={page}/>
        </div>
    )
}
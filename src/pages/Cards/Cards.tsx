import React, {FC, useEffect, useRef} from 'react'
import {useDispatch} from 'react-redux'
import {fetchCards, setCurrentCardsPackID} from '../../store/reducers/cards-reducer'
import {Link, useParams} from 'react-router-dom'
import {useTypedSelector} from '../../hooks/hooks'
import {PATH} from '../../routes/routes'
import {CardsTable} from './CardsTable/CardsTable'
import {CardsPagination} from './CardsPagination/CardsPagination'
import {CardsGradeRange} from './CardsGradeRange/CardsGradeRange'
import {CardsSearch} from './CardsSearch/CardsSearch'

export const Cards: FC = () => {
    const dispatch = useDispatch()
    const {id} = useParams<{ id: string }>()
    const {
        cards,
        page,
        pageCount,
        cardsTotalCount,
        minGrade,
        maxGrade,
        sortCardsMethod,
        packUserId,
    } = useTypedSelector(state => state.cards)
    const cardPacks = useTypedSelector(state => state.packs.cardPacks)
    const userID = useTypedSelector(state => state.auth.userInfo?._id)
    const paginationScrollTopRef = useRef<HTMLHeadingElement>(null)

    const currentCardsPack = cardPacks.find(p => p._id === id)

    useEffect(() => {
        dispatch(setCurrentCardsPackID({id}))
    }, [id])

    useEffect(() => {
        id && dispatch(fetchCards())
    }, [page, pageCount, minGrade, maxGrade, sortCardsMethod])

    useEffect(() => {
        paginationScrollTopRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [page])

    return (
        <div>
            <h1 ref={paginationScrollTopRef}>Cards</h1>

            {currentCardsPack
                ? <>
                    <div style={{margin: '40px 0'}}>
                        <p>Pack owner: {currentCardsPack.user_name}</p>
                        <p>Pack name: {currentCardsPack.name}</p>
                    </div>

                    <CardsSearch/>
                    <CardsGradeRange minGrade={minGrade} maxGrade={maxGrade}/>
                    <CardsTable cards={cards} cardsPackID={id} userID={userID} cardsOwnerID={packUserId}/>
                    <CardsPagination cardsTotalCount={cardsTotalCount}
                                     pageCount={pageCount}
                                     page={page}/>
                </>
                : <h2>Please choose one of Packs <Link to={PATH.PACKS}>here</Link></h2>}
        </div>
    )
}
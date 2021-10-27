import React, {FC, useEffect} from 'react'
import {useTypedSelector} from '../../hooks/hooks'
import {Packs} from './Packs'
import {Progress} from '../../components/UI/Progress/Progress'
import {Redirect} from 'react-router-dom'
import {PATH} from '../../routes/routes'
import {fetchCardPacks} from '../../store/reducers/packs-reducer'
import {useDispatch} from 'react-redux'

export const PacksContainer: FC = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn)
    const cardsInfo = useTypedSelector(state => state.packs.cardsInfo)

    useEffect(() => {
        dispatch(fetchCardPacks())
    }, [])

    if (!isLoggedIn) return <Redirect to={PATH.LOGIN}/>
    return (
        <div>
            {cardsInfo ? <Packs cardsInfo={cardsInfo}/> : <Progress/>}
        </div>
    )
}
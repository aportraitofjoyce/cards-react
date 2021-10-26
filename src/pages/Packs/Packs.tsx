import React, {FC, useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {packsModel} from './packsModel'
import {fetchCardPacks} from '../../store/reducers/packs-reducer'
import {Range} from 'rc-slider'
import {Pagination} from '../../components/UI/Pagination/Pagination'
import {Table} from '../../components/UI/Table/Table'
import {useTypedSelector} from '../../hooks/hooks'
import {checkAuth} from '../../store/reducers/auth-reducer'
import {Redirect} from 'react-router-dom'
import {PATH} from '../../routes/routes'

export const Packs: FC = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn)
    const packs = useTypedSelector(state => state.packs.cardPacks)

    const [rangeValues, setRangeValues] = useState([0, 100])
    const rangeMarks = {
        0: {style: {fontSize: 16}, label: rangeValues[0]},
        100: {style: {fontSize: 16}, label: rangeValues[1]}
    }

    const model = packsModel(
        () => {
        },
        (id) => {
        },
        (id) => {
        }
    )

    useEffect(() => {
        !isLoggedIn && dispatch(checkAuth())
    }, [dispatch])

    useEffect(() => {
        isLoggedIn && dispatch(fetchCardPacks())
    }, [])

    if (!isLoggedIn) return <Redirect to={PATH.LOGIN}/>

    return (
        <div>
            <h1>Packs</h1>
            <div>Search Form, Double Range, Pagination</div>
            <Range value={rangeValues} onChange={values => setRangeValues(values)} marks={rangeMarks}/>
            <Pagination totalCount={20} countPerPage={5} currentPage={5} onChangePage={() => {}}/>
            <Table model={model} data={packs}/>
        </div>
    )
}
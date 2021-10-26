import React, {ChangeEvent, FC, useCallback, useEffect, useState} from 'react'
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
import {Checkbox} from '../../components/UI/Checkbox/Checkbox'
import {Input} from '../../components/UI/Input/Input'
import _ from 'lodash'
import {Pagination2} from '../../components/UI/Pagination/Pagination2'

export const Packs: FC = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn)
    const userID = useTypedSelector(state => state.auth.userInfo?._id)
    const packs = useTypedSelector(state => state.packs.cardPacks)
    const [isPrivatePacks, setIsPrivatePacks] = useState(false)
    const [searchValue, setSearchValue] = useState('')
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

    const onPrivateChangeHandler = async () => {
        await dispatch(fetchCardPacks({user_id: userID}))
        setIsPrivatePacks(!isPrivatePacks)
    }

    const debouncedSearch = useCallback(_.debounce(value => dispatch(fetchCardPacks({packName: value})), 500), [])
    const debouncedRange = useCallback(_.throttle(values => dispatch(fetchCardPacks({min: values[0], max: values[1]})), 1500), [])

    const onSearchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.currentTarget.value)

    const onRangeChangeHandler = (values: number[]) => {
        setRangeValues(values)
        debouncedRange(values)
    }

    const onPageChangeHandler = () => {
    }


    /*useEffect(() => {
        !isLoggedIn && dispatch(checkAuth())
    }, [dispatch])*/

    useEffect(() => {
        dispatch(fetchCardPacks())
    }, [])

    useEffect(() => {
        searchValue && debouncedSearch(searchValue)
    }, [searchValue])

    if (!isLoggedIn) return <Redirect to={PATH.LOGIN}/>

    return (
        <div>
            <h1>Packs</h1>
            <label htmlFor='packs-search'>
                Search
                <Input id={'packs-search'}
                       placeholder={'Enter pack name...'}
                       value={searchValue}
                       onChange={onSearchChangeHandler}/>
            </label>

            <Checkbox checked={isPrivatePacks} onChange={onPrivateChangeHandler}>
                Show private
            </Checkbox>

            <Range value={rangeValues} onChange={values => onRangeChangeHandler(values)} marks={rangeMarks}/>

            <Pagination totalCount={20} countPerPage={5} currentPage={5} onChangePage={onPageChangeHandler}/>
            <Pagination2 totalPages={20} setCurrentPage={onPageChangeHandler} currentPage={1}/>

            <Table model={model} data={packs}/>
        </div>
    )
}
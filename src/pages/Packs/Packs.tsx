import React, {ChangeEvent, FC, useCallback, useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {packsModel} from './packsModel'
import {createCardsPack, deleteCardsPack, fetchCardPacks, updateCardsPack} from '../../store/reducers/packs-reducer'
import {Range} from 'rc-slider'
import {Pagination} from '../../components/UI/Pagination/Pagination'
import {Table} from '../../components/UI/Table/Table'
import {useTypedSelector} from '../../hooks/hooks'
import {Redirect} from 'react-router-dom'
import {PATH} from '../../routes/routes'
import {Checkbox} from '../../components/UI/Checkbox/Checkbox'
import {Input} from '../../components/UI/Input/Input'
import _ from 'lodash'
import {Pagination2} from '../../components/UI/Pagination/Pagination2'
import {GetCardPacksQueryParams} from '../../api/packs-api'

export const Packs: FC = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn)
    const userID = useTypedSelector(state => state.auth.userInfo?._id)
    const packs = useTypedSelector(state => state.packs.cardPacks)
    const {page, pageCount, cardPacksTotalCount, minCardsCount, maxCardsCount} = useTypedSelector(state => state.packs)
    const [isPrivatePacks, setIsPrivatePacks] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [rangeValues, setRangeValues] = useState([minCardsCount, maxCardsCount])
    const rangeMarks = {
        0: {style: {fontSize: 16}, label: rangeValues[0]},
        100: {style: {fontSize: 16}, label: rangeValues[1]}
    }

    const model = packsModel(
        () => {
            const name = prompt()
            dispatch(createCardsPack({cardsPack: {name: name!, private: false}}))
        },
        (id) => dispatch(deleteCardsPack({id})),
        (id) => {
            const name = prompt()
            dispatch(updateCardsPack({cardsPack: {_id: id, name: name!}}))
        },
    )

    const onPrivateChangeHandler = async () => {
        await dispatch(fetchCardPacks({user_id: userID}))
        setIsPrivatePacks(!isPrivatePacks)
    }

    const debouncedSearch = useCallback(_.debounce(value => dispatch(fetchCardPacks({packName: value})), 500), [])
    const debouncedRange = useCallback(_.throttle(values => dispatch(fetchCardPacks({
        min: values[0],
        max: values[1]
    })), 1500), [])

    const onSearchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.currentTarget.value)

    const onRangeChangeHandler = (values: number[]) => {
        setRangeValues(values)
        debouncedRange(values)
    }

    const onPageChangeHandler = useCallback((page: number) => {
        dispatch(fetchCardPacks({page: page}))
    }, [])

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

            <Checkbox checked={isPrivatePacks}
                      onChange={onPrivateChangeHandler}>
                Show private
            </Checkbox>

            <Range value={rangeValues}
                   onChange={values => onRangeChangeHandler(values)}
                   marks={rangeMarks}/>

            <Pagination totalCount={cardPacksTotalCount}
                        countPerPage={pageCount}
                        currentPage={page}
                        onChangePage={onPageChangeHandler}/>

            <Table model={model}
                   data={packs}/>
        </div>
    )
}
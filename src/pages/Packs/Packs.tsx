import React, {ChangeEvent, FC, useCallback, useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {
    createCardsPack,
    deleteCardsPack,
    fetchCardPacks,
    setCurrentPage,
    setMinMaxCardsCount,
    setPacksCountOnPage, setPrivatePacks,
    updateCardsPack
} from '../../store/reducers/packs-reducer'
import {Pagination} from '../../components/UI/Pagination/Pagination'
import {Table} from '../../components/UI/Table/Table'
import {useTypedSelector} from '../../hooks/hooks'
import {Checkbox} from '../../components/UI/Checkbox/Checkbox'
import {Input} from '../../components/UI/Input/Input'
import _ from 'lodash'
import {packsModel} from './packsModel'
import {Range} from 'rc-slider'
import {Redirect} from 'react-router-dom'
import {PATH} from '../../routes/routes'
import {Select} from '../../components/UI/Select/Select'

export const Packs: FC = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn)
    const {
        page,
        pageCount,
        cardPacksTotalCount,
        minCardsCount,
        maxCardsCount,
        cardPacks,
        privatePacks
    } = useTypedSelector(state => state.packs)

    const [isPrivatePacks, setIsPrivatePacks] = useState(privatePacks)
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
        (id) => {
            dispatch(deleteCardsPack({id}))
        },
        (id) => {
            const name = prompt()
            dispatch(updateCardsPack({cardsPack: {_id: id, name: name!}}))
        },
    )

    const onPageChangeHandler = (page: number) => dispatch(setCurrentPage({page}))

    const onSelectChangeHandler = (option: string) => dispatch(setPacksCountOnPage({count: Number(option)}))

    const onRangeChangeHandler = (values: number[]) => {
        setRangeValues(values)
        debouncedRange(values)
    }

    const onPrivateChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setPrivatePacks({value: e.currentTarget.checked}))
        setIsPrivatePacks(e.currentTarget.checked)
    }

    const debouncedRange = useCallback(_.debounce(values => dispatch(setMinMaxCardsCount({values: values})), 500), [])

    const onSearchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.currentTarget.value)

    const debouncedSearch = useCallback(_.debounce(value => dispatch(fetchCardPacks({packName: value})), 500), [])

    useEffect(() => {
        dispatch(fetchCardPacks())
    }, [page, pageCount, minCardsCount, maxCardsCount, privatePacks])

    useEffect(() => {
        debugger
        debouncedSearch(searchValue)
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
                   marks={rangeMarks}
                   onChange={onRangeChangeHandler}/>

            <Select options={[10, 25, 50]} onChangeOption={onSelectChangeHandler}/>

            <Pagination totalCount={cardPacksTotalCount}
                        countPerPage={pageCount}
                        currentPage={page}
                        onChangePage={onPageChangeHandler}/>

            <Table model={model}
                   data={cardPacks}/>
        </div>
    )
}


{/*<Range values={rangeValues}
                   onChange={values => onRangeChangeHandler(values)}
                   min={0}
                   max={120}
                   renderTrack={({props, children}) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        height: '6px',
                        width: '100%',
                        backgroundColor: '#ccc'
                    }}
                >
                    {children}
                </div>
            )} renderThumb={({props}) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        height: '42px',
                        width: '42px',
                        backgroundColor: '#999'
                    }}
                />
            )}/>*/
}
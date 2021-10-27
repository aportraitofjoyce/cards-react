import React, {ChangeEvent, FC, useCallback, useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {createCardsPack, deleteCardsPack, fetchCardPacks, updateCardsPack} from '../../store/reducers/packs-reducer'
import {Pagination} from '../../components/UI/Pagination/Pagination'
import {Table} from '../../components/UI/Table/Table'
import {useTypedSelector} from '../../hooks/hooks'
import {Checkbox} from '../../components/UI/Checkbox/Checkbox'
import {Input} from '../../components/UI/Input/Input'
import _ from 'lodash'
import {CardsPackResponse} from '../../api/packs-api'

import {packsModel} from './packsModel'
import {Range} from 'rc-slider'

type PacksProps = {
    cardsInfo: CardsPackResponse
}

export const Packs: FC<PacksProps> = props => {
    const dispatch = useDispatch()
    const {page, pageCount, cardPacksTotalCount, minCardsCount, maxCardsCount, cardPacks} = props.cardsInfo
    const userID = useTypedSelector(state => state.auth.userInfo?._id)

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
        (id) => {
            dispatch(deleteCardsPack({id}))
        },
        (id) => {
            const name = prompt()
            dispatch(updateCardsPack({cardsPack: {_id: id, name: name!}}))
        },
    )

    const onPrivateChangeHandler = async () => {
        !isPrivatePacks ? await dispatch(fetchCardPacks({user_id: userID})) : await dispatch(fetchCardPacks())
        //await dispatch(fetchCardPacks({user_id: userID}))
        setIsPrivatePacks(!isPrivatePacks)
    }

    const debouncedSearch = useCallback(_.debounce(value => dispatch(fetchCardPacks({packName: value})), 500), [])
    const debouncedRange = useCallback(_.throttle(values => dispatch(fetchCardPacks({
        min: values[0],
        max: values[1]
    })), 2000), [])

    const onSearchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.currentTarget.value)

    const onRangeChangeHandler = (values: number[]) => {
        setRangeValues(values)
        debouncedRange(values)
    }

    const onPageChangeHandler = useCallback((page: number) => {
        dispatch(fetchCardPacks({page: page}))
    }, [])


    useEffect(() => {
        searchValue && debouncedSearch(searchValue)
    }, [searchValue])


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
            )}/>*/}

            <Pagination totalCount={cardPacksTotalCount}
                        countPerPage={pageCount}
                        currentPage={page}
                        onChangePage={onPageChangeHandler}/>

            <Table model={model}
                   data={cardPacks}/>
        </div>
    )
}
import React, {ChangeEvent, FC, useCallback, useEffect, useState} from 'react'
import {cardsModel} from './cardsModel'
import {useDispatch} from 'react-redux'
import {
    createCard,
    deleteCard,
    fetchCards,
    setCardsCountOnPage,
    setCardsCurrentPage,
    setCurrentCardsPackID,
    setMinMaxGrade,
    updateCard
} from '../../store/reducers/cards-reducer'
import {useParams} from 'react-router-dom'
import {Table} from '../../components/UI/Table/Table'
import {useTypedSelector} from '../../hooks/hooks'
import _ from 'lodash'
import {Input} from '../../components/UI/Input/Input'
import {Pagination} from '../../components/UI/Pagination/Pagination'
import {Range} from 'rc-slider'
import {Select} from '../../components/UI/Select/Select'
import s from './Cards.module.css'

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
    } = useTypedSelector(state => state.cards)
    const cardPacks = useTypedSelector(state => state.packs.cardPacks)
    const [searchQuestionValue, setSearchQuestionValue] = useState('')
    const [searchAnswerValue, setSearchAnswerValue] = useState('')
    const [rangeValues, setRangeValues] = useState([minGrade, maxGrade])

    const currentCardsPack = cardPacks.find(p => p._id === id)

    const model = cardsModel(
        () => {
            const question = prompt()
            dispatch(createCard({card: {cardsPack_id: id, question: question!}}))
        },
        id => {
            dispatch(deleteCard({id: id}))
        },
        id => {
            const question = prompt()
            dispatch(updateCard({card: {_id: id, question: question!}}))
        }
    )

    const rangeMarks = {
        0: {style: {fontSize: 16}, label: rangeValues[0]},
        6: {style: {fontSize: 16}, label: rangeValues[1]}
    }

    const onPageChangeHandler = (page: number) => dispatch(setCardsCurrentPage({page}))
    const onSelectChangeHandler = (option: string) => dispatch(setCardsCountOnPage({count: Number(option)}))

    const onQuestionSearchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuestionValue(e.currentTarget.value)
        debouncedQuestionSearch(e.currentTarget.value)
    }

    const onAnswerSearchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchAnswerValue(e.currentTarget.value)
        debouncedAnswerSearch(e.currentTarget.value)
    }

    const debouncedQuestionSearch = useCallback(_.debounce(value => dispatch(fetchCards({cardQuestion: value})), 500), [])
    const debouncedAnswerSearch = useCallback(_.debounce(value => dispatch(fetchCards({cardAnswer: value})), 500), [])

    const onRangeChangeHandler = (values: number[]) => {
        setRangeValues(values)
        debouncedRange(values)
    }

    const debouncedRange = useCallback(_.debounce(values => dispatch(setMinMaxGrade({values: values})), 500), [])

    useEffect(() => {
        dispatch(setCurrentCardsPackID({id}))
    }, [id])

    useEffect(() => {
        id && dispatch(fetchCards())
    }, [page, pageCount, minGrade, maxGrade])

    return (
        <div>
            <h1>Cards</h1>
            {currentCardsPack && <div style={{margin: '40px 0'}}>
				<p>Pack owner: {currentCardsPack.user_name}</p>
				<p>Pack name: {currentCardsPack.name}</p>
			</div>}

            <label htmlFor='cards-question-search'>
                Question Search
                <Input id={'cards-question-search'}
                       placeholder={'Enter question...'}
                       value={searchQuestionValue}
                       onChange={onQuestionSearchChangeHandler}/>
            </label>

            <label htmlFor='cards-answer-search'>
                Answer Search
                <Input id={'cards-answer-search'}
                       placeholder={'Enter answer...'}
                       value={searchAnswerValue}
                       onChange={onAnswerSearchChangeHandler}/>
            </label>

            <Range value={rangeValues}
                   marks={rangeMarks}
                   max={6}
                   onChange={onRangeChangeHandler}
                   style={{margin: '32px 8px 48px 8px', width: 'inherit'}}/>

            <Table model={model} data={cards}/>

            <div className={s.paginationContainer}>
                <Pagination totalCount={cardsTotalCount}
                            countPerPage={pageCount}
                            currentPage={page}
                            onChangePage={onPageChangeHandler}/>

                <div>
                    <span style={{paddingRight: 16}}> Show on page:</span>
                    <Select options={[5, 20, 50]} onChangeOption={onSelectChangeHandler}/>
                </div>
            </div>
        </div>
    )
}
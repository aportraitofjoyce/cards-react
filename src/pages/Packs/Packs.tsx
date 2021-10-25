import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {fetchPacks} from "../../store/reducers/packs-reducer";

export type PacksType = {
    _id: string
    user_id: string
    name: string
    path?: string // папка
    cardsCount: number
    grade?: number // средняя оценка карточек
    shots?: number // количество попыток
    rating?: number // лайки
    type?: string // ещё будет "folder" (папка)
    created: string
    updated: string
    __v?: number
}

const Packs = (props: PacksType) => {
    const dispatch = useDispatch()


    return (
        <div>
            <button>X</button>
        </div>
    );
};

export default Packs;
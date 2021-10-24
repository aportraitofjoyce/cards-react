import React, {FC} from 'react'
import {useTypedSelector} from '../../hooks/hooks'

export const Packs: FC = () => {
    const packs = useTypedSelector(state => state.packs.packs)

    return (
        <div>
            <h1>Packs</h1>
            <div>Search Form, Double Range</div>
            <div>Table</div>
        </div>
    )
}
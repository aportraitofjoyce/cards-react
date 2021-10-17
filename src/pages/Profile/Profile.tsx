import React, {FC} from 'react'
import {useSelector} from 'react-redux'
import {RootState} from "../../store/store";

export const Profile: FC = () => {
    const name = useSelector<RootState, string>(state => state.login.name)
    const avatar = useSelector<RootState, string>(state => state.login.avatar)
    const publicCardPacksCount = useSelector<RootState, number>(state => state.login.publicCardPacksCount)


    return (
        <div>
            <form>
                <h1>Profile</h1>
                <div>{name}</div>
                <div>{avatar}</div>
                <div>{publicCardPacksCount}</div>
            </form>
        </div>
    )
}
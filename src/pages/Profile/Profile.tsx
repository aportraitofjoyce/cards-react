import React, {FC} from 'react'
import {useTypedSelector} from "../../hooks/hooks";

export const Profile: FC = () => {

    const name = useTypedSelector(state => state.login.name)
    const avatar = useTypedSelector(state => state.login.avatar)
    const publicCardPacksCount = useTypedSelector(state => state.login.publicCardPacksCount)

    return (
        <div>
            <h1>Profile</h1>
            <form>
                <div>{avatar}</div>
                {name && <div>{publicCardPacksCount}</div>}
            </form>
        </div>
    )
}
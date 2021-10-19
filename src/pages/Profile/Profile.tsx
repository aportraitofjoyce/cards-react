import React, {FC,useEffect} from 'react'
import {useTypedSelector} from "../../hooks/hooks";
import {useDispatch} from 'react-redux'
import {checkAuth} from '../../store/reducers/auth-reducer'
import {Redirect} from 'react-router-dom'
import {PATH} from '../../routes/routes'

export const Profile: FC = () => {
    const {isLoggedIn} = useTypedSelector(state => state.auth)

    const name = useTypedSelector(state => state.login.name)
    const avatar = useTypedSelector(state => state.login.avatar)
    const publicCardPacksCount = useTypedSelector(state => state.login.publicCardPacksCount)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch])

    return (
        <div>
            {!isLoggedIn && <Redirect to={PATH.LOGIN}/>}
            <h1>Profile</h1>
            <form>
                <div>{avatar}</div>
                {name && <div>{publicCardPacksCount}</div>}
            </form>
        </div>
    )
}
import React, {FC, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../store/store'
import {checkAuth} from '../../store/reducers/auth-reducer'
import {useTypedSelector} from '../../hooks/hooks'
import {Redirect} from 'react-router-dom'
import {PATH} from '../../routes/routes'

export const Profile: FC = () => {
    const {isLoggedIn} = useTypedSelector(state => state.auth)
    const name = useSelector<RootState, string>(state => state.login.name)
    const avatar = useSelector<RootState, string>(state => state.login.avatar)
    const publicCardPacksCount = useSelector<RootState, number>(state => state.login.publicCardPacksCount)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch])

    return (
        <div>
            {!isLoggedIn && <Redirect to={PATH.LOGIN}/>}
            <form>
                <h1>Profile</h1>
                <div>{name}</div>
                <div>{avatar}</div>
                <div>{publicCardPacksCount}</div>
            </form>
        </div>
    )
}
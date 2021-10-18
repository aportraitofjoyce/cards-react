import React, {FC, useEffect} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PATH, publicRoutes} from '../routes/routes'
import {useTypedSelector} from '../hooks/hooks'
import {Progress} from '../components/UI/Progress/Progress'
import {useDispatch} from 'react-redux'
import {checkAuth} from '../store/reducers/auth-reducer'

export const AppRouter: FC = () => {
    const {status, isInitialized} = useTypedSelector(state => state.app)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkAuth())
    }, [])

    if (!isInitialized) return <Progress/>

    return (
        <>
            {status === 'loading' && <Progress/>}
            <Switch>
                {publicRoutes.map(r => <Route key={r.path} path={r.path} component={r.component} exact={r.exact}/>)}
                <Redirect from={PATH.EMPTY} to={PATH.ERROR}/>
            </Switch>
        </>
    )
}
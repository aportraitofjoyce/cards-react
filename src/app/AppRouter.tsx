import React, {FC} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PATH, publicRoutes} from '../routes/routes'

export const AppRouter: FC = () => {
    return (
        <>
            <Switch>
                {publicRoutes.map(r => <Route key={r.path} path={r.path} component={r.component} exact={r.exact}/>)}

                <Redirect from={PATH.EMPTY} to={PATH.ERROR}/>
            </Switch>
        </>
    )
}
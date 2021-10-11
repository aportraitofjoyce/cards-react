import React, {FC} from 'react'
import {Route, Switch} from 'react-router-dom'
import {publicRoutes} from '../routes/routes'

export const AppRouter: FC = () => {
    return (
        <>
            <Switch>
                {publicRoutes.map(r => <Route key={r.path} path={r.path} component={r.component} exact={r.exact}/>)}
            </Switch>
        </>
    )
}
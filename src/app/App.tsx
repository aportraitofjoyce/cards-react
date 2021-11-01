import React, {FC} from 'react'
import {AppRouter} from './AppRouter'
import {HashRouter} from 'react-router-dom'
import {Header} from '../components/Header/Header'
import {Provider} from 'react-redux'
import {store} from '../store/store'
import {Alerts} from '../components/UI/Alerts/Alerts'
import {ScrollButton} from '../components/UI/ScrollButton/ScrollButton'

export const App: FC = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <Alerts/>
                <Header/>
                <AppRouter/>
                <ScrollButton/>
            </Provider>
        </HashRouter>
    )
}
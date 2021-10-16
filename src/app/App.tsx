import React, {FC} from 'react'
import {AppRouter} from './AppRouter'
import {HashRouter} from 'react-router-dom'
import {Header} from '../components/Header/Header'
import {Provider} from 'react-redux'
import {store} from '../store/store'

export const App: FC = () => {
    // ILYA

    return (
        <HashRouter>
            <Provider store={store}>
                <Header/>
                <AppRouter/>
            </Provider>
        </HashRouter>
    )
}
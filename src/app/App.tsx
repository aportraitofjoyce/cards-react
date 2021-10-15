import React from 'react'
import {AppRouter} from './AppRouter'
import {HashRouter} from 'react-router-dom'
import {Header} from '../components/Header/Header'
import {Provider} from 'react-redux'
import {store} from '../store/store'

//test commit


export const App = () => (
    <HashRouter>
        <Provider store={store}>
            <Header/>
            <AppRouter/>
        </Provider>
    </HashRouter>
)
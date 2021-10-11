import React from 'react'
import {AppRouter} from './AppRouter'
import {BrowserRouter} from 'react-router-dom'
import {Header} from '../components/Header/Header'

export const App = () => (
    <BrowserRouter>
        <Header/>
        <AppRouter/>
    </BrowserRouter>
)

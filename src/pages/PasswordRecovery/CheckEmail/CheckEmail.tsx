import React from 'react'
import s from './CheckEmail.module.css'
import {PATH} from '../../../routes/routes'
import {useHistory} from 'react-router-dom'
import {useTypedSelector} from '../../../hooks/hooks'

export const CheckEmail = () => {
    const email = useTypedSelector(state => state.auth.recoveryEmail)
    const history = useHistory()

    setTimeout(() => {
        history.push(PATH.LOGIN)
    }, 3000)

    return (
        <div className={s.checkEmail}>
            <div className={s.container}>
                <h1>IT-incubator</h1>
                <div className={s.icon}><img src='https://su-19.ru/wp-content/uploads/2020/12/mail_ico.png'
                                             alt='iconMail'/></div>

                <h3>We've sent an Email with instructions to {email}</h3>
            </div>
        </div>
    )
}
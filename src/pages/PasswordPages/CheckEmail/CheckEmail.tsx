import React from 'react'
import {useTypedSelector} from '../../../hooks/hooks'

export const CheckEmail = () => {
    const {recoveryEmail} = useTypedSelector(state => state.auth)

    return (
        <div>
            <h1>Check Email</h1>
            <img src='https://su-19.ru/wp-content/uploads/2020/12/mail_ico.png'
                 alt='iconMail'/>
            <h3>We've sent an Email with instructions to {recoveryEmail}</h3>
        </div>
    )
}
import React, {FC} from 'react'
import {Link} from 'react-router-dom'
import {PATH} from '../../routes/routes'
import s from './Header.module.css'

export const Header: FC = () => {
    return (
        <div className={s.wrapper}>
            <nav className={s.container}>
                <Link to={PATH.HOME}>Home</Link>
                <Link to={PATH.PROFILE}>Profile</Link>
                <Link to={PATH.LOGIN}>Login</Link>
                <Link to={PATH.REGISTER}>Register</Link>
                <Link to={PATH.PASSWORD_RECOVERY}>Password Recovery</Link>
                <Link to={PATH.NEW_PASSWORD}>New Password</Link>
                <Link to={PATH.CHECK_EMAIL}>Check email</Link>
                <Link to={PATH.UI_KIT}>UI Kit</Link>
            </nav>
        </div>

    )
}
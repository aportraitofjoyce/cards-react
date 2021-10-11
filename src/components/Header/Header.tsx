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
                <Link to={PATH.SIGN_IN}>Sign In</Link>
                <Link to={PATH.SIGN_UP}>Sign Up</Link>
                <Link to={PATH.PASSWORD_RECOVERY}>Password Recovery</Link>
                <Link to={PATH.NEW_PASSWORD}>New Password</Link>
                <Link to={PATH.UI_KIT}>UI Kit</Link>
            </nav>
        </div>

    )
}
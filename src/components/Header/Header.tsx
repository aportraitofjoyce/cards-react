import React, {FC} from 'react'
import {NavLink} from 'react-router-dom'
import {PATH} from '../../routes/routes'
import s from './Header.module.css'
import {useDispatch} from 'react-redux'
import {logout} from '../../store/reducers/auth-reducer'

export const Header: FC = () => {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <div className={s.wrapper}>
            <nav className={s.container}>
                <NavLink activeClassName={s.active} to={PATH.HOME} exact>Home</NavLink>
                <NavLink activeClassName={s.active} to={PATH.PROFILE} style={{marginRight: 64}}>Profile</NavLink>
                <NavLink activeClassName={s.active} to={PATH.REGISTRATION}>Registration</NavLink>
                <NavLink activeClassName={s.active} to={PATH.LOGIN}>Login</NavLink>
                <NavLink activeClassName={s.active} to={PATH.PASSWORD_RECOVERY}>Password Recovery</NavLink>
                <NavLink activeClassName={s.active} to={PATH.CHECK_EMAIL}>Check email</NavLink>
                <NavLink activeClassName={s.active} to={PATH.NEW_PASSWORD}>New Password</NavLink>
                <span onClick={logoutHandler}>Logout</span>
            </nav>
        </div>
    )
}
import React, {FC} from 'react'
import {NavLink} from 'react-router-dom'
import {PATH} from '../../routes/routes'
import s from './Header.module.css'
import {useDispatch} from 'react-redux'
import {logout} from '../../store/reducers/auth-reducer'
import {useTypedSelector} from '../../hooks/hooks'

export const Header: FC = () => {
    const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    return (
        <div className={s.wrapper}>
            <nav className={s.container} style={{display: 'flex', justifyContent: 'space-between'}}>
                {!isLoggedIn && <>
					<NavLink activeClassName={s.active} to={PATH.HOME} exact>LOGO</NavLink>
					<NavLink activeClassName={s.active} to={PATH.LOGIN}>Login</NavLink>
				</>}

                {isLoggedIn && <>
					<NavLink activeClassName={s.active} to={PATH.HOME} exact>LOGO</NavLink>
					<NavLink activeClassName={s.active} to={PATH.PROFILE}>Profile</NavLink>
					<span onClick={() => dispatch(logout())}>Logout</span>
				</>}
            </nav>
        </div>
    )
}
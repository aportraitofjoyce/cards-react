import {FC} from 'react'
import {Profile} from '../pages/Profile/Profile'
import {Login} from '../pages/Login/Login'
import {Register} from '../pages/Register/Register'
import {UiKit} from '../components/UIKit/UiKit'
import {Error} from '../pages/Error/Error'
import {PasswordRecovery} from '../pages/PasswordRecovery/PasswordRecovery'
import {NewPassword} from '../pages/NewPassword/NewPassword'

export enum PATH {
    HOME = '/',
    ERROR = '',
    PROFILE = '/profile',
    LOGIN = '/login',
    REGISTER = '/register',
    PASSWORD_RECOVERY = '/password-recovery',
    NEW_PASSWORD = '/new-password',
    UI_KIT = '/ui-kit',
}

type Routes = {
    path: string,
    component: FC
    exact?: boolean
}

export const publicRoutes: Routes[] = [
    {path: PATH.HOME, component: Profile, exact: true},
    {path: PATH.PROFILE, component: Profile},
    {path: PATH.LOGIN, component: Login},
    {path: PATH.REGISTER, component: Register},
    {path: PATH.PASSWORD_RECOVERY, component: PasswordRecovery},
    {path: PATH.NEW_PASSWORD, component: NewPassword},
    {path: PATH.UI_KIT, component: UiKit},
    {path: PATH.ERROR, component: Error},
]
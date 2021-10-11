import {FC} from 'react'
import {Profile} from '../pages/Profile/Profile'
import {SignIn} from '../pages/SignIn/SignIn'
import {SignUp} from '../pages/SignUp/SignUp'
import {PasswordRecovery} from '../pages/AccountSettings/PasswordRecovery/PasswordRecovery'
import {NewPassword} from '../pages/AccountSettings/NewPassword/NewPassword'
import {UiKit} from '../components/UIKit/UiKit'
import {Error} from '../pages/Error/Error'

export enum PATH {
    HOME = '/',
    ERROR = '',
    PROFILE = '/profile',
    SIGN_IN = '/sign-in',
    SIGN_UP = '/sign-up',
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
    {path: PATH.SIGN_IN, component: SignIn},
    {path: PATH.SIGN_UP, component: SignUp},
    {path: PATH.PASSWORD_RECOVERY, component: PasswordRecovery},
    {path: PATH.NEW_PASSWORD, component: NewPassword},
    {path: PATH.UI_KIT, component: UiKit},
    {path: PATH.ERROR, component: Error},
]
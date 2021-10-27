import {FC} from 'react'
import {Profile} from '../pages/Profile/Profile'
import {Login} from '../pages/Login/Login'
import {Registration} from '../pages/Registration/Registration'
import {Error} from '../pages/Error/Error'
import {PasswordRecovery} from '../pages/PasswordPages/PasswordRecovery/PasswordRecovery'
import {NewPassword} from '../pages/PasswordPages/NewPassword/NewPassword'
import {CheckEmail} from '../pages/PasswordPages/CheckEmail/CheckEmail'
import {Home} from '../pages/Home/Home'
import {Cards} from '../pages/Cards/Cards'
import {Card} from '../pages/Cards/Card'
import {Packs} from '../pages/Packs/Packs'

export enum PATH {
    HOME = '/',
    EMPTY = '',
    ERROR = '/404',
    PROFILE = '/profile',
    LOGIN = '/login',
    REGISTRATION = '/registration',
    PASSWORD_RECOVERY = '/password-recovery',
    NEW_PASSWORD = '/new-password',
    NEW_PASSWORD_WITH_TOKEN = '/new-password/:token?',
    CHECK_EMAIL = '/check-email',
    PACKS = '/packs',
    CARDS = '/cards',
    CARD = '/cards/:id',
}

type Routes = {
    path: string,
    component: FC
    exact?: boolean
}

export const publicRoutes: Routes[] = [
    {path: PATH.HOME, component: Home, exact: true},
    {path: PATH.PROFILE, component: Profile},
    {path: PATH.REGISTRATION, component: Registration},
    {path: PATH.LOGIN, component: Login},
    {path: PATH.PASSWORD_RECOVERY, component: PasswordRecovery},
    {path: PATH.NEW_PASSWORD_WITH_TOKEN, component: NewPassword},
    {path: PATH.CHECK_EMAIL, component: CheckEmail},
    {path: PATH.PACKS, component: Packs},
    {path: PATH.CARDS, component: Cards},
    {path: PATH.CARD, component: Card},
    {path: PATH.ERROR, component: Error},
]
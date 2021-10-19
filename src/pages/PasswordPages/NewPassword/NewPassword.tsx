import React, {FC, FormEvent, useState} from 'react'
import {Button} from '../../../components/UI/Button/Button'
import {Input} from '../../../components/UI/Input/Input'
import {Redirect, useParams} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {newPassword} from '../../../store/reducers/auth-reducer'
import {useTypedSelector} from '../../../hooks/hooks'
import {PATH} from '../../../routes/routes'

export const NewPassword: FC = () => {
    const dispatch = useDispatch()
    const {token} = useParams<{ token: string }>()
    const successChangePassword = useTypedSelector(state => state.auth.setSuccessNewPass)

    const [firstPass, setFirstPass] = useState<string>('')
    const [secondPass, setSecondPass] = useState<string>('')

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        firstPass === secondPass && dispatch(newPassword(firstPass, token))
    }

    if (successChangePassword) return <Redirect to={PATH.LOGIN}/>

    return (
        <div>
            <h1>Create new password</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor='inputNewPassword'>
                    New Password
                    <Input
                        id={'inputNewPassword'}
                        type={'text'}
                        onChange={(e) => setFirstPass(e.currentTarget.value)}
                        value={firstPass}
                        placeholder={'New password'}/>
                </label>

                <label htmlFor='RepeatNewPassword'>
                    Repeat New Password
                    <Input
                        id={'RepeatNewPassword'}
                        type={'text'}
                        onChange={(e) => setSecondPass(e.currentTarget.value)}
                        value={secondPass}
                        placeholder={'Repeat new password'}/>
                </label>

                <Button type={'submit'}>Create new password</Button>
            </form>
        </div>
    )
}

import React, {FC, FormEvent, useState} from 'react'
import s from './NewPassword.module.css'
import {Button} from '../../components/UI/Button/Button'
import {Input} from '../../components/UI/Input/Input'
import {useHistory, useParams} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {newPassword} from '../../store/reducers/auth-reducer'

//TODO сервер ограничивает максимальное кол-во символов пароля. доделать валидацию кол-ва символов с фронта и (или) ловить ошибку с бэка

export const NewPassword: FC = () => {
    const dispatch = useDispatch()
    const {token} = useParams<{ token: string }>()
    const history = useHistory()

    const [firstPass, setFirstPass] = useState<string>('') // первый инпут
    const [secondPass, setSecondPass] = useState<string>('')// второй инпут

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        const passIdentical = firstPass === secondPass //данные обоих инпутов должны быть равно
        if (!passIdentical) { // если данные разные
            alert('пароли не совпадают')
        } else { // если совпадают
            alert('пароли совпадают')
            dispatch(newPassword(firstPass, token))
        }
        setFirstPass('') // обнуление инпутов
        setSecondPass('')
    }


    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <form className={s.form} onSubmit={onSubmit}>
                    <h1>IT-incubator</h1>
                    <h2>Create new password</h2>

                    <label htmlFor='inputNewPassword'>NewPassword</label>
                    <Input
                        id={'inputNewPassword'}
                        type={'text'}
                        onChange={(e) => setFirstPass(e.currentTarget.value)}
                        value={firstPass}
                        placeholder={'New password'}
                    />

                    <label htmlFor='RepeatNewPassword'>RepeatNewPassword</label>
                    <Input
                        id={'RepeatNewPassword'}
                        type={'text'}
                        onChange={(e) => setSecondPass(e.currentTarget.value)}
                        value={secondPass}
                        placeholder={'Repeat new password'}
                    />

                    <h3>Create new password and will send you further instructions to email</h3>

                    <Button type={'submit'}>Create new password</Button>
                </form>
            </div>
        </div>
    )
}

import React, {FC, FormEvent, useState} from 'react'
import s from './NewPassword.module.css'
import {Button} from '../../components/UI/Button/Button'
import {Input} from '../../components/UI/Input/Input'
import {Redirect, useParams} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {newPassword} from '../../store/reducers/auth-reducer'
import {useTypedSelector} from "../../hooks/hooks";
import {PATH} from "../../routes/routes";

//TODO сервер ограничивает максимальное кол-во символов пароля. доделать валидацию кол-ва символов с фронта и (или) ловить ошибку с бэка

export const NewPassword: FC = () => {
    const dispatch = useDispatch()
    const {token} = useParams<{ token: string }>()
    const successChangePassword = useTypedSelector(state => state.auth.setSuccessNewPass)


    const [firstPass, setFirstPass] = useState<string>('') // первый инпут
    const [secondPass, setSecondPass] = useState<string>('')// второй инпут

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        const passIdentical = firstPass === secondPass //данные обоих инпутов должны быть равно
        if (!passIdentical) { // если данные разные
            alert('пароли не совпадают')
        } else { // если совпадают
            dispatch(newPassword(firstPass, token))
        }
        setFirstPass('') // обнуление инпутов
        setSecondPass('')
    }

    const onChangeInputHandler = (e: any) => setFirstPass(e.currentTarget.value)

    return (
        <div className={s.wrapper}>
            {successChangePassword && <Redirect to={PATH.LOGIN}/>}
            <div className={s.container}>
                <form className={s.form} onSubmit={onSubmit}>
                    <h1>IT-incubator</h1>
                    <h2>Create new password</h2>

                    <label htmlFor='inputNewPassword'>NewPassword</label>
                    <Input
                        id={'inputNewPassword'}
                        type={'password'}
                        onChange={onChangeInputHandler}
                        value={firstPass}
                        placeholder={'New password'}
                    />

                    <label htmlFor='RepeatNewPassword'>RepeatNewPassword</label>
                    <Input
                        id={'RepeatNewPassword'}
                        type={'password'}
                        onChange={onChangeInputHandler}
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

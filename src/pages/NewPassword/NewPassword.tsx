import React, {FC, useState} from 'react'
import s from './NewPassword.module.css'
import {Button} from "../../components/UI/Button/Button";
import {Input} from "../../components/UI/Input/Input";
import {useDispatch} from "react-redux";
import {Redirect, useParams} from "react-router-dom";
import {PATH} from "../../routes/routes";
import {useHistory} from "react-router-dom";


export const NewPassword: FC = () => {
    const [firstPass, setFirstPass] = useState<string>('');
    const [secondPass, setSecondPass] = useState<string>('');

    // const dispatch = useDispatch();
    // const {token} = useParams<{ token: string }>()

    const history = useHistory();


    const onSubmit = () => {
        const passIdentical = firstPass === secondPass;
        if (!passIdentical) {
            alert('пароли не совпадают')
        } else {
            alert('пароли совпадают')
            history.push(PATH.LOGIN)
        }
        setFirstPass('');
        setSecondPass('');
    }

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <form className={s.form} onSubmit={onSubmit}>
                    <h1>IT-incubator</h1>
                    <h2>Create new password</h2>

                    <label htmlFor="inputNewPassword">NewPassword</label>
                    <Input
                        id={'inputNewPassword'}
                        type={'password'}
                        onChange={(e) => setFirstPass(e.currentTarget.value)}
                        value={firstPass}
                        placeholder={'New password'}
                    />

                    <label htmlFor="RepeatNewPassword">RepeatNewPassword</label>
                    <Input
                        id={'RepeatNewPassword'}
                        type={'password'}
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

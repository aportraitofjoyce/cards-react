import React, {FC, useState} from 'react'
import {Button} from '../../components/UI/Button/Button'
import {Input} from '../../components/UI/Input/Input'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {PATH} from '../../routes/routes'
import {passwordRecovery} from '../../store/reducers/auth-reducer'


export const ForgotPassword: FC = () => {
    const [email, setEmail] = useState<string>('')
    const dispatch = useDispatch()
    const history = useHistory()


    const onsubmit = () => {
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) { //валидация email
            alert('письмо отправлено на почту')
            dispatch(passwordRecovery(email))
            history.push(PATH.CHECK_EMAIL)
        } else {
            alert('email is not valid')
        }
        }

    return (
        <div>
            <form onSubmit={onsubmit}>
                <h1>IT-incubator</h1>
                <h2>Forgot your password?</h2>
                <Input type={'email'}
                       placeholder={'enter your email'}
                       value={email}
                       onChange={(e) => setEmail(e.currentTarget.value)}/>
                <span>Enter your address and we will send you further instructions</span>
                <div>
                    <Button>Send instructions</Button>
                </div>
            </form>
        </div>
    )
}
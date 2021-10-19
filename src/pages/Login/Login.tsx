import React, {FC, FormEvent} from 'react'
import {Input} from '../../components/UI/Input/Input'
import {Button} from '../../components/UI/Button/Button'
import {Checkbox} from '../../components/UI/Checkbox/Checkbox'
import {Link, Redirect} from 'react-router-dom'
import {PATH} from '../../routes/routes'
import {useDispatch} from 'react-redux'
import {useInput, useTypedSelector} from '../../hooks/hooks'
import {login} from '../../store/reducers/auth-reducer'

export const Login: FC = () => {
    const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    const email = useInput('', {isEmail: true})
    const password = useInput('', {minLength: 7, maxLength: 25})
    const remember = useInput('', {})

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(login({email: email.value, password: password.value, rememberMe: true}))
    }

    const disabledButton = !email.validation.isValid && !password.validation.isValid

    if (isLoggedIn) return <Redirect to={PATH.PROFILE}/>

    return (
        <div>
            <h1>Sign In</h1>

            <form onSubmit={onSubmit}>
                <label htmlFor='loginEmail'>
                    Email
                    <Input id={'loginEmail'}
                           type={'email'}
                           placeholder={'Enter your email address'}
                           {...email}/>
                </label>

                <label htmlFor='loginPassword'>
                    Password
                    <Input id={'loginPassword'}
                           type={'password'}
                           placeholder={'Enter your password'}
                           {...password}/>
                </label>

                <Link to={PATH.PASSWORD_RECOVERY}><h4>Forgot Password</h4></Link>

                <Checkbox{...remember}>Remember me</Checkbox>

                <Button type={'submit'} disabled={disabledButton}>Login</Button>

                <div>
                    <p>Don’t have an account?</p>
                    <Link to={PATH.REGISTRATION}><h4>Sign Up</h4></Link>
                </div>
            </form>
        </div>
    )
}
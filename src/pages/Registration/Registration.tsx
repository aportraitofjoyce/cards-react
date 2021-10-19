import React, {FC, FormEvent} from 'react'
import {Input} from '../../components/UI/Input/Input'
import {Button} from '../../components/UI/Button/Button'
import {useInput, useTypedSelector} from '../../hooks/hooks'
import {Redirect} from 'react-router-dom'
import {PATH} from '../../routes/routes'
import {useDispatch} from 'react-redux'
import {registration} from '../../store/reducers/auth-reducer'
import {setAppError} from '../../store/reducers/app-reducer'

export const Registration: FC = () => {
    const {registrationSuccess} = useTypedSelector(state => state.auth)
    const dispatch = useDispatch()

    const email = useInput('', {isRequired: true, isEmail: true})
    const password = useInput('', {minLength: 7, maxLength: 25})
    const confirmPassword = useInput('', {minLength: 7, maxLength: 25})

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        password.value === confirmPassword.value
            ? dispatch(registration({email: email.value, password: password.value}))
            : dispatch(setAppError('PASSWORDS!'))
    }

    if (registrationSuccess) return <Redirect to={PATH.LOGIN}/>

    return (
        <div>
            <h1>Registration</h1>

            <form onSubmit={onSubmit}>
                <label htmlFor={'registration-email'}>Email
                    <Input id={'registration-email'}
                           type={'email'}
                           placeholder={'Enter you email address...'}
                           {...email}/>
                </label>

                {(email.touched && email.validation) &&
				<span>{email.validation.isRequired || email.validation.isEmail}</span>}

                <label htmlFor={'registration-password'}>Password
                    <Input id={'registration-password'}
                           type={'text'}
                           placeholder={'Enter your password...'}
                           {...password}/>
                </label>

                {(password.touched && password.validation) &&
				<span>{password.validation.minLength || password.validation.maxLength}</span>}


                <label htmlFor={'registration-confirm-password'}>Confirm Password
                    <Input id={'registration-confirm-password'}
                           type={'text'}
                           placeholder={'Confirm your password...'}
                           {...confirmPassword}/>
                </label>

                {(confirmPassword.touched && confirmPassword.validation) &&
				<span>{confirmPassword.validation.minLength || confirmPassword.validation.maxLength}</span>}

                <Button type={'submit'}
                        disabled={!email.validation.isValid || !password.validation.isValid || !confirmPassword.validation.isValid}>
                    Register
                </Button>
            </form>
        </div>
    )
}
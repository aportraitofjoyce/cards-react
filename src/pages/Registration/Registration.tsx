import React, {FC} from 'react'
import {Input} from '../../components/UI/Input/Input'
import {Button} from '../../components/UI/Button/Button'
import {useInput, useTypedSelector} from '../../hooks/hooks'
import {Redirect} from 'react-router-dom'
import {PATH} from '../../routes/routes'
import {useDispatch} from 'react-redux'
import {registration} from '../../store/reducers/auth-reducer'


export const Registration: FC = () => {
    const {registrationSuccess} = useTypedSelector(state => state.auth)
    const dispatch = useDispatch()

    const email = useInput('', {isRequired: true, isEmail: true})
    const password = useInput('', {minLength: 7, maxLength: 25})
    const confirmPassword = useInput('', {minLength: 7, maxLength: 25})

    const onSubmit = (e: any) => {
        dispatch(registration({email: email.value, password: password.value}))
    }

    return (
        <div>
            {registrationSuccess && <Redirect to={PATH.LOGIN}/>}

            <h1>Registration</h1>

            <form onSubmit={onSubmit} style={{display: 'flex', flexDirection: 'column', gap: 24}}>
                <label htmlFor={'registerEmail'}>Email</label>
                <Input id={'registerEmail'}
                       type={'email'}
                       placeholder={'Enter you email address...'}
                       {...email}/>

                {(email.touched && email.validation) &&
				<span style={{color: 'red'}}>{email.validation.isRequired || email.validation.isEmail}</span>}

                <label htmlFor={'registerPassword'}>Password</label>
                <Input id={'registerPassword'}
                       type={'text'}
                       placeholder={'Enter your password...'}
                       {...password}/>

                {(password.touched && password.validation) &&
				<span style={{color: 'red'}}>{password.validation.minLength || password.validation.maxLength}</span>}


                <label htmlFor={'registerConfirmPassword'}>Confirm Password</label>
                <Input id={'registerConfirmPassword'}
                       type={'text'}
                       placeholder={'Confirm your password...'}
                       {...confirmPassword}/>

                {(confirmPassword.touched && confirmPassword.validation) &&
				<span
					style={{color: 'red'}}>{confirmPassword.validation.minLength || confirmPassword.validation.maxLength}</span>}

                <Button type={'submit'}
                        disabled={!email.validation.isValid || !password.validation.isValid || !confirmPassword.validation.isValid}>
                    Register
                </Button>
            </form>
        </div>
    )
}
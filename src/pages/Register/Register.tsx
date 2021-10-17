import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import {Input} from '../../components/UI/Input/Input'
import {Button} from '../../components/UI/Button/Button'
import {useInput, useTypedSelector} from '../../hooks/hooks'
import {Redirect} from 'react-router-dom'
import {PATH} from '../../routes/routes'
import {register} from '../../store/reducers/register-reducer'
import {useDispatch} from 'react-redux'


export const Register: FC = () => {
    const registerSuccess = useTypedSelector(state => state.register.registerSuccess)
    const dispatch = useDispatch()

    const email = useInput('', {isRequired: true, isEmail: true})
    const password = useInput('', {minLength: 7, maxLength: 25})
    const confirmPassword = useInput('', {minLength: 7, maxLength: 25})

    const onSubmit = () => {
        dispatch(register({email: email.value, password: password.value}))
    }
    console.log(email.validation)

    return (
        <div>
            {registerSuccess && <Redirect to={PATH.LOGIN}/>}

            <h1>Register</h1>

            <form onSubmit={onSubmit} style={{display: 'flex', flexDirection: 'column', gap: 24}}>
                <label htmlFor={'registerEmail'}>Email</label>
                <Input id={'registerEmail'}
                       type={'email'}
                       placeholder={'Enter you email address...'}
                       value={email.value}
                       onBlur={email.onBlur}
                       onChange={email.onChange}/>

                {(email.touched && email.validation) &&
				<span style={{color: 'red'}}>{email.validation.isRequired || email.validation.isEmail}</span>}

                <label htmlFor={'registerPassword'}>Password</label>
                <Input id={'registerPassword'}
                       type={'text'}
                       placeholder={'Enter your password...'}
                       value={password.value}
                       onBlur={password.onBlur}
                       onChange={password.onChange}/>

                {(password.touched && password.validation) &&
				<span style={{color: 'red'}}>{password.validation.minLength || password.validation.maxLength}</span>}


                <label htmlFor={'registerConfirmPassword'}>Confirm Password</label>
                <Input id={'registerConfirmPassword'}
                       type={'text'}
                       placeholder={'Confirm your password...'}
                       value={confirmPassword.value}
                       onBlur={confirmPassword.onBlur}
                       onChange={confirmPassword.onChange}/>

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


type RegisterFormFields<T = string> = {
    email: T
    password: T
    confirmPassword: T
}

export const Register2: FC = () => {
    const registerSuccess = useTypedSelector(state => state.register.registerSuccess)
    const dispatch = useDispatch()

    const [formFields, setFormFields] = useState<RegisterFormFields>({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [formErrors, setFormErrors] = useState<RegisterFormFields>({
        email: 'Field is required',
        password: 'Field is required',
        confirmPassword: 'Field is required'
    })

    const [formTouched, setFormTouched] = useState<RegisterFormFields<boolean>>({
        email: false,
        password: false,
        confirmPassword: false
    })

    const [formValid, setFormValid] = useState<boolean>(false)

    const validateEmail = (email: string) => {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            .test(String(email).toLowerCase())
    }

    const onEmailFieldChangeHandler = (fieldText: string) => {
        setFormFields({...formFields, email: fieldText})

        !validateEmail(fieldText)
            ? setFormErrors({...formErrors, email: 'Wrong email address'})
            : setFormErrors({...formErrors, email: ''})
    }

    const onPasswordFieldChangeHandler = (fieldText: string) => {
        setFormFields({...formFields, password: fieldText})

        fieldText.length < 7 || fieldText.length > 30
            ? setFormErrors({...formErrors, password: 'Must be 7-30 characters'})
            : setFormErrors({...formErrors, password: ''})
    }

    const onPasswordConfirmFieldChangeHandler = (fieldText: string) => {
        setFormFields({...formFields, confirmPassword: fieldText})

        fieldText !== formFields.password
            ? setFormErrors({...formErrors, confirmPassword: 'Passwords must be the same'})
            : setFormErrors({...formErrors, confirmPassword: ''})
    }

    const onBlurHandler = (e: ChangeEvent<HTMLInputElement>) => {
        switch (e.currentTarget.id) {
            case 'registerEmail':
                setFormTouched({...formTouched, email: true})
                break
            case 'registerPassword':
                setFormTouched({...formTouched, password: true})
                break
            case 'registerConfirmPassword':
                setFormTouched({...formTouched, confirmPassword: true})
                break
        }
    }

    const onSubmit = () => {
        dispatch(register({email: formFields.email, password: formFields.password}))
    }

    useEffect(() => {
        (formErrors.email || formErrors.password || formErrors.confirmPassword)
            ? setFormValid(false)
            : setFormValid(true)
    }, [formErrors])

    return (
        <div>
            {registerSuccess && <Redirect to={PATH.LOGIN}/>}

            <h1>Register</h1>

            <form onSubmit={onSubmit} style={{display: 'flex', flexDirection: 'column', gap: 24}}>
                <label htmlFor={'registerEmail'}>Email</label>
                <Input id={'registerEmail'}
                       type={'email'}
                       placeholder={'Enter you email address...'}
                       value={formFields.email}
                       onBlur={e => onBlurHandler(e)}
                       onChangeText={onEmailFieldChangeHandler}/>

                {(formTouched.email && formErrors.email) &&
				<span style={{color: 'red'}}>{formErrors.email}</span>}


                <label htmlFor={'registerPassword'}>Password</label>
                <Input id={'registerPassword'}
                       type={'text'}
                       placeholder={'Enter your password...'}
                       value={formFields.password}
                       onBlur={e => onBlurHandler(e)}
                       onChangeText={onPasswordFieldChangeHandler}/>

                {(formTouched.password && formErrors.password) &&
				<span style={{color: 'red'}}>{formErrors.password}</span>}


                <label htmlFor={'registerConfirmPassword'}>Confirm Password</label>
                <Input id={'registerConfirmPassword'}
                       type={'text'}
                       placeholder={'Confirm your password...'}
                       value={formFields.confirmPassword}
                       onBlur={e => onBlurHandler(e)}
                       onChangeText={onPasswordConfirmFieldChangeHandler}/>

                {(formTouched.confirmPassword && formErrors.confirmPassword) &&
				<span style={{color: 'red'}}>{formErrors.confirmPassword}</span>}

                <Button disabled={!formValid} type={'submit'}>Register</Button>
            </form>
        </div>
    )
}
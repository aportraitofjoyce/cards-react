import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import {Input} from '../../components/UI/Input/Input'
import {Button} from '../../components/UI/Button/Button'
import {useTypedSelector} from '../../hooks/hooks'
import {Redirect} from 'react-router-dom'
import {PATH} from '../../routes/routes'
import {register} from '../../store/reducers/register-reducer'
import {useDispatch} from 'react-redux'

type RegisterFormFields<T = string> = {
    email: T
    password: T
    confirmPassword: T
}

export const Register: FC = () => {
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

        formFields.password !== fieldText
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
                       onBlur={e => onBlurHandler(e)}
                       onChangeText={onPasswordConfirmFieldChangeHandler}/>

                {(formTouched.confirmPassword && formErrors.confirmPassword) &&
				<span style={{color: 'red'}}>{formErrors.confirmPassword}</span>}

                <Button disabled={!formValid} type={'submit'}>Register</Button>
            </form>
        </div>
    )
}
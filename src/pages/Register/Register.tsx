import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import {Input} from '../../components/UI/Input/Input'
import {Button} from '../../components/UI/Button/Button'
import {useTypedSelector} from '../../hooks/hooks'
import {Redirect} from 'react-router-dom'
import {PATH} from '../../routes/routes'
import {register} from '../../store/reducers/register-reducer'
import {useDispatch} from 'react-redux'

type RegisterFormFields = {
    email: string
    password: string
    confirmPassword: string
}

type RegisterFormFieldsTouched = {
    email: boolean
    password: boolean
    confirmPassword: boolean
}

export const Register: FC = () => {
    const registerSuccess = useTypedSelector(state => state.register.registerSuccess)
    const dispatch = useDispatch()

    const [formFields, setFormFields] = useState<RegisterFormFields>({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [formTouched, setFormTouched] = useState<RegisterFormFieldsTouched>({
        email: false,
        password: false,
        confirmPassword: false
    })

    const [formErrors, setFormErrors] = useState<RegisterFormFields>({
        email: 'Field is required',
        password: 'Field is required',
        confirmPassword: 'Field is required'
    })

    const [formValid, setFormValid] = useState<boolean>(false)

    const validateEmail = (email: string) => {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            .test(String(email).toLowerCase())
    }

    const onEmailFieldChangeHandler = (text: string) => {
        setFormFields({...formFields, email: text})

        !validateEmail(text)
            ? setFormErrors({...formErrors, email: 'Wrong email address'})
            : setFormErrors({...formErrors, email: ''})
    }

    const onPasswordFieldChangeHandler = (text: string) => {
        setFormFields({...formFields, password: text})

        text.length < 7 || text.length > 30
            ? setFormErrors({...formErrors, password: 'Must be 7-30 characters'})
            : setFormErrors({...formErrors, password: ''})

        text.length === 0 &&
        setFormErrors({...formErrors, password: 'Field is required'})
    }

    const onPasswordConfirmFieldChangeHandler = (text: string) => {
        setFormFields({...formFields, confirmPassword: text})

        text.length < 7 || text.length > 30
            ? setFormErrors({...formErrors, confirmPassword: 'Must be 7-30 characters'})
            : setFormErrors({...formErrors, confirmPassword: ''})

        text.length === 0 &&
        setFormErrors({...formErrors, confirmPassword: 'Field is required'})
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

    console.log(formErrors.email || formErrors.password || formErrors.confirmPassword)
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
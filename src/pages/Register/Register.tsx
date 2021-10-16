import React, {FC, useState} from 'react'
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

export const Register: FC = () => {
    const registerSuccess = useTypedSelector(state => state.register.registerSuccess)
    const dispatch = useDispatch()

    const [formData, setFormData] = useState<RegisterFormFields>({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [formErrors, setFormErrors] = useState<RegisterFormFields>({
        email: '',
        password: '',
        confirmPassword: ''
    })
    console.log(formErrors)

    const validation = () => {
        !formData.email ? setFormErrors({...formErrors, email: 'Field is required'}) : setFormErrors({
            ...formErrors,
            email: ''
        })

        !formData.password ? setFormErrors({
            ...formErrors,
            password: 'Password is required'
        }) : setFormErrors({...formErrors, password: ''})

        !formData.confirmPassword ? setFormErrors({
            ...formErrors,
            confirmPassword: 'Password is required'
        }) : setFormErrors({...formErrors, confirmPassword: ''})


        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
            setFormErrors({...formErrors, email: 'Invalid email address'})
        } else {
            setFormErrors({...formErrors, email: ''})
        }

        formData.password.length < 7 || formData.password.length > 30
            ? setFormErrors({...formErrors, password: 'Must be 7-30 characters'})
            : setFormErrors({...formErrors, password: ''})

        formData.confirmPassword.length < 7 || formData.confirmPassword.length > 30
            ? setFormErrors({...formErrors, confirmPassword: 'Must be 7-30 characters'})
            : setFormErrors({...formErrors, confirmPassword: ''})

        formData.password !== formData.confirmPassword
            ? setFormErrors({
                ...formErrors,
                password: 'Passwords are not the same',
                confirmPassword: 'Passwords are not the same'
            })
            : setFormErrors({...formErrors, password: '', confirmPassword: ''})
    }

    const emailFieldHandler = (text: string) => {
        setFormData({...formData, email: text})
        validation()
    }

    const passwordFieldHandler = (text: string) => {
        setFormData({...formData, password: text})
        validation()
    }

    const passwordConfirmFieldHandler = (text: string) => {
        setFormData({...formData, confirmPassword: text})
        validation()
    }

    const onSubmit = () => {
        dispatch(register({email: formData.email, password: formData.password}))
    }

    return (
        <div>
            {registerSuccess && <Redirect to={PATH.LOGIN}/>}

            <h1>Register</h1>

            <form onSubmit={onSubmit} style={{display: 'flex', flexDirection: 'column', gap: 24}}>
                <label htmlFor={'registerEmail'}>Email</label>
                <Input id={'registerEmail'}
                       type={'email'}
                       placeholder={'Enter you email address...'}
                       value={formData.email}
                       onChangeText={emailFieldHandler}/>
                {formErrors.email && <span style={{color: 'red'}}>{formErrors.email}</span>}

                <label htmlFor={'registerPassword'}>Password</label>
                <Input id={'registerPassword'}
                       type={'text'}
                       placeholder={'Enter your password...'}
                       value={formData.password}
                       onChangeText={passwordFieldHandler}/>

                {formErrors.password && <span style={{color: 'red'}}>{formErrors.password}</span>}

                <label htmlFor={'registerConfirmPassword'}>Confirm Password</label>
                <Input id={'registerConfirmPassword'}
                       type={'text'}
                       placeholder={'Confirm your password...'}
                       onChangeText={passwordConfirmFieldHandler}/>

                {formErrors.confirmPassword && <span style={{color: 'red'}}>{formErrors.confirmPassword}</span>}

                <div style={{display: 'flex', gap: 24}}>
                    <Button>Cancel</Button>
                    <Button type={'submit'}>Register</Button>
                </div>
            </form>
        </div>
    )
}
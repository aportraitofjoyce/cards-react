import React, {FC, FormEvent, useState} from 'react'
import {Input} from '../../components/UI/Input/Input'
import {Button} from '../../components/UI/Button/Button'
import {useTypedSelector} from '../../hooks/hooks'
import {Link, Redirect} from 'react-router-dom'
import {PATH} from '../../routes/routes'
import {useDispatch} from 'react-redux'
import {registration} from '../../store/reducers/auth-reducer'
import {setAppError} from '../../store/reducers/app-reducer'

export const Registration: FC = () => {
    const {registrationSuccess} = useTypedSelector(state => state.auth)
    const dispatch = useDispatch()

    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        values.password === values.confirmPassword
            ? dispatch(registration({email: values.email, password: values.password}))
            : dispatch(setAppError('CHECK YOUR PASSWORDS!'))
    }

    if (registrationSuccess) return <Redirect to={PATH.LOGIN}/>

    return (
        <div>
            <h1>Registration</h1>

            <form onSubmit={onSubmit}>
                <label htmlFor={'registration-email'}>
                    Email
                    <Input id={'registration-email'}
                           type={'email'}
                           placeholder={'Enter you email address...'}
                           value={values.email}
                           onChange={e => setValues({...values, email: e.currentTarget.value})}/>
                </label>

                <label htmlFor={'registration-password'}>
                    Password
                    <Input id={'registration-password'}
                           type={'password'}
                           placeholder={'Enter your password...'}
                           value={values.password}
                           onChange={e => setValues({...values, password: e.currentTarget.value})}/>
                </label>

                <label htmlFor={'registration-confirm-password'}>
                    Confirm Password
                    <Input id={'registration-confirm-password'}
                           type={'password'}
                           placeholder={'Confirm your password...'}
                           value={values.confirmPassword}
                           onChange={e => setValues({...values, confirmPassword: e.currentTarget.value})}/>
                </label>

                <Button type={'submit'}>
                    Register
                </Button>

                <p>Already have an account?</p>
                <Link to={PATH.LOGIN}><h4>Sign In</h4></Link>
            </form>
        </div>
    )
}
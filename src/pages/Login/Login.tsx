import React, {FC, FormEvent, useEffect, useState} from 'react'
import {Input} from "../../components/UI/Input/Input";
import {Button} from "../../components/UI/Button/Button";
import {Checkbox} from "../../components/UI/Checkbox/Checkbox";
import {NavLink, useHistory} from "react-router-dom";
import {PATH} from '../../routes/routes';
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../hooks/hooks";
import {login} from '../../store/reducers/auth-reducer'

export const Login: FC = () => {

    const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn)

    // Custom Hooks
    const useValidation = (value: string, validations: ValidationsType) => {
        const [isValid, setIsValid] = useState<boolean>(false)

        const [requireValid, setRequiredValid] = useState<string>('')
        const [emailValid, setEmailValid] = useState<string>('')
        const [minLength, setMinLength] = useState<string>('')
        const [maxLength, setMaxLength] = useState<string>('')

        useEffect(() => {
            for (const validation in validations) {
                switch (validation) {
                    case 'requireValid':
                        !value ? setRequiredValid('Field is required') : setRequiredValid('')
                        break;
                    case 'minLength':
                        value.length < validations[validation]!
                            ? setMinLength(`Min length must be more than ${validations[validation]!}`)
                            : setMinLength('')
                        break;
                    case 'maxLength':
                        value.length > validations[validation]!
                            ? setMaxLength(`Max length must be less than ${validations[validation]!}`)
                            : setMaxLength('')
                        break;
                    case 'emailValid':
                        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,4}$/i.test(String(value).toLowerCase())
                            ? setEmailValid('')
                            : setEmailValid('Wrong email address')
                        break;
                }
            }
        }, [value])

        useEffect(() => {
            (requireValid || emailValid || minLength || maxLength) ? setIsValid(false) : setIsValid(true)
        }, [validations])

        return {
            isValid,
            emailValid,
            requireValid,
            minLength,
            maxLength,
        }
    }

    type ValidationsType = {
        requireValid?: boolean,
        emailValid?: boolean,
        maxLength?: number,
        minLength?: number,
    }



    const useInput = (initialValue: string, validation: ValidationsType) => {

        const [value, setValue] = useState<string>(initialValue)
        // const [touched, setTouched] = useState<boolean>(false)
        const [touched, setTouched] = useState<any>('notTouched')
        const [checked, setChecked] = useState<boolean>(false)
        const isValidation = useValidation(value, validation)

        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.currentTarget.value)
            setChecked(e.currentTarget.checked)
        }

        const onBlur = () => {
            setTouched('isTouched')
        }

        return {
            value,
            touched,
            checked,
            onChange,
            onBlur,
            isValidation,
        }
    }


    const email = useInput('', {requireValid: true, emailValid: true})
    const password = useInput('', {requireValid: true, maxLength: 25, minLength: 7})
    const remember = useInput('', {})

    const dispatch = useDispatch()
    const history = useHistory();


    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(login({email: email.value, password: password.value, rememberMe: remember.checked}))
        //return isLoggedIn ? history.push(PATH.PROFILE) : history.push(PATH.REGISTRATION)
    }

    const disabledButton = () => {
        return !(email.isValidation.isValid && password.isValidation.isValid);
    }

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={onSubmit}>

                <label htmlFor="loginEmail">Email</label>
                <Input
                    id={'loginEmail'}
                    type={"email"}
                    placeholder={'Enter your email address'}
                    {...email}
                />

                {(email.touched === 'isTouched' && email.isValidation) &&
                <div style={{color: 'red'}}>
                    {
                        email.isValidation.requireValid
                        || email.isValidation.emailValid}
                </div>
                }

                <label htmlFor="loginPassword">Password</label>
                <Input
                    id={'loginPassword'}
                    type={"password"}
                    placeholder={'Enter your password'}
                    {...password}
                />

                {(password.touched === 'isTouched' && password.isValidation) &&
                <div style={{color: 'red'}}>
                    {
                        password.isValidation.requireValid
                        || password.isValidation.maxLength
                        || password.isValidation.minLength
                    }
                </div>
                }
                <NavLink to={PATH.PASSWORD_RECOVERY}>
                    <h4>Forgot Password</h4>
                </NavLink>
                <Checkbox
                    {...remember}
                >Remember me</Checkbox>
                <Button type={"submit"} disabled={disabledButton()}>Login</Button>
                <div>
                    <p>Don’t have an account?</p>
                    <NavLink to={PATH.REGISTRATION}>
                        <h4>Sign Up</h4>
                    </NavLink>
                </div>
            </form>
        </div>
    )
}
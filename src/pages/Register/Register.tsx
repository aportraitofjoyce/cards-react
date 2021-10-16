import React, {FC, useState} from 'react'
import {Input} from '../../components/UI/Input/Input'
import {Button} from '../../components/UI/Button/Button'
import {useTypedSelector} from '../../hooks/hooks'
import {Redirect} from 'react-router-dom'
import {PATH} from '../../routes/routes'
import {register} from '../../store/reducers/register-reducer'
import {useDispatch} from 'react-redux'

export const Register: FC = () => {
    const registerSuccess = useTypedSelector(state => state.register.registerSuccess)
    const dispatch = useDispatch()

    const [registerData, setRegisterData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const onSubmit = async () => {
        dispatch(register({email: registerData.email, password: registerData.password}))
    }

    return (
        <div>
            {registerSuccess && <Redirect to={PATH.LOGIN}/>}

            <h1>Register</h1>
            <form onSubmit={onSubmit} style={{display: 'flex', flexDirection: 'column', gap: 24}}>
                <label htmlFor={'registerEmail'}>Email</label>
                <Input id={'registerEmail'}
                       type={'email'}
                       value={registerData.email}
                       onChangeText={(text: string) => setRegisterData({...registerData, email: text})}/>

                <label htmlFor={'registerPassword'}>Password</label>
                <Input id={'registerPassword'}
                       type={'password'}
                       value={registerData.password}
                       onChangeText={(text: string) => setRegisterData({...registerData, password: text})}/>

                <label htmlFor={'registerConfirmPassword'}>Confirm Password</label>
                <Input id={'registerConfirmPassword'} type={'password'}/>

                <div style={{display: 'flex', gap: 24}}>
                    <Button>Cancel</Button>
                    <Button type={'submit'}>Register</Button>
                </div>
            </form>
        </div>
    )
}
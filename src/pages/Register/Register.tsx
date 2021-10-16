import React, {FC} from 'react'
import {Input} from '../../components/UI/Input/Input'
import {Button} from '../../components/UI/Button/Button'

export const Register: FC = () => {
    const onSubmit = () => {
        alert('Register')
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor={'registerEmail'}>Email</label>
                <Input id={'registerEmail'} type={'email'}/>

                <label htmlFor={'registerPassword'}>Password</label>
                <Input id={'registerPassword'} type={'password'}/>

                <label htmlFor={'registerConfirmPassword'}>Password</label>
                <Input id={'registerConfirmPassword'} type={'password'}/>

                <Button>Cancel</Button>
                <Button type={'submit'}>Register</Button>
            </form>
        </div>
    )
}
import React, {FC} from 'react'
import {Button} from "../../components/UI/Button/Button";
import {Input} from "../../components/UI/Input/Input";

export const PasswordRecovery: FC = () => {
    const onsubmit = () => {
        alert('Send instructions')
    }

    return (
        <div>
            <form onSubmit={onsubmit}>
                <h1>IT-incubator</h1>
                <h2>Forgot your password?</h2>
                <Input type={'email'} placeholder={'enter your email'}/>
                <span>Enter your address and we will send you further instructions</span>
                <div>
                    <Button>Send instructions</Button>
                </div>
            </form>
        </div>
    )
}
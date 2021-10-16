import React, {FC} from 'react'
import {Input} from "../../components/UI/Input/Input";
import {Button} from "../../components/UI/Button/Button";
import {Checkbox} from "../../components/UI/Checkbox/Checkbox";
import {NavLink} from "react-router-dom";
import {PATH} from '../../routes/routes';


export const Login: FC = () => {
    const onSubmit = () => {
        alert('Login')
    }

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="loginEmail">Email</label>
                <Input id={'loginEmail'} type={"email"}/>

                <label htmlFor="loginPassword">Password</label>
                <Input id={'loginPassword'} type={"password"}/>

                <NavLink to={PATH.PASSWORD_RECOVERY}>
                    <p>Forgot Password</p>
                </NavLink>

                <Checkbox>Remember me</Checkbox>

                <Button type={"submit"}>Login</Button>

                <div>
                    <p>Don’t have an account?</p>
                    <NavLink to={PATH.REGISTER}>
                        <p>Sign Up</p>
                    </NavLink>
                </div>
            </form>
        </div>
    )
}
import React, {FC} from 'react'
import {Input} from "../../components/UI/Input/Input";
import {Button} from "../../components/UI/Button/Button";
import {Checkbox} from "../../components/UI/Checkbox/Checkbox";

export const Login: FC = () => {
    return (
        <div>
            <h1>Sign In</h1>
            <form action="">
                <label htmlFor="loginEmail">Email</label>
                <Input id={'loginEmail'} type={"email"}/>

                <label htmlFor="loginPassword">Password</label>
                <Input id={'loginPassword'} type={"password"}/>

                <div>
                    <p>Forgot Password</p>
                </div>

                <Checkbox>Remember me</Checkbox>
                <Button type={"submit"} title={'Login'}/>
                <div>
                    <a>Don’t have an account?</a>
                </div>
                <div>
                    <a>Sign Up</a>
                </div>

            </form>

        </div>
    )
}
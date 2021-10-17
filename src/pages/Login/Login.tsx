import React, {FC, useState} from 'react'
import {Input} from "../../components/UI/Input/Input";
import {Button} from "../../components/UI/Button/Button";
import {Checkbox} from "../../components/UI/Checkbox/Checkbox";
import {NavLink, useHistory} from "react-router-dom";
import {PATH} from '../../routes/routes';
import {useDispatch} from "react-redux";
import {userPostLogin} from "../../store/reducers/login-reducer";
import {useTypedSelector} from "../../hooks/hooks";

export const Login: FC = () => {

    const data = useTypedSelector(state => state.login)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState<boolean>(false)
    const dispatch = useDispatch()
    const history = useHistory();


    const onSubmit = () => {
            dispatch(userPostLogin(email, password, remember))
            setEmail('')
            setPassword('')
            history.push(PATH.PROFILE)
        console.log(data)
    }

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={onSubmit}>
                <h1>{data.name}</h1>
                <label htmlFor="loginEmail">Email</label>
                <Input
                    id={'loginEmail'}
                    type={"email"}
                    placeholder={'Enter your email address'}
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                />
                <label htmlFor="loginPassword">Password</label>
                <Input
                    id={'loginPassword'}
                    type={"password"}
                    placeholder={'Enter your password'}
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />
                <NavLink to={PATH.PASSWORD_RECOVERY}>
                    <h4>Forgot Password</h4>
                </NavLink>
                <Checkbox
                    // value={remember}
                    checked={remember}
                    onChange={(e) => setRemember(e.currentTarget.checked)}
                >Remember me</Checkbox>
                <Button type={"submit"}>Login</Button>
                <div>
                    <p>Don’t have an account?</p>
                    <NavLink to={PATH.REGISTER}>
                        <h4>Sign Up</h4>
                    </NavLink>
                </div>
            </form>
        </div>
    )
}
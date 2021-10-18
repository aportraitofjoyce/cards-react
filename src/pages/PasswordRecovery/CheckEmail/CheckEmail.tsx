import React from "react";
import s from './CheckEmail.module.css'
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {PATH} from "../../../routes/routes";
import {useHistory} from "react-router-dom";


export const CheckEmail = () => {
    const email = useSelector<RootState, string>(state => state.password.email)
    const history = useHistory();

    setTimeout(() => {
        return history.push(PATH.LOGIN)
    }, 3000)

    return (
        <div className={s.checkEmail}>
            <div className={s.container}>
                <h1>IT-incubator</h1>
                <div className={s.icon}><img src="https://su-19.ru/wp-content/uploads/2020/12/mail_ico.png"
                                             alt="iconMail"/></div>

                <h3>We've sent an Email with instructions to {email}</h3>
            </div>
        </div>
    )
}
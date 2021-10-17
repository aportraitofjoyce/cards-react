import React from "react";
import s from './CheckEmail.module.css'
import {useSelector} from "react-redux";
import {RootStateType} from "../../../store/store";


export const CheckEmail = () => {
    const email = useSelector<RootStateType, string>(state => state.password.email)


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
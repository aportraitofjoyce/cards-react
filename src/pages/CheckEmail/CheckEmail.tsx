import React from "react";
import s from './CheckEmail.module.css'


export const CheckEmail = () => {
    return (
        <div className={s.checkEmail}>
           <div className={s.container}>
               <h1>IT-incubator</h1>
               <div className={s.icon}>IMAGE</div>
               <h2>Check Email</h2>
               <h3>We've sent an Email with instructions to example@mail.com</h3>
           </div>
        </div>
    )
}
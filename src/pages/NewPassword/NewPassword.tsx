import React, {FC} from 'react'
import s from './NewPassword.module.css'
import {Button} from "../../components/UI/Button/Button";
import {Input} from "../../components/UI/Input/Input";

export const NewPassword: FC = () => {
    const onSubmit = () => {
        alert('Create new password')
    }

    return (
        <div className={s.newPassword}>
           <div className={s.container}>
               <form className={s.form} onSubmit={onSubmit}>
                   <h1>IT-incubator</h1>
                   <h2>Create new password</h2>

                   <label htmlFor="inputNewPassword">inputNewPassword</label>
                   <Input id={'inputNewPassword'} type={'text'} />


                   <h3>Create new password and will send you further instructions to email</h3>

                   <Button type={'submit'}>Create new password</Button>
               </form>
           </div>
        </div>
    )
}
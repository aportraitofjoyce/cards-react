import React, {ButtonHTMLAttributes, DetailedHTMLProps, FC} from 'react'
import s from './Button.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonProps = DefaultButtonPropsType & {
    secondary?: boolean
    grouped?: boolean
}

export const Button: FC<ButtonProps> = props => {
    const {secondary, className, grouped, ...restProps} = props
    const classNames = `${secondary ? s.secondary : ''}${grouped ? s.grouped : ''}${className ? className : ''}`

    return <button className={classNames} {...restProps}/>
}
import React, {ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes, KeyboardEvent} from 'react'
import s from './Input.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputTextProps = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
}

export const Input: FC<InputTextProps> = props => {
    const {
        type,
        onChange,
        onChangeText,
        onKeyPress,
        onEnter,
        error,
        className,
        spanClassName,
        ...restProps
    } = props

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeText && onChangeText(e.currentTarget.value)
    }

    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e)
        onEnter && e.key === 'Enter' && onEnter()
    }

    const inputClassNames = `${error ? s.errorInput : ''}${className ? className : ''}`
    const spanClassNames = `${s.error}${spanClassName ? spanClassName : ''}`


    return (
        <div className={s.container}>
            <input type={'text'}
                   onChange={onChangeCallback}
                   onKeyPress={onKeyPressCallback}
                   className={inputClassNames}
                   placeholder={'Введите текст...'}
                   {...restProps}/>
            {error && <span className={spanClassNames}>{error}</span>}
        </div>
    )
}
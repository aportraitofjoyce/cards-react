import React, {FC} from 'react'
import {Button} from '../UI/Button/Button'
import {Input} from '../UI/Input/Input'
import {Checkbox} from '../UI/Checkbox/Checkbox'

export const UiKit: FC = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24}}>
            <Button>Button</Button>
            <Input/>
            <Checkbox>Check Me</Checkbox>
        </div>
    )
}
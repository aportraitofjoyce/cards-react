import {useState} from 'react'
import {Button} from '../Button/Button'
import s from './ScrollButton.module.css'


export const ScrollButton = () => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop
        if (scrolled > 300) {
            setVisible(true)
        } else if (scrolled <= 300) {
            setVisible(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    window.addEventListener('scroll', toggleVisible)

    return (
        <>
            {visible ? <Button className={s.scrollButton} onClick={scrollToTop}>on top</Button> : null}
        </>

    )
}

import React from 'react'
import s from './Navbar.module.scss'
import logo from '../../assets/images/logo.svg'

type PropsType = {

}

export const Navbar: React.FC<PropsType> = React.memo((props) => {

    const { } = props

    return (
        <div className={s.navbar}>
            <img className={s.navbar__logo} src={logo} alt="" />
            <div className={s.navbar__header}>MERN CLOUD</div>
            <div className={s.navbar__login}>Войти</div>
            <div className={s.navbar__registration}>Регистрация</div>
        </div>
    )
})

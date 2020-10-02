import React from 'react'
import s from './Navbar.module.scss'
import logo from '../../assets/images/logo.svg'
import { NavLink } from 'react-router-dom'

type PropsType = {

}

export const Navbar: React.FC<PropsType> = React.memo((props) => {

    const { } = props

    return (
        <div className={s.navbar}>
            <img className={s.navbar__logo} src={logo} alt="" />
            <div className={s.navbar__header}>MERN CLOUD</div>
            <div className={s.navbar__login}><NavLink to={'/login'}>Войти</NavLink></div>
            <div className={s.navbar__registration}><NavLink to={'/registration'}>Регистрация</NavLink></div>
        </div>
    )
})

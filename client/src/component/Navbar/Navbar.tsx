import React from 'react'
import s from './Navbar.module.scss'
import logo from '../../assets/images/logo.svg'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../redux/store'
import { loginOutAPI } from '../../api/users-api'

type PropsType = {

}

export const Navbar: React.FC<PropsType> = React.memo((props) => {

    const { } = props
    const dispatch = useDispatch()
    const isAuth = useSelector((state: AppStateType) => state.userReducer.isAuth)

    return (
        <div className={s.navbar}>
            <img className={s.navbar__logo} src={logo} alt="" />
            <div className={s.navbar__header}>MERN CLOUD</div>
            {!isAuth && <div className={s.navbar__login}><NavLink to={'/login'}>Войти</NavLink></div>}
            {!isAuth && <div className={s.navbar__registration}><NavLink to={'/registration'}>Регистрация</NavLink></div>}
            {isAuth && <div className={s.navbar__login} onClick={() => dispatch(loginOutAPI())}>Выйти</div>}
        </div>
    )
})

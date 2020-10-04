import React, { useState } from 'react'
import s from './Popup.module.scss'

export const Popup = () => {

    const [dir, setDir] = useState('')

    return (
        <div className={s.popup}>
            <div className={s.popup__content}>
                <div className={s.popup__header}>
                    <div className={s.popup__title}>Создать новую папку</div>
                    <button className={s.popup__close}>X</button>
                </div>
                <input className={s.popup__input} type="text" name="" placeholder="Введите название папки" value={dir} onChange={(e) => setDir(e.currentTarget.value)} />
                <button className={s.popup__btnCreate}>Создать</button>
            </div>
        </div>
    )
}

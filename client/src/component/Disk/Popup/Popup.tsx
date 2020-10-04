import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDir } from '../../../api/file-api'
import { actionsFileReducer } from '../../../redux/reducers/file-reducer'
import { AppStateType } from '../../../redux/store'
import s from './Popup.module.scss'

export const Popup = () => {

    const [dir, setDir] = useState('')
    const isPopup = useSelector((state: AppStateType) => state.fileReducer.isPopup)
    const dispatch = useDispatch()
    const currentDir = useSelector((state: AppStateType) => state.fileReducer.currentDir)
    const onClickHandler = () => {
        dispatch(createDir(currentDir, dir))
        dispatch(actionsFileReducer.setPopup(false))
        setDir("")
    }
    return (
        <div className={s.popup} style={{ display: isPopup ? 'flex' : 'none' }} onClick={() => dispatch(actionsFileReducer.setPopup(false))}>
            <div className={s.popup__content} onClick={(e) => e.stopPropagation()}>
                <div className={s.popup__header}>
                    <div className={s.popup__title}>Создать новую папку</div>
                    <button className={s.popup__close} onClick={() => dispatch(actionsFileReducer.setPopup(false))}>X</button>
                </div>
                <input className={s.popup__input} type="text" name="" placeholder="Введите название папки" value={dir} onChange={(e) => setDir(e.currentTarget.value)} />
                <button className={s.popup__btnCreate} onClick={onClickHandler}>Создать</button>
            </div>
        </div>
    )
}

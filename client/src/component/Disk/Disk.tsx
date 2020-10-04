import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../redux/store'
import s from './Disk.module.scss'
import { createDir, getFiles } from '../../api/file-api'
import { FileList } from './FileList/FileList'
import { Popup } from './Popup/Popup'
import { actionsFileReducer } from '../../redux/reducers/file-reducer'
export const Disk = () => {

    const dispatch = useDispatch()
    const currentDir = useSelector((state: AppStateType) => state.fileReducer.currentDir)

    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir, dispatch])

    const createHandler = () => {
        dispatch(actionsFileReducer.setPopup(true))
    }

    const backClickHandler = () => {
        
    }
    return (
        <div className={s.disk}>
            <div className={s.disk__btns}>
                <button
                    className={s.disk__back}
                    onClick={() => backClickHandler()}
                    >Назад</button>
                <button
                    className={s.disk__create}
                    onClick={() => createHandler()}
                >Создать папку</button>
            </div >
            <FileList />
            <Popup />
        </div >
    )
}

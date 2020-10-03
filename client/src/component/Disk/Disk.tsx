import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../redux/store'
import s from './Disk.module.scss'
import { getFiles } from '../../api/file-api'
import { FileList } from './FileList/FileList'
export const Disk = () => {

    const dispatch = useDispatch()
    const currentDir = useSelector((state: AppStateType) => state.fileReducer.currentDir)

    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir, dispatch])

    return (
        <div className={s.disk}>
            <div className={s.disk__btns}>
                <button
                    className={s.disk__back}>Назад</button>
                <button
                    className={s.disk__create}>Создать папку</button>
            </div >
            <FileList />
        </div >
    )
}

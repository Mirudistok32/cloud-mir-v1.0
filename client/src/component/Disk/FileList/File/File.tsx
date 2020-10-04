import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionsFileReducer, FileType } from '../../../../redux/reducers/file-reducer'
import { AppStateType } from '../../../../redux/store'
import s from './File.module.scss'

type PropsType = {
    file: FileType
}


export const File: React.FC<PropsType> = (props) => {

    const dispatch = useDispatch()
    const currentDir = useSelector((state: AppStateType) => state.fileReducer.currentDir)

    const openDirHandler = () => {
        dispatch(actionsFileReducer.pushToStack(currentDir))
        dispatch(actionsFileReducer.setCurrentDir(props.file._id))
    }

    return (
        <div className={s.file} onClick={props.file.type === 'dir' ? () => openDirHandler() : () => { }}>
            <div className={s.file__img} ></div>
            <div className={s.file__name} >{props.file.name}</div>
            <div className={s.file__date} >{props.file.date.slice(0, 10)}</div>
            <div className={s.file__size} >{props.file.size}</div>
        </div>
    )
}

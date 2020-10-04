import React from 'react'
import { useDispatch } from 'react-redux'
import { actionsFileReducer, FileType } from '../../../../redux/reducers/file-reducer'
import s from './File.module.scss'

type PropsType = {
    file: FileType
}


export const File: React.FC<PropsType> = (props) => {

    const dispatch = useDispatch()

    const openDirHandler = () => {
        console.log(1);
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

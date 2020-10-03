import React from 'react'
import { FileType } from '../../../../redux/reducers/file-reducer'
import s from './File.module.scss'

type PropsType = {
    file: FileType
}


export const File: React.FC<PropsType> = (props) => {


    return (
        <div className={s.file}>
            <div className={s.file__img} ></div>
            <div className={s.file__name} >{props.file.name}</div>
            <div className={s.file__date} >{props.file.date.slice(0, 10)}</div>
            <div className={s.file__size} >{props.file.size}</div>
        </div>
    )
}

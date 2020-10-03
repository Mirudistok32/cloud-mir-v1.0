import React from 'react'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../../redux/store'
import s from './FileList.module.scss'
import { File } from './File/File'
import { FileType } from '../../../redux/reducers/file-reducer'


export const FileList = () => {

    const files = useSelector((state: AppStateType) => state.fileReducer.files)?.map((file: FileType, ind) => <File key={ind} file={file} />)

    return (
        <div className={s.fileList} >
            <div className={s.fileList__header}>
                <div className={s.fileList__name}>Название</div>
                <div className={s.fileList__date}>Дата</div>
                <div className={s.fileList__size}>Размер</div>
            </div>
            {
                files
            }
        </div>
    )
}

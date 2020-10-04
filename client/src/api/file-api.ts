import { actionsFileReducer } from './../redux/reducers/file-reducer';
import { AppStateType } from './../redux/store';
import axios from 'axios'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk';

export const getFiles = (dirId: any): ThunkAction<Promise<void>, AppStateType, unknown, Action> => {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5007/api/files${dirId ? '?parent=' + dirId : ''}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            dispatch(actionsFileReducer.setFiles(response.data))
            console.log(response.data)
        } catch (error) {
            alert(error.response.data.message)
        }
    }
}
export const createDir = (dirId: any, name: string): ThunkAction<Promise<void>, AppStateType, unknown, Action> => {
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:5007/api/files`,
                {
                    name,
                    parent: dirId,
                    type: 'dir'
                },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                }
            )
            dispatch(actionsFileReducer.addFile(response.data))
            console.log(response.data)
        } catch (error) {
            alert(error.response.data.message)
        }
    }
}

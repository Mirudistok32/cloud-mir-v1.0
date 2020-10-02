import { actionsUserReducer } from './../redux/reducers/user-reducer';
import { AppStateType } from './../redux/store';
import axios from 'axios'
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux';


export const registrationAPI = async (email: string, password: string) => {
    try {
        const response = await axios.post(`http://localhost:5007/api/auth/registration`, {
            email,
            password
        })
        alert(response.data.message)
    } catch (error) {
        alert(error)
    }
}
export const loginAPI = (email: string, password: string): ThunkAction<Promise<void>, AppStateType, unknown, Action> => {
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:5007/api/auth/login`, {
                email,
                password
            })

            dispatch(actionsUserReducer.setUser(response.data.user))
            // Сохранаем token в localStorage
            localStorage.setItem('token', response.data.token)
        } catch (error) {
            alert(error)
        }
    }
}
export const loginOutAPI = (): ThunkAction<Promise<void>, AppStateType, unknown, Action> => {
    return async dispatch => {
        try {
            // const response = await axios.post(`http://localhost:5007/api/auth/login`)
            dispatch(actionsUserReducer.loginOut())

        } catch (error) {
            alert(error)
        }
    }
}
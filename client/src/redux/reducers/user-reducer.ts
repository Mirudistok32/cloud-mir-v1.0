import { InferActionsTypes } from './../store';

export type CurrentUserType = {
    id: string | null
    email: string | null
    diskSpace: number | null
    usedSpace: number | null
    avatar?: string | null
}
type InitialStateType = {
    currentUser: null | CurrentUserType,
    isAuth: boolean
}

const initialState: InitialStateType = {
    currentUser: null as CurrentUserType | null,
    isAuth: false
}

type ActionsTypes = InferActionsTypes<typeof actionsUserReducer>

export const userReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "MIRUDISTOK/USER/SET_USERS": {
            return { ...state, ...action.payload }
        }
        case "MIRUDISTOK/USER/LOGIN_OUT": {
            localStorage.removeItem('token')
            return { ...state, ...action.payload }
        }
        default:
            return state
    }
}


export const actionsUserReducer = {
    setUser: (currentUser: CurrentUserType) => ({ type: "MIRUDISTOK/USER/SET_USERS", payload: { currentUser, isAuth: true } } as const),
    loginOut: () => ({ type: "MIRUDISTOK/USER/LOGIN_OUT", payload: { currentUser: null, isAuth: false, } } as const),
}
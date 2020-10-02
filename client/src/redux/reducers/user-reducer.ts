import { InferActionsTypes } from './../store';

export type CurrentUserType = {
    id: string | null
    email: string | null
    diskSpace: number | null
    usedSpace: number | null
    avatar?: string | null
}
type InitialStateType = {
    currentUser: CurrentUserType,
    isAuth: boolean
}

const initialState: InitialStateType = {
    currentUser: {
        avatar: null as string | null,
        id: null as string | null,
        email: null as string | null,
        diskSpace: null as number | null,
        usedSpace: null as number | null
    },
    isAuth: false
}

type ActionsTypes = InferActionsTypes<typeof actionsUserReducer>

export const userReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "MIRUDISTOK/USER/SET_USERS": {
            return { ...state, currentUser: { ...action.payload } }
        }
        default:
            return state
    }
}


export const actionsUserReducer = {
    setUser: (user: CurrentUserType) => ({ type: "MIRUDISTOK/USER/SET_USERS", payload: user } as const)
}
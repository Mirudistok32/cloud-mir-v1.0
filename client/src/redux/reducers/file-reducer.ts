import { InferActionsTypes } from './../store';

type FileChildsType = {
    type: string,
    ref: string
}

type FileType = {
    name: string
    type: string
    accessLink: string
    size: { type: Number, default: 0 },
    path: string
    user: string
    parent: string
    childs: Array<FileChildsType>
}


type InitialStateType = {
    files: Array<FileType> | null
    currentDir: string | null
}

const initialState: InitialStateType = {
    files: [],
    currentDir: null
}

type ActionsTypes = InferActionsTypes<typeof actionsFileReducer>

export const fileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "MIRUDISTOK/FILE/SET_FILES": {
            return { ...state, ...action.payload }
        }
        default:
            return state
    }
}


export const actionsFileReducer = {
    setFiles: (file: FileType) => ({ type: "MIRUDISTOK/FILE/SET_FILES", payload: file } as const)
}
import { InferActionsTypes } from './../store';

type FileChildsType = {
    type: string,
    ref: string
}

export type FileType = {
    name: string
    type: string
    accessLink: string
    size: { type: Number, default: 0 },
    path: string
    user: string
    date: string
    parent: string
    childs: Array<FileChildsType>
}


type InitialStateType = {
    files: Array<FileType> | null
    currentDir: null | string
}

const initialState: InitialStateType = {
    files: [],
    currentDir: null
}

type ActionsTypes = InferActionsTypes<typeof actionsFileReducer>

export const fileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "MIRUDISTOK/FILE/SET_FILES": {
            return { ...state, files: action.payload }
        }
        case "MIRUDISTOK/FILE/SET_CURRENT_DIR": {
            return { ...state, currentDir: action.payload }
        }
        default:
            return state
    }
}


export const actionsFileReducer = {
    setFiles: (file: Array<FileType>) => ({ type: "MIRUDISTOK/FILE/SET_FILES", payload: file } as const),
    setCurrentDir: (currentDir: string) => ({ type: "MIRUDISTOK/FILE/SET_CURRENT_DIR", payload: currentDir } as const),
}
import { InferActionsTypes } from './../store';

type FileChildsType = {
    type: string,
    ref: string
}

export type FileType = {
    _id: string
    name: string
    type: string
    accessLink: string
    size: number,
    path: string
    user: string
    date: string
    parent: string
    childs: Array<FileChildsType>
}


type InitialStateType = {
    files: Array<FileType>
    currentDir: string
    isPopup: boolean
    dirStack: Array<string>
}

const initialState: InitialStateType = {
    files: [],
    currentDir: '',
    isPopup: false,
    dirStack: []
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
        case "MIRUDISTOK/FILE/ADD_FILE": {
            return { ...state, files: [...state.files, action.payload] }
        }
        case "MIRUDISTOK/FILE/SET_POPUP": {
            return { ...state, isPopup: action.payload }
        }
        case "MIRUDISTOK/FILE/PUSH_TO_STACK": {
            return { ...state, dirStack: [...state.dirStack, action.payload] }
        }
        default:
            return state
    }
}


export const actionsFileReducer = {
    setFiles: (file: Array<FileType>) => ({ type: "MIRUDISTOK/FILE/SET_FILES", payload: file } as const),
    setCurrentDir: (currentDir: string) => ({ type: "MIRUDISTOK/FILE/SET_CURRENT_DIR", payload: currentDir } as const),
    addFile: (file: FileType) => ({ type: "MIRUDISTOK/FILE/ADD_FILE", payload: file } as const),
    setPopup: (is: boolean) => ({ type: "MIRUDISTOK/FILE/SET_POPUP", payload: is } as const),
    pushToStack: (dir: string) => ({ type: "MIRUDISTOK/FILE/PUSH_TO_STACK", payload: dir } as const),
}
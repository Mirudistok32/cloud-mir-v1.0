import { InferActionsTypes } from './../store';


type InitialStateType = {

}

const initialState: InitialStateType = {

}

type ActionsTypes = InferActionsTypes<typeof actionsFileReducer>

export const fileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {

        default:
            return state
    }
}


export const actionsFileReducer = {

}
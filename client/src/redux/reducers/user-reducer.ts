import { InferActionsTypes } from './../store';


type InitialStateType = {

}

const initialState: InitialStateType = {

}

type ActionsTypes = InferActionsTypes<typeof actionsUserReducer>

const userReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {

        default:
            return state
    }
}


export const actionsUserReducer = {

}
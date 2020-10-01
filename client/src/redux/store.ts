import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducers = combineReducers({

})

type RootReducersType = typeof rootReducers
export type AppStateType = ReturnType<RootReducersType>

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)))


export default store
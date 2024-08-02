import {combineReducers, createStore} from "redux"
import { todoListReducer } from "../reducers/todoListReducer/todolist-reducer"
import { tasksReducer } from "../reducers/tasksReducer/tasks-reducer"

const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer
})

export type AppStoreType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)


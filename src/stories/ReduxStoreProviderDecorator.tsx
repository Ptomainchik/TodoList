import { Provider } from "react-redux"
import { AppStoreType, store } from "../store/store"
import { combineReducers, createStore} from "redux"
import { v1 } from "uuid"
import { tasksReducer } from "../reducers/tasksReducer/tasks-reducer"
import { todoListReducer } from "../reducers/todoListReducer/todolist-reducer"



const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListReducer
})

const initialGlobalState = {
  todoLists: [
    {id: "todoListId1", title: "What to learn", filter: "all"},
    {id: "todoListId2", title: "What to Buy", filter: "all"}
  ],
  tasks: {
    ["todoListId1"]: [
      {id: v1(), title: "HTML", isDone: true},
      {id: v1(), title: "JS", isDone: true}
    ],
    ["todoListId2"]: [
      {id: v1(), title: "NoteBook", isDone: true},
      {id: v1(), title: "Sgushenka", isDone: true}
    ]
   }

}

export const storyBookStore = createStore(rootReducer,initialGlobalState as any)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()} </Provider>
}
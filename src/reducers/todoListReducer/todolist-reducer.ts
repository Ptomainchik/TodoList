import { v1 } from "uuid"
import { FilterValuesType, TodoListType } from "../../App"

export type RemoveTodoListActionType = {
  type:"REMOVE_TODOLIST"
  todoListId: string
}

export type AddTodoListActionType = {
  type:"ADD_TODOLIST"
  title: string
  todoListId: string
}

export type ChangeTodoListTitleActionType = {
  type: "CHANGE_TODOLIST_TITLE"
  id: string
  title: string
}

export type ChangeTodoListFilterActionType = {
  type: "CHANGE_TODOLIST_FILTER"
  id: string
  filter: FilterValuesType
}

type ActionsType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType


const initialState: Array<TodoListType>  = [

]

export const todoListReducer = (state: Array<TodoListType> = initialState, action: ActionsType): Array<TodoListType> => {
   switch (action.type) {
      case "REMOVE_TODOLIST": {
        return state.filter(tl => tl.id !== action.todoListId)
      }
      case "ADD_TODOLIST": {
 
        return [ { 
            id: action.todoListId,
            title: action.title,
            filter: "all" }, ...state]
           }
      case "CHANGE_TODOLIST_TITLE": {
        const todoList = state.find(tl => tl.id === action.id)
           if (todoList){
            todoList.title = action.title
           }

        return [...state]
      }
      case "CHANGE_TODOLIST_FILTER": {
        const todoList = state.find(tl => tl.id === action.id)
           if (todoList){
            todoList.filter = action.filter
           }
        return [...state]
      }
  
        default:
           return state
    }
}

export const removeTodolistAC = (todoListId: string): RemoveTodoListActionType => {
 return {type: "REMOVE_TODOLIST", todoListId}
}

export const addTodoListAC = (title: string): AddTodoListActionType => {
  return {type: "ADD_TODOLIST", title, todoListId: v1()}
}

export const changeTodoListTitleAC = (title: string, id: string): ChangeTodoListTitleActionType => {
  return {type: "CHANGE_TODOLIST_TITLE",  title, id}
}

export const changeFilterAC = (filter: FilterValuesType, id: string ): ChangeTodoListFilterActionType => {
  return {type: "CHANGE_TODOLIST_FILTER", filter, id}

}
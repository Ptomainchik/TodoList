import { v1 } from "uuid"
import { FilterValuesType, TodoListType } from "../App"

export type RemoveTodoListActionType = {
  type:"REMOVE_TODOLIST"
  id: string
}

export type AddTodoListActionType = {
  type:"ADD_TODOLIST"
  title: string
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

export const todoListReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
      case "REMOVE_TODOLIST": {
        return state.filter(tl => tl.id != action.id)
      }
      case "ADD_TODOLIST": {
        return [...state, { 
            id: v1(),
            title: action.title,
            filter: "all" }]
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
            throw new Error("I don't understand this action type")
    }
}

export const RemoveTodolistAC = (id: string): RemoveTodoListActionType => {
 return {type: "REMOVE_TODOLIST", id: id}
}

export const AddTodoListAC = (title: string): AddTodoListActionType => {
  return {type: "ADD_TODOLIST", title: title}
}

export const ChangeTodoListTitleAC = (title: string, id: string): ChangeTodoListTitleActionType => {
  return {type: "CHANGE_TODOLIST_TITLE", id: id, title: title }
}

export const ChangeTodoListFilterAC = (filter: FilterValuesType, id: string ): ChangeTodoListFilterActionType => {
  return {type: "CHANGE_TODOLIST_FILTER", id: id, filter: filter}

}
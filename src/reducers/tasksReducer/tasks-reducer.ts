import { v1 } from "uuid"
import { TaskStateType } from "../../App"
import { AddTodoListActionType, RemoveTodoListActionType} from "../todoListReducer/todolist-reducer"

export type RemoveTaskActoinType = {
  type: "REMOVE_TASK"
  taskId: string
  todoListId: string
} 

export type AddTaskActionType = {
  type: "ADD_TASK"
  title: string
  todoListId: string
}

export type CangeTaskStatusType = {
  type: "CHANGE_TASK_STATUS"
  taskId: string
  todoListId: string
  isDone: boolean
}

export type CangeTaskTitleType = {
  type: "CHANGE_TASK_TITLE"
  taskId: string
  title: string
  todoListId: string
}

type ActionsType = RemoveTaskActoinType | AddTaskActionType | CangeTaskStatusType | CangeTaskTitleType | AddTodoListActionType | RemoveTodoListActionType

const initialState = {

}


export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
      case "REMOVE_TASK": { 
        const stateCopy = {...state}
        const tasks = state[action.todoListId]
        const filteredTasks = tasks.filter(t => t.id !== action.taskId)
        stateCopy[action.todoListId] = filteredTasks

        return stateCopy
      }

      case "ADD_TASK": {
        const stateCopy = {...state}
        const tasks = stateCopy[action.todoListId]
        const newTask = { 
          id: v1(),
          title: action.title,
          isDone: false }
        const newTasks = [newTask, ...tasks]
        stateCopy[action.todoListId] = newTasks

        return stateCopy
         }
      case "CHANGE_TASK_STATUS": {
       
        const todoListTasks = state[action.todoListId]
        state[action.todoListId] = todoListTasks
              .map(t => t.id === action.taskId
                ? {...t, isDone: action.isDone}
               : t) 
        return ({...state})
      }

      case "CHANGE_TASK_TITLE": {
        const todoListTasks = state[action.todoListId]
        state[action.todoListId] = todoListTasks
              .map(t => t.id === action.taskId
                ? {...t, title: action.title}
               : t) 
        return ({...state})
      }
      case "ADD_TODOLIST": {
          const stateCopy = {...state}
          stateCopy[action.todoListId] = []
          return stateCopy
      }
      case "REMOVE_TODOLIST": {
        const stateCopy = {...state}
        delete stateCopy[action.todoListId]
        return stateCopy

      }

        default:
           return state
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): ActionsType => {
 return {type: "REMOVE_TASK", todoListId, taskId}
}

export const addTaskAC = (title: string, todoListId: string): ActionsType=> {
  return {type: "ADD_TASK", title, todoListId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ActionsType => {
  return {type: "CHANGE_TASK_STATUS", taskId , isDone, todoListId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ActionsType => {
  return {type: "CHANGE_TASK_TITLE", taskId , title, todoListId}
}

import React, {  useCallback } from "react"
import { FilterValuesType } from "../../App"
import { AddItemForm } from "../AddItemForm/AddItemForm"
import { EditableSpan } from "../EditableSpan/EditableSpan"
import { Button, IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { Task } from "../Task/Task"


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    id: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
    changeTaskTitle: (id: string, newTitle: string,  todoListId: string) => void
}

export const TodoList = React.memo((props: PropsType) => {

 const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id),[props.changeFilter, props.id])
 const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id),[props.changeFilter, props.id])
 const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id),[props.changeFilter, props.id])

 const removeTodoList = () => { props.removeTodoList(props.id)}
 
 const changeTodoListTitle = (newTitle: string) => { props.changeTodoListTitle(props.id , newTitle)}
 
 const addTask = useCallback((title: string) => {
    props.addTask(title, props.id)
 }, [props.addTask, props.id])


  let tasksForTodoList = props.tasks
  
  if (props.filter === "active") {
    tasksForTodoList = props.tasks.filter(t => t.isDone === false)
  }
  if (props.filter === "completed") {
    tasksForTodoList = props.tasks.filter(t => t.isDone === true)
  }

return (
<div className="task">
    <h3 className="title"> <EditableSpan title={props.title} onChange={changeTodoListTitle}/>
    <IconButton  onClick={removeTodoList} aria-label="delete" color="success" size="small">
  <Delete/>
</IconButton>
</h3>
   <AddItemForm  addItem={addTask}/>
    <ul>
       { tasksForTodoList.map(t => <Task
        task={t}
        changeTaskStatus={props.changeTaskStatus}
        changeTaskTitle={props.changeTaskTitle}
        removeTask={props.removeTask}
        todoListId={props.id}
        key={t.id}
        />)}

    </ul>
    <div>
        <Button variant={props.filter === "all" ? "contained" : "outlined"} size="small" color="success" onClick={onAllClickHandler}>All</Button>
        <Button variant={props.filter === "active" ? "contained" : "outlined"} size="small" color="success" onClick={onActiveClickHandler}>Active</Button>
        <Button variant={props.filter === "completed" ? "contained" : "outlined"} size="small" color="success" onClick={onCompletedClickHandler}>Completed</Button>
    </div>
</div>
)})


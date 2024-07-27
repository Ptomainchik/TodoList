import { ChangeEvent } from "react"
import { FilterValuesType } from "../../App"
import { AddItemForm } from "../AddItemForm/AddItemForm"
import { EditableSpan } from "../EditableSpan/EditableSpan"
import { Button, Checkbox, IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"


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

export const TodoList = (props: PropsType) => {

 const onAllClickHandler = () => props.changeFilter('all', props.id)
 const onActiveClickHandler = () => props.changeFilter('active', props.id)
 const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
 const removeTodoList = () => {
    props.removeTodoList(props.id)
 }

 const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(props.id , newTitle)
 }
 const addTask = (title: string) => {
    props.addTask(title, props.id)
 }

return (
<div>
    <h3 className="title"> <EditableSpan title={props.title} onChange={changeTodoListTitle}/>
    <IconButton  onClick={removeTodoList} aria-label="delete" color="success" size="small">
  <Delete/>
</IconButton>
</h3>
   <AddItemForm  addItem={addTask}/>
    <ul>
        {props.tasks.map(t => { 
            const onClickHandler = () => {
                props.removeTask(t.id, props.id)}
                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                }
                const onChangeTitleHandler = (newValue: string) => {
                    props.changeTaskTitle(t.id, newValue, props.id);
                }
            return<li key={t.id} className={t.isDone ? "is-done" : ""}>
                <Checkbox color="success" defaultChecked size="small"
                        checked={t.isDone} 
                        onChange={onChangeStatusHandler}/>
                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                <IconButton onClick={onClickHandler} aria-label="delete" color="success" size="small">
  <Delete fontSize="inherit" />
</IconButton>
                </li>
})}
    </ul>
    <div>
        <Button variant={props.filter === "all" ? "contained" : "outlined"} size="small" color="success" onClick={onAllClickHandler}>All</Button>
        <Button variant={props.filter === "active" ? "contained" : "outlined"} size="small" color="success" onClick={onActiveClickHandler}>Active</Button>
        <Button variant={props.filter === "completed" ? "contained" : "outlined"} size="small" color="success" onClick={onCompletedClickHandler}>Completed</Button>
    </div>
</div>
)}


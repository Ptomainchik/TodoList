import React, { ChangeEvent, useCallback } from "react"
import { TaskType } from "../TodoList/TodoList"
import { Checkbox, IconButton } from "@mui/material"
import { EditableSpan } from "../EditableSpan/EditableSpan"
import { Delete } from "@mui/icons-material"

type TaskPropsType = {
    removeTask: (id: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (id: string, newTitle: string,  todoListId: string) => void
    task: TaskType
    todoListId: string
}

export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => {
        props.removeTask(props.task.id, props.todoListId)}
        const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListId);
        },[props.changeTaskStatus, props.todoListId, props.task.id])
        const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(props.task.id, newValue, props.todoListId);
        }
    return<li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox color="success" defaultChecked size="small"
                checked={props.task.isDone} 
                onChange={onChangeStatusHandler}/>
        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        <IconButton onClick={onClickHandler} aria-label="delete" color="success" size="small">
<Delete fontSize="inherit" />
</IconButton>
        </li>
})
import React from "react"
import { action } from "@storybook/addon-actions"
import { Task } from "./Task"


export default {
    title: "TaskComponent",
    component: Task
}



const changeTaskStatuscallback = action("Status Changed")
const changeTaskTitlecallback = action("TitleChanged")
const removeTaskcallback = action("Task removed")

export const TaskBaseExample = (props: any) => {
    return <>
     <Task 
     
     task={{id: "1", isDone: true, title: "JS"}}
     changeTaskStatus={changeTaskStatuscallback}
     changeTaskTitle={changeTaskTitlecallback}
     removeTask={removeTaskcallback}
     todoListId={"todoListId1"}/>

<Task 
     
     task={{id: "2", isDone: false, title: "React"}}
     changeTaskStatus={changeTaskStatuscallback}
     changeTaskTitle={changeTaskTitlecallback}
     removeTask={removeTaskcallback}
     todoListId={"todoListId2"}/>
     </>
}
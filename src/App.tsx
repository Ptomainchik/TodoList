import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './components/TodoList/TodoList';
import { v1 } from 'uuid';
import { AddItemForm } from './components/AddItemForm/AddItemForm';



export type FilterValuesType = "all" | "completed" | "active"

type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TaskStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  let removeTask = (id: string, todoListId: string) => {
    let tasks = tasksObj[todoListId]
    let filteredTasks = tasks.filter( t => t.id !== id )
    tasksObj[todoListId] = filteredTasks
    setTasks({...tasksObj})
  }
  
  let addTask = (title: string, todoListId: string) => {
    let task = {id: v1(), title: title, isDone: false }
    let tasks = tasksObj[todoListId]
    let newTasks = [task, ...tasks]
    tasksObj[todoListId] = newTasks
    setTasks({...tasksObj})
  }

  const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
    let todoListTasks = tasksObj[todoListId]
    let task = todoListTasks.find( t =>  t.id === taskId)
    if (task){
    task.isDone = isDone
    setTasks({...tasksObj})
  }
}

const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
  let todoListTasks = tasksObj[todoListId]
  let task = todoListTasks.find( t =>  t.id === taskId)
  if (task){
  task.title = newTitle
  setTasks({...tasksObj})
}
}

  const changeFilter = (value: FilterValuesType, todoListId: string) => {
  let todoList = todoLists.find(tl => tl.id === todoListId)
  if (todoList) {
   todoList.filter = value
   setTodoLists([...todoLists])
  }
}

let todoListId1 = v1()
let todoListId2 = v1()

let [todoLists, setTodoLists] = useState<Array<TodoListType>> ([
    {id: todoListId1, title: "What to learn", filter: "all" },
    {id: todoListId2, title: "What to buy", filter: "all"}
  ])

let removeTodoList = (todoListId: string) => {
  let filteredTodoList = todoLists.filter (tl => tl.id !== todoListId)
  setTodoLists(filteredTodoList)
  delete tasksObj[todoListId]
  setTasks({...tasksObj})
}

const changeTodoListTitle = (id: string, newTitle: string) => {
  const todoList = todoLists.find(tl => tl.id === id )
  if (todoList) {
    todoList.title = newTitle
    setTodoLists([...todoLists])
  }
}

let [tasksObj, setTasks] = useState<TaskStateType>({
  [todoListId1]:  [
    {id: v1(), title: "CSS/HTML", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Rest API", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false}
  ],
  [todoListId2]: [
    {id: v1(), title: "NoteBook", isDone: false },
    {id: v1(), title: "SuperGlue", isDone: true }
  ]
})

 const addTodoList = (title: string) => {
  let todoList: TodoListType = {
    id: v1(),
    filter: "all",
    title: title
  }
  setTodoLists([todoList, ...todoLists])
  setTasks({ ...tasksObj, [todoList.id]: []})
 } 

  return (
   
    <div className="App">
     <AddItemForm  addItem={addTodoList}/>
      { 
      todoLists.map((tl) => {
       
        let tasksForTodolist = tasksObj[tl.id]

        if (tl.filter === "completed") {
          tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
        }
        if (tl.filter === "active") {
          tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
        }

      return <TodoList 
                key={tl.id}
                id={tl.id}
                tasks={tasksForTodolist} 
                title={tl.title}
                removeTask={removeTask} 
                changeFilter={changeFilter}
                addTask={addTask} 
                changeTaskStatus={changeTaskStatus} 
                filter={tl.filter}
                removeTodoList={removeTodoList}
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle={changeTodoListTitle}
            />})}
    </div>)

      }
export default App;

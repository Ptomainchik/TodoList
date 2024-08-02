import React, { useReducer } from 'react';
import './App.css';
import { TaskType, TodoList } from './components/TodoList/TodoList';
import { v1 } from 'uuid';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
import { AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { addTodoListAC, changeFilterAC, changeTodoListTitleAC, removeTodolistAC, todoListReducer } from './reducers/todoListReducer/todolist-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './reducers/tasksReducer/tasks-reducer';


export type FilterValuesType = "all" | "completed" | "active"

export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TaskStateType = {
  [key: string]: Array<TaskType>
}

function AppWithReducers() {
  
let todoListId1 = v1()
let todoListId2 = v1()

  
  let [tasksObj, dispatchTasksRedusers] = useReducer(tasksReducer,{
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
 
  let removeTask = (id: string, todoListId: string) => {
      dispatchTasksRedusers(removeTaskAC(id, todoListId))
  }
  
  let addTask = (title: string, todoListId: string) => {
      dispatchTasksRedusers(addTaskAC(title, todoListId))
  }

  const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
      dispatchTasksRedusers(changeTaskStatusAC(taskId, isDone, todoListId))
  }


  const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
      dispatchTasksRedusers(changeTaskTitleAC(taskId, newTitle, todoListId))
  }



let [todoLists, dispatchTodoListReducers] = useReducer(todoListReducer,[
    {id: todoListId1, title: "What to learn", filter: "all" },
    {id: todoListId2, title: "What to buy", filter: "all"}
  ])



const changeFilter = (value: FilterValuesType, todoListId: string) => {
    dispatchTodoListReducers(changeFilterAC(value, todoListId))
}

let removeTodoList = (todoListId: string) => {
  const action = removeTodolistAC(todoListId)
  dispatchTasksRedusers(action)
  dispatchTodoListReducers(action)
}

const changeTodoListTitle = (id: string, newTitle: string) => {
 dispatchTodoListReducers(changeTodoListTitleAC(id, newTitle))
}


const addTodoList = (title: string) => {
   const action = addTodoListAC(title)
   dispatchTodoListReducers(action)
   dispatchTasksRedusers(action)
} 

  return (
   
    <div className="App">
   <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TodoList
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
     <Container fixed>
      <Grid container>
      <AddItemForm  addItem={addTodoList}/>
      </Grid>
      <Grid container spacing={3}>
      { 
      todoLists.map((tl) => {
       
        let tasksForTodolist = tasksObj[tl.id]

        if (tl.filter === "completed") {
          tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
        }
        if (tl.filter === "active") {
          tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
        }

      return <Grid item>
        <TodoList 
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
            />
            </Grid>
            })}
            </Grid>
            </Container>
    </div>)}
export default AppWithReducers;

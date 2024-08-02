import './App.css';
import { TaskType, TodoList } from './components/TodoList/TodoList';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
import { AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { addTodoListAC, changeFilterAC, changeTodoListTitleAC, removeTodolistAC } from './reducers/todoListReducer/todolist-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './reducers/tasksReducer/tasks-reducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppStoreType } from './store/store';
import { useCallback } from 'react';
import { v1 } from 'uuid';


export type FilterValuesType = "all" | "completed" | "active"

export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TaskStateType = {
  [key: string]: Array<TaskType>
}

export let todoListId1 = v1()
export let todoListId2 = v1()

function AppWithRedux() {
 

const dispatch = useDispatch()

const todoLists = useSelector<AppStoreType, Array<TodoListType>>( state => state.todoLists)
const tasks = useSelector<AppStoreType,TaskStateType>( state => state.tasks)

 
 
  let removeTask = useCallback((id: string, todoListId: string) => {
      dispatch(removeTaskAC(id, todoListId))
  },[dispatch])
  
  let addTask = useCallback((title: string, todoListId: string) => {
      dispatch(addTaskAC(title, todoListId))
  },[dispatch])

  const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todoListId: string) => {
      dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
  },[dispatch])

  const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {
      dispatch(changeTaskTitleAC(taskId, newTitle, todoListId))
  },[dispatch])


const changeFilter = useCallback((value: FilterValuesType, todoListId: string) => {
    dispatch(changeFilterAC(value, todoListId))
},[dispatch])

let removeTodoList = useCallback((todoListId: string) => {
  const action = removeTodolistAC(todoListId)
  dispatch(action)
},[dispatch])

const changeTodoListTitle = useCallback((id: string, newTitle: string) => {
 dispatch(changeTodoListTitleAC(id, newTitle))
},[dispatch])


const addTodoList = useCallback((title: string) => {
   const action = addTodoListAC(title)
   dispatch(action)
   
},[dispatch] )

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
      todoLists.map(tl => {
        let allTodoListTasks = tasks[tl.id]
        let tasksForTodolist = allTodoListTasks

        

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
export default AppWithRedux;

import { TaskStateType, TodoListType } from "../App"
import { tasksReducer } from "../reducers/tasksReducer/tasks-reducer"
import { addTodoListAC, todoListReducer } from "../reducers/todoListReducer/todolist-reducer"

test("ids should be equals", () => {
    const startTasksState: TaskStateType = {}
    const startTodoListsState: Array<TodoListType> = []

    const action = addTodoListAC("new todoList")

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListState = todoListReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListState[0].id

    expect(idFromTasks).toBe(action.todoListId)
    expect(idFromTodoLists).toBe(action.todoListId)
})
import { v1 } from "uuid"
import { addTodoListAC, changeFilterAC, changeTodoListTitleAC, removeTodolistAC, todoListReducer } from "./todolist-reducer"
import { FilterValuesType, TodoListType } from "../../App"

test("correct todolist should be removed", () => {
    let todoListId1 = v1()
    let todoListId2 = v1()


    const startState: Array<TodoListType> = [
        {id: todoListId1, title: "What to learn", filter: "all" },
        {id: todoListId2, title: "What to buy", filter: "all"}
      ]

      const endState = todoListReducer(startState, removeTodolistAC(todoListId1))

      expect(endState.length).toBe(1)
      expect(endState[0].id).toBe(todoListId2)
})

test("new property with new array should be when new todoList is added", () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newTodoListTitle = "NewTodoList"

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: "What to learn", filter: "all" },
        {id: todoListId2, title: "What to buy", filter: "all"}
      ]

      const endState = todoListReducer(startState, addTodoListAC(newTodoListTitle))

      expect(endState.length).toBe(3)
      expect(endState[0].title).toBe(newTodoListTitle)
      expect(endState[0].filter).toBe("all")
})

test("correct todolist should change its name", () => {
  let todoListId1 = v1()
  let todoListId2 = v1()

  let newTodoListTitle = "NewTodoList"

  const startState: Array<TodoListType> = [
      {id: todoListId1, title: "What to learn", filter: "all" },
      {id: todoListId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListReducer(startState, changeTodoListTitleAC(newTodoListTitle, todoListId2))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodoListTitle)
})

test("correct filter to todolist should be changed", () => {
  let todoListId1 = v1()
  let todoListId2 = v1()

  let newFilter: FilterValuesType = "completed"

  const startState: Array<TodoListType> = [
      {id: todoListId1, title: "What to learn", filter: "all" },
      {id: todoListId2, title: "What to buy", filter: "all"}
    ]
  

    const endState = todoListReducer(startState,changeFilterAC(newFilter, todoListId2))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
})
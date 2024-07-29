import { TaskStateType } from "../../App"
import { addTodoListAC, removeTodolistAC } from "../todoListReducer/todolist-reducer"
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "./tasks-reducer"



test("correct task should be deleted from correct array", () => {
const startState: TaskStateType = {
    "todoListId1": [
        {id: "1", title: "CSS", isDone: false},
        {id: "2", title: "JS", isDone: true},
        {id: "3", title: "React", isDone: false}
    ],
    "todoListId2": [
        {id: "1", title: "milk", isDone: false},
        {id: "2", title: "bread", isDone: true},
        {id: "3", title: "cofe", isDone: false}
    ]
}



const action = removeTaskAC("2", "todoListId2")

const endState = tasksReducer(startState, action)

expect(endState["todoListId1"].length).toBe(3)
expect(endState["todoListId2"].length).toBe(2)
expect(endState["todoListId2"].every(t => t.id != "2")).toBeTruthy()
})



test("correct task should be added to correct array", () => {
    const startState: TaskStateType = {
        "todoListId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todoListId2": [
            {id: "1", title: "milk", isDone: false},
            {id: "2", title: "bread", isDone: true},
            {id: "3", title: "cofe", isDone: false}
        ]
    }
    
    
    
    const action = addTaskAC("sup", "todoListId2")
    
    const endState = tasksReducer(startState, action)
    
    expect(endState["todoListId1"].length).toBe(3)
    expect(endState["todoListId2"].length).toBe(4)
    expect(endState["todoListId2"][0].id).toBeDefined()
    expect(endState["todoListId2"][0].title).toBe("sup")
    expect(endState["todoListId2"][0].isDone).toBe(false)


})


test("status of specified task should be change", () => {
    const startState: TaskStateType = {
        "todoListId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todoListId2": [
            {id: "1", title: "milk", isDone: false},
            {id: "2", title: "bread", isDone: true},
            {id: "3", title: "cofe", isDone: false}
        ]
    }
    
    
    
    const action = changeTaskStatusAC("2", false, "todoListId2")
    
    const endState = tasksReducer(startState, action)
  
    expect(endState["todoListId2"][1].isDone).toBeFalsy()
    expect(endState["todoListId1"][1].isDone).toBeTruthy()

})


test("title of specified task should be change", () => {
    const startState: TaskStateType = {
        "todoListId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todoListId2": [
            {id: "1", title: "milk", isDone: false},
            {id: "2", title: "bread", isDone: true},
            {id: "3", title: "coffee", isDone: false}
        ]
    }
    
    
    
    const action = changeTaskTitleAC("2", "salad", "todoListId2")
    
    const endState = tasksReducer(startState, action)
  
    expect(endState["todoListId2"][1].title).toBe("salad")
    expect(endState["todoListId1"][1].title).toBe("JS")

})

test("correct todolist should be added", () => {
    const startState: TaskStateType = {
        "todoListId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todoListId2": [
            {id: "1", title: "milk", isDone: false},
            {id: "2", title: "bread", isDone: true},
            {id: "3", title: "coffee", isDone: false}
        ]
    }
    
    
    
    const action = addTodoListAC("new todolist")
    
    const endState = tasksReducer(startState, action)
  
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != "todoListId1" && k != "todoListId2")
    if (!newKey) {
        throw Error("new key should be added")
    } 



    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])

})

test("property with todoListId should be deleted", () => {
    const startState: TaskStateType = {
        "todoListId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todoListId2": [
            {id: "1", title: "milk", isDone: false},
            {id: "2", title: "bread", isDone: true},
            {id: "3", title: "coffee", isDone: false}
        ]
    }
    
    
    
    const action = removeTodolistAC("todoListId2")
    
    const endState = tasksReducer(startState, action)
  
    const keys = Object.keys(endState)
    


    expect(keys.length).toBe(1)
    expect(endState["todoListId"]).not.toBeDefined()

})
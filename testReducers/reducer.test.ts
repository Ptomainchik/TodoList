import { userReducer } from "./userReducer";

test("user reducer should increment only age", () => {
    const startState = {age: 25, autoCount: 2, name: "Viland"}
    
    const endState = userReducer(startState, {type: "INCREMENT_AGE"} )

    expect(endState.age).toBe(26)
    expect(endState.autoCount).toBe(2)
})

test("user reducer should increment only autoCount", () => {
    const startState = {age: 25, autoCount: 2, name: "Viland"}
    const endState = userReducer(startState, {type: "INCREMENT_AUTO_COUNT"})
    expect(endState.autoCount).toBe(3)
    expect(endState.age).toBe(25)
    
})

// test("user reducer should increment only childrenCount", () => {
//     const startState = {age: 25, autoCount: 2, name: "Viland"}
//     const endState = userReducer(startState, {type: "INCREMENT_NAME"})
//     expect(endState.name).toBe("VilandSuper")
    
// })

test("user reducer should increment only name", () => {
    const startState = {age: 25, autoCount: 2, name: "Viland"}
    const newName = "Archibald"
    const endState = userReducer(startState, {type: "CHANGE_NAME", newName: newName})
    expect(endState.name).toBe(newName )
    
})
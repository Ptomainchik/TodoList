type StateType = { 
    age: number
    autoCount: number
    name: string
}

type ActionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case "INCREMENT_AGE" :
           return { ...state,
            age: state.age + 1}
           

        case "INCREMENT_AUTO_COUNT" :
            let newState = {...state}
            newState.autoCount = state.autoCount + 1
            return newState

        case "CHANGE_NAME" : 
            return {...state,
            name: action.newName }
           
            
            

        default:
            throw new Error("I don't understand this action type")
    }
}
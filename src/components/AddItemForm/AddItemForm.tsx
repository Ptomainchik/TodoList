import { Add } from "@mui/icons-material"
import { Fab, TextField } from "@mui/material"
import React, { ChangeEvent, KeyboardEvent, useState } from "react"

type AddItemFormType = {
    addItem: (title: string) => void
    }

export const AddItemForm = React.memo((props: AddItemFormType ) => {
    let [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null )
   
    const onChangeHandler = (e:  ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
     }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
       if (error !== null) {
        setError(null)
       }
       if (e.charCode === 13) {
        addTask()
       }
        }
    const addTask = () => {
            if (title.trim() !== ""){ 
            props.addItem(title.trim()); 
            setTitle("")}
            else {setError("Title is required")}
         } 
   
   
   
   return   <div className="task">
    <TextField size="small" variant="filled" color="success" value={title} onChange={onChangeHandler} 
    onKeyPress={onKeyPressHandler}
     className={error ? "error" : ""}
     label="Type value"/>
<Fab size="small" onClick={addTask} color="success" aria-label="add">
  <Add />
</Fab>

   {error && <div className="error-message">{error}</div>}
</div>
})
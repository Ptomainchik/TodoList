import React from "react"
import { action } from "@storybook/addon-actions"
import { EditableSpan } from "./EditableSpan"



export default {
    title: "EditableSpanComponent",
    component: EditableSpan
}



const changecallback = action("Title Changed")

export const EditableSpanBaseExample = (props: any) => {
    return  <EditableSpan title={"Start value"} onChange={changecallback} />


}
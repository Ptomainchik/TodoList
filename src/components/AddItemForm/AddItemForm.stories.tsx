import React from "react"
import { AddItemForm } from "./AddItemForm"
import { action } from "@storybook/addon-actions"

export default {
    title: "AddItemFormComponent",
    component: AddItemForm
}



const callback = action("Button add was form pressed inside the form")

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm addItem={callback} />
}
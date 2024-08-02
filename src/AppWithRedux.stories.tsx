import React from "react"
import AppWithRedux, { todoListId1 } from "./AppWithRedux"
import { ReduxStoreProviderDecorator } from "./stories/ReduxStoreProviderDecorator"


export default {
    title: "AppWithReduxComponent",
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}





export const AppWithReduxExample = (props: any) => {
    return   <AppWithRedux/>
      

}
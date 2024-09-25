'use client'

import { PlannerStoreProvider } from "../../providers/planner-store-provider"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

export function WrappedComponents({children}) {
    return (
        <PlannerStoreProvider>
            <DndProvider backend={HTML5Backend}>
            {children} 
            </DndProvider>
        </PlannerStoreProvider>
    )
}
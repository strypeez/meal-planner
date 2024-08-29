'use client'

import { useDrop } from "react-dnd"
import { ItemTypes } from "../../layout"

export default function PlannerDrop() {
    const [{isOver}, drop] = useDrop(() => ({
        accept: ItemTypes.RECIPE,
        drop: (item) => console.log('we received a recipe', item),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        })
    }))
    return <div ref={drop} className="bg-red-700">
        This is a planner drop
    </div>
}
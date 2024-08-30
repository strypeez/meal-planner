'use client'

import { useDrop } from "react-dnd"
import { ItemTypes } from "../../layout"

import { Recipe } from "../../../stores/planner-store"
import { usePlannerStore } from "../../../providers/planner-store-provider"

type PlannerDropProps = {
    day: number,
    meal: string,
    meals: Recipe[]
}

export default function PlannerDrop({day, meal, meals}: PlannerDropProps) {
    const { getRecipe, addMeal } = usePlannerStore((state) => state)
    const [{isOver}, drop] = useDrop(() => ({
        accept: ItemTypes.RECIPE,
        drop: (item: {id: string}) => {
            addMeal(day, meal, getRecipe(item.id))
            console.log('this is meals', meals)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        })
    }), [meals])
    return <div ref={drop} className="p-3">
        {
            meals.length === 0 ? <div>EMPTY</div> : meals.map((meal, index) => {
                return <div key={`${meal.id}${index}`}>
                    {meal.name}
                </div>
            })
        }
    </div>
}
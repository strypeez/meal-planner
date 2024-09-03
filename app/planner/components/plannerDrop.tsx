'use client'

import { useDrop } from "react-dnd"
import { ItemTypes } from "../../layout"

import { Recipe } from "../../../stores/planner-store"
import { usePlannerStore } from "../../../providers/planner-store-provider"
import PlannerRecipe from "./plannerRecipe"

type PlannerDropProps = {
    day: number,
    meal: string,
    meals: Recipe[]
}

export default function PlannerDrop({day, meal, meals}: PlannerDropProps) {
    const { getRecipe, addMeal, removeMeal } = usePlannerStore((state) => state)
    const [{isOver}, drop] = useDrop(() => ({
        accept: ItemTypes.RECIPE,
        drop: (item: {id: string}) => {
            addMeal(day, meal, getRecipe(item.id))
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        })
    }), [meals])
    return <div ref={drop} className="p-3 flex flex-col">
        {
            meals.length === 0 ? <div className="w-24 h-8"></div> : meals.map((recipe, index) => {
                return <PlannerRecipe key={index} meal={meal} day={day} rIndex={index} recipe={recipe} removeMeal={removeMeal}/>
            })
        }
    </div>
}
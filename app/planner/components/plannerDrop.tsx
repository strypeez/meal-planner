'use client'

import { useDrop } from "react-dnd"
import { ItemTypes } from "../../../stores/planner-store"

import { Recipe } from "../../../stores/planner-store"
import { usePlannerStore } from "../../../providers/planner-store-provider"
import PlannerRecipe from "./plannerRecipe"

type PlannerDropProps = {
    day: number,
    meal: string,
    meals: Recipe[],
    recipes: Recipe[],
    daily?: boolean
}

function getRecipe(recipes: Recipe[], slug: string): Recipe {
    const recipe = recipes.find((recipe) => (recipe.slug === slug))
    return (recipe as Recipe);
}

export default function PlannerDrop({day, meal, meals, recipes, daily = false}: PlannerDropProps) {
    const { addMeal, removeMeal } = usePlannerStore((state) => state)
    const [{isOver}, drop] = useDrop(() => ({
        accept: ItemTypes.RECIPE,
        drop: (item: {slug: string}) => {
            addMeal(day, meal, getRecipe(recipes, item.slug))
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        })
    }), [meals, recipes])

    // @ts-ignore: reactdnd no typescript
    return <div ref={drop} className={`p-3 h-full ${daily ? 'grid grid-cols-2 gap-x-2': 'flex flex-col'} ${isOver ? 'bg-amber-100' : ''}`}>
        {
            meals.length === 0 ? <div className="grow h-40"></div> : meals.map((recipe, index) => {
                return <PlannerRecipe key={index} meal={meal} day={day} rIndex={index} recipe={recipe} removeMeal={removeMeal}/>
            })
        }
    </div>
}
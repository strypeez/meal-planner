import { Recipe } from "../../../stores/planner-store"
import { useState } from "react"


type PlannerRecipeProps = {
    meal: string
    rIndex: number
    recipe: Recipe
    day: number
    removeMeal: (day: number, meal: string, mIndex: number) => void
}

export default function PlannerRecipe({meal, day, removeMeal, rIndex, recipe}: PlannerRecipeProps) {
    const [showDelete, setShowDelete] = useState(false);
    return <div onMouseEnter={() => {
        setShowDelete(true);
    }} onMouseLeave={()=>{setShowDelete(false)}}  className="w-36 h-36 my-2 border border-black relative">
        <div onClick={() => {
            removeMeal(day, meal, rIndex)}}
        className={`absolute flex items-center 
        justify-center -right-2 -top-2 rounded-full 
        border-black border w-5 h-5 bg-red-300 ${showDelete ? '': 'hidden'}`}>x</div>
        <div className="max-h-24 h-24">
            <img className="h-full w-full" alt={`${recipe.name}-tile-image`} src={recipe.image}/>
        </div>
        <div className="p-2 border-t border-black">
        {recipe.name}
        </div>
    </div>
}
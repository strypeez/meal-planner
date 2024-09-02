'use client'
import { useState } from "react"

import { usePlannerStore } from "../../providers/planner-store-provider";
import { RecipeTile } from "./recipeTile";

export default function RecipeSideDash() {
    const [isOpen, setIsOpen] = useState(true);
    const { recipes } = usePlannerStore((state) => state)
    return <div className="relative min-h-screen">
        <div 
            className={`${isOpen ? 'block' : 'hidden'} absolute min-h-screen border-r overflow-hidden border-black relative`}>
            <div className="p-3 border-b border-black">Recipes</div>
            <div>
                {Object.keys(recipes).map((recipeId) => {
                    let recipe = recipes[recipeId]
                    return <RecipeTile key={recipe.id} recipe={recipe}/>
                })}
            </div>
        </div>
        <div id="recipe-dash-tab" 
        onClick={() => {setIsOpen(!isOpen)}}
        className="top-0 w-10 h-10 p-2 bg-white absolute -right-10 border-y border-r border-black">tab</div>
    </div>
}
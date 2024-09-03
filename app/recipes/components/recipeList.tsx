import { useState } from "react"
import { Recipe } from "../../../stores/planner-store"

type RecipeListProps = {
    recipe: Recipe
}

export default function RecipeList({recipe}: RecipeListProps) {
    return <div className="border border-black my-2">
        <div className="border-b border-black p-4">{recipe.name}</div>
        <div className="p-4"><h2>Ingredients</h2></div>
    </div>
}
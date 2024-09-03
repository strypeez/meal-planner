import { useState } from "react"
import { Recipe } from "../../../stores/planner-store"

type RecipeListProps = {
    recipe: Recipe
}

export default function RecipeList({recipe}: RecipeListProps) {
    const [showExtra, setShowExtra] = useState(false);
    console.log('this is recipe', recipe)
    return <div className="border border-black my-2">
        <div onClick={()=>{setShowExtra(!showExtra)}} className={`${showExtra ? 'border-b' : ''} border-black p-4`}>{recipe.name}</div>
        <div className={`p-4 flex flex-col ${showExtra ? '': 'hidden'}`}>
            <h2 className="font-bold">Ingredients</h2>
            <div>{recipe.ingredients.map((ingredient, index) => (<div key={index}>{ingredient.quantity.number} {ingredient.quantity.measurement} {ingredient.name}</div>))}
            </div>
        </div>
    </div>
}
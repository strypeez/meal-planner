/* eslint-disable @next/next/no-img-element */
import { useState } from "react"
import { Recipe } from "../../../stores/planner-store"
import Link from "next/link";

type RecipeListProps = {
    recipe: Recipe
}

export default function RecipeList({recipe}: RecipeListProps) {
    const [showExtra, setShowExtra] = useState(false);
    return <div className="border border-black my-2">
        <div onClick={()=>{setShowExtra(!showExtra)}} className={`${showExtra ? 'border-b' : ''} border-black flex justify-start items-center`}>
            <img className="w-[120px] h-[68px] border-r border-black" alt={`${recipe.name}-image`} src={recipe.image}/>
            <div className="flex flex-grow items-center justify-between px-5">
                <p className="text-lg">{recipe.name}</p><p className="pl-2 text-xs">Servings: {recipe.servings}</p>
            </div>
        </div>
        <div className={`p-4 flex flex-col ${showExtra ? '': 'hidden'}`}>
            <div className="flex justify-between">
                <h2 className="font-bold">Ingredients</h2>
                <Link href={`/recipes/edit/${recipe.slug}`} className={`border border-black p-2`}>Edit</Link>
            </div>
            <div>{recipe.ingredients.map((ingredient, index) => (<div key={index}>{ingredient.quantity.number} {ingredient.quantity.measurement} {ingredient.name}</div>))}
            </div>
        </div>
    </div>
}
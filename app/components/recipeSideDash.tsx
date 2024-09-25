'use client'
import { useState, useEffect } from "react"

import { usePlannerStore } from "../../providers/planner-store-provider";
import { RecipeTile } from "./recipeTile";

import axios from "axios";
import { Recipe } from "../../stores/planner-store";


export default function RecipeSideDash() {
    const [ recipes2, setRecipes ] = useState([]);
    const [isOpen, setIsOpen] = useState(true);
    const { recipes } = usePlannerStore((state) => state)

    useEffect(() => {
        async function getRecipes() {
            const data = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/recipes/`
            );

            setRecipes(data.data.data);
        }

        getRecipes();
    }, [])

    return <div className="relative min-h-screen">
        <div 
            className={`${isOpen ? 'block' : 'hidden'} h-full absolute min-h-screen border-r overflow-hidden border-black relative`}>
            <div className="p-2 border-b border-black font-bold text-[16px]">Recipes</div>
            <div>
                {recipes2.map((recipe) => {
                    return <RecipeTile key={(recipe as Recipe).id} recipe={recipe}/>
                })}
            </div>
        </div>
        <div id="recipe-dash-tab" 
        onClick={() => {setIsOpen(!isOpen)}}
        className="top-0 w-10 h-10 p-2 bg-white absolute -right-10 border-y border-r border-black">tab</div>
    </div>
}
'use client'

import Link from "next/link";
import { usePlannerStore } from "../../providers/planner-store-provider";
import RecipeList from "./components/recipeList";
import axios from "axios";
import { useState } from "react";

type Inputs = {
  name: string
}

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Recipes() {

  const data = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/recipes/`
  );

  const recipes = data.data.data;

  return (
    <main className="flex min-h-screen flex-col items-center p-12 w-full h-full ">
      <div className="max-w-[800px] w-full">
        <div className="flex justify-between w-full">
          <h1 className="font-bold text-[24px]">Recipes</h1>
          <Link href="/recipes/add" className="p-2 border border-black">Add</Link>
        </div>
        <div>
          {Object.keys(recipes).map((recipe, index) => {
            return <RecipeList key={index} recipe={recipes[recipe]} />
          })}
        </div>
      </div>
    </main>
  );
}

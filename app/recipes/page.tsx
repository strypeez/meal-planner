'use client'
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import { usePlannerStore } from "../../providers/planner-store-provider";
import RecipeList from "./components/recipeList";

type Inputs = {
  name: string
}

export default function Recipes() {
  const {
    register, control, handleSubmit, formState: {errors},
  } = useForm();
  const [showForm, setShowForm] = useState(false);
  const { addRecipe, recipes } = usePlannerStore((state) => state)
  const onSubmit = (data) => {
    addRecipe({
      id: uuidv4(),
      ...data,
    })
  };

  const {fields, append} = useFieldArray({
    control,
    name: "ingredients",
  })

  return (
    <main className="flex min-h-screen flex-col items-center p-12 w-full h-full">
      <div className="max-w-[800px] w-full">
        <div className="flex justify-between w-full">
          <h1 className="font-bold text-[24px]">Recipes</h1>
          <button onClick={()=>{setShowForm(!showForm)}} className="p-2 border border-black">Add Recipe</button>
        </div>
        <form className={`flex flex-col w-full mt-2 border border-black p-3 ${showForm ? '' : 'hidden'}`} onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 flex flex-col">
            <label className="mb-1">Recipe Name</label>
            <input className="p-2" defaultValue="First recipe" {...register("name")} />
          </div>
          <div className="mb-3 flex flex-col">
            <label className="mb-1">Servings</label>
            <input className="p-2" defaultValue="1" {...register("servings")} />
          </div>
          <div className="flex justify-between">
            <div>Ingredients</div>
            <div className="p-2 border border-black" onClick={() => {append({name: '', measure: '', quantity: ''})}}>Add Ingredient</div>
          </div>
          {fields.map((field, index) => (
            <div className="mb-5" key={field.id}>
              <div className="flex flex-col">
                <label>Ingredient</label>
                <input className="mb-2" key={`name${field.id}`} {...register(`ingredients.${index}.name`)} />
              </div>
              <div className="flex flex-col">
                <label>Measurements</label>
                <div className="flex">
                  <input key={`quantity${field.id}`} {...register(`ingredients.${index}.quantity`)} />
                  <input className="ml-2" key={`measure${field.id}`} {...register(`ingredients.${index}.measure`)} />
                </div>
              </div>
            </div>
          ))}
          <input className="p-3 border border-black mt-3" type="submit"/>
        </form>
        <div>
          {Object.keys(recipes).map((recipe, index) => {
            return <RecipeList key={index} recipe={recipes[recipe]} />
          })}
        </div>
      </div>
    </main>
  );
}

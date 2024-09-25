'use client'

import { useForm, useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { usePlannerStore } from "../../../providers/planner-store-provider";
import axios from "axios";

export default function RecipeAddForm() {

    const {
        register, control, handleSubmit, formState: {errors},
      } = useForm({
        defaultValues: {
          ingredients: [{
            name: 'Default', measure: 'cup', quantity: '1'
          }]
        }
      });

    const { addRecipe, recipes } = usePlannerStore((state) => state)
    const onSubmit = async (data) => {
        try {
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/recipes/create`, {
            params: {
              id: uuidv4(),
              ...data,
              ingredients: data.ingredients.map((ingredient: any) => {
                return {
                  id: uuidv4(),
                  name: ingredient.name,
                  isList: true,
                  quantity: {
                    number: Number(ingredient.quantity),
                    measurement: ingredient.measure
                  }
                }
              })
            }
          })
        } catch (e: any) {
          if (e.response.status === 500) {
            console.log(e.response.data)
          }
        }
    };
  
    const {fields, append} = useFieldArray({
      control,
      name: "ingredients",
    })

    return <div className="flex min-h-screen flex-col p-12 w-full h-full">
        <form className={`flex flex-col w-full mt-2 p-5 border border-black`} onSubmit={handleSubmit(onSubmit)}>
          <h1 className="font-bold text-[24px]">Add Recipe</h1>
          <div className="mb-3 flex flex-col">
            <label className="mb-1">Recipe Name</label>
            <input className="p-2 rounded-sm bg-slate-100	" defaultValue="First recipe" {...register("name")} />
          </div>
          <div className="mb-3 flex flex-col">
            <label className="mb-1">Recipe Slug</label>
            <input className="p-2 rounded-sm bg-slate-100	" defaultValue="first-recipe" {...register("slug")} />
          </div>
          <div className="mb-3 flex flex-col">
            <label className="mb-1">Recipe Image</label>
            <input className="p-2 rounded-sm bg-slate-100	" defaultValue="first-recipe" {...register("image")} />
          </div>
          <div className="mb-3 flex flex-col">
            <label className="mb-1">Servings</label>
            <input className="p-2 rounded-sm bg-slate-100	" defaultValue="1" {...register("servings")} />
          </div>
          <div className="flex justify-between">
            <div>Ingredients</div>
            <div className="p-2 border border-black" onClick={() => {append({name: 'Default', measure: 'cup', quantity: '1'})}}>Add Ingredient</div>
          </div>
          {fields.map((field, index) => (
            <div className="mb-5" key={field.id}>
              <div className="flex flex-col">
                <label>Ingredient</label>
                <input className="mb-2 p-2 bg-slate-50" key={`name${field.id}`} {...register(`ingredients.${index}.name`)} />
              </div>
              <div className="flex flex-col">
                <label>Measurements</label>
                <div className="flex w-full">
                  <input className="p-2 shrink w-16" key={`quantity${field.id}`} {...register(`ingredients.${index}.quantity`)} />
                  <input className="ml-2 p-2 grow" key={`measure${field.id}`} {...register(`ingredients.${index}.measure`)} />
                </div>
              </div>
            </div>
          ))}
          <input className="p-3 border border-black mt-3" type="submit"/>
        </form>
    </div>
}
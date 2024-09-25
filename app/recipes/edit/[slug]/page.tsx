/* eslint-disable @next/next/no-async-client-component */
'use client'

import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { usePlannerStore } from "../../../../providers/planner-store-provider";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { Recipe } from "../../../../stores/planner-store";

export default function RecipeEditForm({params} : {params: { slug: string}}) {
    const slug = params.slug;
    const {
        register, control, handleSubmit, formState: {errors},
      } = useForm();

    const [recipe, setRecipe] = useState({});

    const { editRecipe, recipes } = usePlannerStore((state) => state);

    useEffect(() => {
      async function getRecipe() {
        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/recipes/recipe?slug=${slug}`
        );
        setRecipe(data.data.data);
      }

      getRecipe();
  
    }, [slug])

    const onSubmit = async (data: any) => {
        try {
          await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/recipes/recipe/update`, {
            params: {
              ...data,
              slug: slug,
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
  
    const {fields, append, replace} = useFieldArray({
      control,
      name: "ingredients",
    })

    useEffect(() => {
      if (Object.keys(recipe).length !== 0) {
        replace((recipe as Recipe).ingredients.map((ingredient) => {
          return {
            name: ingredient.name,
            measure: ingredient.quantity.measurement,
            quantity: ingredient.quantity.number
          }
        })) 
      }
    }, [recipe, replace, slug])


    

    return <div className="flex min-h-screen flex-col p-12 w-full h-full">

    {    
      Object.keys(recipe).length !== 0 ? <div>
        <h1 className="font-bold text-[24px]">Edit Recipe</h1>
        <form className={`flex flex-col w-full mt-2 p-5 border border-black`} onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 flex flex-col">
            <label className="mb-1">Recipe Name</label>
            <input className="p-2" defaultValue={(recipe as Recipe).name} {...register("name")} />
          </div>
          <div className="mb-3 flex flex-col">
            <label className="mb-1">Servings</label>
            <input className="p-2" defaultValue={(recipe as Recipe).servings} {...register("servings")} />
          </div>
          <div className="flex justify-between">
            <div>Ingredients</div>
            <div className="p-2 border border-black" onClick={() => {append({name: '', measure: '', quantity: ''})}}>Add Ingredient</div>
          </div>
          {fields.map((field, index) => (
            <div className="mb-5" key={field.id}>
              <div className="flex flex-col">
                <label>Ingredient</label>
                <input className="mb-2 p-2 bg-slate-50" key={`name${field.id}`} {...register(`ingredients.${index}.name`)} />
              </div>
              <div className="flex flex-col">
                <label>Measurements</label>
                <div className="flex">
                  <input className="p-2 shrink w-16" key={`quantity${field.id}`} {...register(`ingredients.${index}.quantity`)} />
                  <input className="ml-2 p-2 grow" key={`measure${field.id}`} {...register(`ingredients.${index}.measure`)} />
                </div>
              </div>
            </div>
          ))}
          <input className="p-3 border border-black mt-3" type="submit"/>
        </form>
        </div> : <div>Oops, could not find recipe</div>
    }
    </div>
}
'use client'
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

type Inputs = {
  name: string
}

export default function Recipes() {
  const {
    register, control, handleSubmit, formState: {errors},
  } = useForm()
  const onSubmit: SubmitHandler = (data) => console.log('this is the submit', data);

  const {fields, append} = useFieldArray({
    control,
    name: "ingredients",
  })

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div>This is the recipes page</div>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label>Recipe Name</label>
          <input defaultValue="First recipe" {...register("name")} />
        </div>
        <div className="mb-3">
          <label>Servings</label>
          <input defaultValue="1" {...register("servings")} />
        </div>
        <div><label>Ingredients</label>         <button className="p-2 border border-black" onClick={() => {append({name: '', measure: '', quantity: ''})}}>Add Ingredient</button></div>
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
    </main>
  );
}

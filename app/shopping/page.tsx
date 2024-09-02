'use client'

import { usePlannerStore } from "../../providers/planner-store-provider";
import { Ingredient } from "../types/recipeTypes";
import { Recipe } from "../../stores/planner-store";
import { Day } from "../../stores/planner-store";
import { toNamespacedPath } from "path";

type TotalIngredients = {
  [key: string]: {
    quantity: {
      number: number,
      measurement: string
    }
  }
}

function combineIngredients(ingredients: TotalIngredients, totalIngredients: TotalIngredients) {
  let newObject = JSON.parse(JSON.stringify(totalIngredients))

  Object.keys(ingredients).forEach((ingredient: string) => {
    if (ingredient in newObject) {
      newObject[ingredient].quantity.number += ingredients[ingredient].quantity.number;
    } else {
      newObject[ingredient] = {
        quantity: ingredients[ingredient].quantity,
      }
    }
  }) 
  return newObject;
}

function convertIngredientArray(ingredients: Ingredient[]) {
  const total: TotalIngredients = {};
  ingredients.forEach((ingredient) => {
    if (ingredient.name in total) {
      total[ingredient.name].quantity.number += ingredient.quantity.number;
    } else {
      total[ingredient.name] = {
        quantity: ingredient.quantity
      }
    }
  })
  return total;
}

function getTimeIngredients(meals: Recipe[]) {
  let timeTotal = {};
  meals.forEach((meal, index) => {
    timeTotal = combineIngredients(convertIngredientArray(meal.ingredients), timeTotal);
  })

  return timeTotal;
}

function getTotalIngredients(planner: Day[]) {
  let total: TotalIngredients = {};

  planner.forEach((day: Day, index) => {
      let BreakfastTotal = combineIngredients(getTimeIngredients(day.breakfast), total);
      let LunchTotal = combineIngredients(getTimeIngredients(day.lunch), BreakfastTotal);
      let DinnerTotal = combineIngredients(getTimeIngredients(day.dinner), LunchTotal)
      total = DinnerTotal;
  })

  return total;

}

export default function Shopping() {
  const { planner, recipes } = usePlannerStore((state) => state);
  let totals = getTotalIngredients(planner);
  return (
    <main className="flex min-h-screen flex-col items-center p-14">
      <div>Shopping List</div>
      {
        Object.keys(totals).map((total, index) => {
          return <div key={index}>
            <input type="checkbox" id={`${total}check`}></input> <span>{totals[total].quantity.number} {totals[total].quantity.measurement} of {total}</span>
          </div>
        })
      }
    </main>
  );
}

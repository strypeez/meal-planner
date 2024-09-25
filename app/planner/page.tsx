'use client'

import PlannerDrop from "./components/plannerDrop";
import { usePlannerStore } from "../../providers/planner-store-provider";
import { useState, useEffect } from "react";

import axios from 'axios';

import RecipeSideDash from "../components/recipeSideDash";

function createPlanner(planner: any, plannerClose: any, setPlannerClose: any, clearPlanner: any, recipes: any) {
  return <div className="flex flex-col mt-2 items-center">
    <div className="flex pb-2 w-full justify-between"><h1 className="font-bold text-[24px]">Planner</h1><div onClick={()=>{clearPlanner()}} className="px-2 py-1 border border-black">Clear</div></div>
    <div className="max-h-[30rem] border-y border-black overflow-y-auto w-fit">
    {
      planner.map((day: any, index: number) => {
        return <div className="border-x border-b last:border-b-0 last:border-x border-black" key={day.id}>
          <div className={`${plannerClose[index] ? '': 'border-b'} border-black p-2`} onClick={() => {
            setPlannerClose(plannerClose.map((day: any, dIndex: number) => {
              if (index === dIndex) {
                return !day
              }

              return day
            }))
          }}>{day.name}</div>
          <div className={`flex ${plannerClose[index] ? 'hidden': ''}`}>
            <div className="flex flex-col grow min-h-40">
              <div className="border-b border-black p-2 border-r text-[12px] w-48">Breakfast</div>
              <div className="border-r border-black grow w-48">
                <PlannerDrop day={index} meal={"breakfast"} meals={day.breakfast} recipes={recipes}/>
              </div>
            </div>
            <div className="flex flex-col grow">
              <div className="border-b border-black w-48 p-2 border-r text-[12px]">Lunch</div>
              <div className="border-r border-black grow w-48">
                <PlannerDrop day={index} meal={"lunch"} meals={day.lunch} recipes={recipes}/>
              </div>
            </div>
            <div className="flex flex-col grow">
              <div className="border-b border-black p-2 w-48 text-[12px]">Dinner</div>
              <div className=" border-black grow w-48">
                <PlannerDrop day={index} meal={"dinner"} meals={day.dinner} recipes={recipes} />
              </div>
            </div>
          </div>
        </div>
})
    }
    </div>
  </div>
}

function createDayPlanner(plannerData: any, dayIndex: any, handlePlannerIndex: any, recipes: any) {
  return <div className="flex flex-col max-w-[800px]">
    <div className="flex mt-2 mb-2 justify-between">
      <h1 className="font-bold text-[24px]">Planner</h1>
      <div className="flex">
        <div className={`border border-black px-2 py-1 ${dayIndex === 0 ? 'opacity-30' : '' }`} onClick={()=>{handlePlannerIndex(dayIndex - 1)}}>‹</div>
        <div className={`border border-black px-2 py-1 mx-2 ${dayIndex === 6 ? 'opacity-30' : '' }`} onClick={()=>{handlePlannerIndex(dayIndex + 1)}}>›</div>
      </div>
    </div>
    <div className="border border-black mb-2">
      <div className="border-b border-black p-2">
        {plannerData.name}
      </div>
      <div className="flex flex-col grow min-h-40">
              <div className="border-b border-black p-2 text-[12px]">Breakfast</div>
              <div className="grow">
                <PlannerDrop day={dayIndex} meal={"breakfast"} meals={plannerData.breakfast} recipes={recipes} daily={true} />
              </div>
      </div>
      <div className="flex flex-col min-h-40">
              <div className="border-y border-black p-2 text-[12px]">Lunch</div>
              <div className="grow">
                <PlannerDrop day={dayIndex} meal={"lunch"} meals={plannerData.lunch} recipes={recipes} daily={true} />
              </div>
      </div>
      <div className="flex flex-col grow min-h-40">
              <div className="border-y border-black p-2 text-[12px]">Dinner</div>
              <div className="grow">
                <PlannerDrop day={dayIndex} meal={"dinner"} meals={plannerData.dinner} recipes={recipes} daily={true}/>
              </div>
      </div>
    </div>
  </div>
}

export default function Planner() {
    const [plannerClose, setPlannerClose] = useState([false, false, false, false, false, false, false])
    const [plannerIndex, setPlannerIndex] = useState(0);
    const [plannerDay, setPlannerDay] = useState(true);
    const {planner, clearPlanner} = usePlannerStore((state) => state);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
      async function getRecipe() {
        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/recipes/`
        );
        setRecipes(data.data.data);
      }

      getRecipe();
    }, [])

    const handlePlannerIndex = (newIndex: number) => {
      if (!(newIndex < 0 || newIndex > 6)) {
        setPlannerIndex(newIndex);
      }
    }
    return (
      <main className="flex min-h-screen grow">
        <RecipeSideDash />
        <div className="px-12 py-4 w-full grow flex flex-col items-center">
            <div className="flex justify-center">
              <div className="border border-black p-2 mx-1" onClick={()=>{setPlannerDay(true)}}>Daily</div>
              <div className="border border-black p-2 mx-1" onClick={()=>{setPlannerDay(false)}}>Week</div>
            </div>
          <div className="flex justify-between">
          </div>
          {
            plannerDay ? createDayPlanner(planner[plannerIndex], plannerIndex, handlePlannerIndex, recipes) : createPlanner(planner, plannerClose, setPlannerClose, clearPlanner, recipes)
          }
        </div>
      </main>
    );
  }
  
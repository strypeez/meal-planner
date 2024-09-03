'use client'

import PlannerDrop from "./components/plannerDrop";
import { usePlannerStore } from "../../providers/planner-store-provider";

import RecipeSideDash from "../components/recipeSideDash";

function createPlanner(planner) {
  return <div className="flex flex-col">
    {
      planner.map((day, index) => {
        return <div className="border border-black" key={day.id}>
          <div className="border-b border-black p-2">{day.name}</div>
          <div className="flex">
            <div className="flex flex-col grow">
              <div className="border-b border-black p-2 border-r text-[12px]">Breakfast</div>
              <div className="border-r border-black grow">
                <PlannerDrop day={index} meal={"breakfast"} meals={day.breakfast} />
              </div>
            </div>
            <div className="flex flex-col grow">
              <div className="border-b border-black p-2 border-r text-[12px]">Lunch</div>
              <div className="border-r border-black grow">
                <PlannerDrop day={index} meal={"lunch"} meals={day.lunch}/>
              </div>
            </div>
            <div className="flex flex-col grow">
              <div className="border-b border-black p-2 text-[12px]">Dinner</div>
              <div>
                <PlannerDrop day={index} meal={"dinner"} meals={day.dinner} />
              </div>
            </div>
          </div>
        </div>
})
    }
  </div>
}

export default function Planner() {
    const {planner} = usePlannerStore((state) => state);
    return (
      <main className="flex min-h-screen">
        <RecipeSideDash />
        <div className="p-12">
          <h1 className="font-bold text-[24px]">Planner</h1>
          {createPlanner(planner)}
        </div>
      </main>
    );
  }
  
'use client'

import PlannerDrop from "./components/plannerDrop";
import { usePlannerStore } from "../../providers/planner-store-provider";

function createPlanner(planner) {
  return <div className="flex flex-col">
    {
      planner.map((day, index) => {
        return <div className="border border-black" key={day.id}>
          <div className="border-b border-black p-2">{day.name}</div>
          <div className="flex">
            <div>
              <div className="border-b border-black p-3 border-r">Breakfast</div>
              <div className="border-r border-black">
                <PlannerDrop day={index} meal={"breakfast"} meals={day.breakfast} />
              </div>
            </div>
            <div>
              <div className="border-b border-black p-3 border-r">Lunch</div>
              <div className="border-r border-black">
                <PlannerDrop day={index} meal={"lunch"} meals={day.lunch}/>
              </div>
            </div>
            <div>
              <div className="border-b border-black p-3">Dinner</div>
              <div className="border-r border-black">
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
      <main className="flex min-h-screen p-10 flex-col items-center">
        <div>This is the planner page</div>
        {createPlanner(planner)}
      </main>
    );
  }
  
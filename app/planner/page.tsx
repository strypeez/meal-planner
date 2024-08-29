import { defaultPlanner } from "../defaults";

function createPlanner() {
  return <div className="flex flex-col">
    {
      defaultPlanner.map((day) => (
        <div className="border border-black" key={day.id}>
          <div className="border-b border-black p-2">{day.name}</div>
          <div className="flex">
            <div>
              <div className="border-b border-black p-3 border-r">Breakfast</div>
              <div className="p-3 border-r border-black">EMPTY</div>
            </div>
            <div>
              <div className="border-b border-black p-3 border-r">Lunch</div>
              <div className="p-3 border-r border-black">EMPTY</div>
            </div>
            <div>
              <div className="border-b border-black p-3">Dinner</div>
              <div className="p-3">EMPTY</div>
            </div>
          </div>
        </div>
      ))
    }
  </div>
}

export default function Planner() {
    return (
      <main className="flex min-h-screen pt-10 flex-col items-center">
        <div>This is the planner page</div>
        {createPlanner()}
      </main>
    );
  }
  
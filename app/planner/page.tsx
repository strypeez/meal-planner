import { defaultPlanner } from "../defaults";

function createPlanner() {
  return <div className="flex">
    {
      defaultPlanner.map((day) => (
        <div className="border border-black" key={day.id}>
          <div className="border-b border-black p-2">{day.short}</div>
          <div className="py-5 px-2">empty</div>
        </div>
      ))
    }
  </div>
}

export default function Planner() {
    return (
      <main className="flex min-h-screen flex-col items-center p-24">
        <div>This is the planner page</div>
        {createPlanner()}
      </main>
    );
  }
  
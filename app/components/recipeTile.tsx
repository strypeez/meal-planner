import { Recipe } from "../../stores/planner-store"

type RecipeTileProps = {
    recipe: Recipe
}

export function RecipeTile({recipe}: RecipeTileProps) {
    return <div className="p-5 border border-black m-4">
        {recipe.name}
    </div>
}
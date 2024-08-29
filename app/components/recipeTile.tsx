import { Recipe } from "../../stores/planner-store"

import { useDrag } from "react-dnd"
import { ItemTypes } from "../layout"

type RecipeTileProps = {
    recipe: Recipe
}

export function RecipeTile({recipe}: RecipeTileProps) {
    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.RECIPE,
        item: {
            name: recipe.name
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))
    return <div ref={drag} 
        style={{opacity: isDragging ? 0.5 : 1, }} 
        className="p-5 border border-black m-4">
        {recipe.name}
    </div>
}
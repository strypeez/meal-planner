/* eslint-disable @next/next/no-img-element */
import { Recipe } from "../../stores/planner-store"

import { useDrag } from "react-dnd"
import { ItemTypes } from "../../stores/planner-store"

type RecipeTileProps = {
    recipe: Recipe
}

export function RecipeTile({recipe}: RecipeTileProps) {
    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.RECIPE,
        item: {
            slug: recipe.slug
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    // @ts-ignore: reactdnd no typescript
    return <div ref={drag} 
        style={{opacity: isDragging ? 0.5 : 1, }} 
        className="border border-black m-4 w-36 h-36">
        <div className="max-h-24 h-24">
            <img className="h-full w-full" alt={`${recipe.name}-tile-image`} src={recipe.image}/>
        </div>
        <div className="p-2 border-t border-black">
        {recipe.name}
        </div>
    </div>
}
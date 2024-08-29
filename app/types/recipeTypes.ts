type Recipe = {
    id: string
    name: string
    servings: number
    ingredients: Ingredient[]
}

type Ingredient = {
    id: string
    name: string
    quantity: {
        number: number
        measurement: string
    }
    isList: boolean
}
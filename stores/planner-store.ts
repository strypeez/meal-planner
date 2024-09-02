import { createStore } from 'zustand/vanilla'
import { defaultRecipes, defaultPlanner } from '../app/defaults'

export type Recipe = {
    id: string
    name: string
    servings: number
    ingredients: Ingredient[]
}

type TValue = string | Recipe[];

export type Day = {
    [key: string]: string | Recipe[];
    'id': string
    'name': string
    'short': string
    'breakfast': Recipe[]
    'lunch': Recipe[]
    'dinner': Recipe[]
}

export type PlannerState = {
    recipes: { [key: string]: Recipe}
    planner: Day[]
  }

export type PlannerActions = {
  showRecipes: () => void
  getRecipe: (id:string) => Recipe
  addRecipe: (recipe: Recipe) => void
  addMeal: (day: number, meal: string, recipe: Recipe) => void
}

export type PlannerStore = PlannerState & PlannerActions

export const defaultInitState: PlannerState = {
  recipes: defaultRecipes,
  planner: defaultPlanner
}

export const createPlannerStore = (
  initState: PlannerState = defaultInitState,
) => {
  return createStore<PlannerStore>()((set, get) => ({
    ...initState,
    showRecipes: () => set((state) => ({ ...state, recipes: state.recipes })),
    getRecipe:(id:string) => get().recipes[id],
    addRecipe: (recipe: Recipe) => set((state) => ({...state, recipes: {
      ...state.recipes,
      [recipe.id]: recipe
    }})),
    addMeal:(day: number, meal: string, recipe: Recipe) => set((state) => ({
        ...state,
        planner: state.planner.map((sDay, index: number) => {
            if (index !== day) return sDay
            return {
                ...sDay,
                [meal]: [...sDay[meal] as Recipe[], recipe]
            }
        } )
    })),
  }))
}
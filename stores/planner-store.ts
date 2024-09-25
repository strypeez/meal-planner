import { createStore } from 'zustand/vanilla'
import { defaultRecipes, defaultPlanner } from '../app/defaults'
import { Ingredient } from '../app/types/recipeTypes'
import { staticGenerationAsyncStorage } from 'next/dist/client/components/static-generation-async-storage-instance'


export const ItemTypes = {
  RECIPE: 'recipe'
}

export type Recipe = {
    id: string
    name: string
    servings: number
    image: string
    ingredients: Ingredient[]
    slug: string
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
  clearPlanner: () => void
  getRecipe: (id:string) => Recipe
  addRecipe: (recipe: Recipe) => void
  editRecipe: (slug: string, recipe: Recipe) => void
  removeMeal: (day: number, meal: string, mIndex: number) => void
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
    clearPlanner: () => set((state) => ({...state, planner: defaultPlanner})),
    getRecipe:(id:string) => get().recipes[id],
    editRecipe: (slug: string, recipe: Recipe) => set((state) => ({
      ...state,
      recipes: {
        ...state.recipes,
        [slug]: recipe,
      }
    })),
    addRecipe: (recipe: Recipe) => set((state) => ({...state, recipes: {
      ...state.recipes,
      [recipe.slug]: recipe
    }})),
    removeMeal:(day: number, meal: string, mIndex: number) => set((state) => ({
        ...state,
        planner: state.planner.map((sDay, index: number) => {
            if (index !== day) return sDay
            return {
                ...sDay,
                [meal]: (sDay[meal] as Recipe[]).filter(( meal ,index) => { return index !== mIndex})
            }
        } )
    })),
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
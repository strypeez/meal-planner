import { createStore } from 'zustand/vanilla'
import { defaultRecipes } from '../app/defaults'

export type Recipe = {
    id: string
    name: string
    servings: number
    ingredients: Ingredient[]
}

export type PlannerState = {
    recipes: Recipe[]
  }

export type PlannerActions = {
  showRecipes: () => void
}

export type PlannerStore = PlannerState & PlannerActions

export const defaultInitState: PlannerState = {
  recipes: defaultRecipes
}

export const createPlannerStore = (
  initState: PlannerState = defaultInitState,
) => {
  return createStore<PlannerStore>()((set) => ({
    ...initState,
    showRecipes: () => set((state) => ({ recipes: state.recipes })),
  }))
}
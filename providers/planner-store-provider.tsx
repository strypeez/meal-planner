'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type PlannerStore, createPlannerStore } from '../stores/planner-store'

export type PlannerStoreApi = ReturnType<typeof createPlannerStore>

export const PlannerStoreContext = createContext<PlannerStoreApi | undefined>(
    undefined,
  )

export interface PlannerStoreProviderProps {
    children: ReactNode
  }

export const PlannerStoreProvider = ({
    children,
  }: PlannerStoreProviderProps) => {
    const storeRef = useRef<PlannerStoreApi>()
    if (!storeRef.current) {
      storeRef.current = createPlannerStore()
    }
  
    return (
      <PlannerStoreContext.Provider value={storeRef.current}>
        {children}
      </PlannerStoreContext.Provider>
    )
  }
  
export const usePlannerStore = <T,>(
    selector: (store: PlannerStore) => T,
  ): T => {
    const plannerStoreContext = useContext(PlannerStoreContext)
  
    if (!plannerStoreContext) {
      throw new Error(`useCounterStore must be used within CounterStoreProvider`)
    }
  
    return useStore(plannerStoreContext, selector)
  }
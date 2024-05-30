import { BaseState } from "../store.model"

export interface ProductFilters {
  search: string
  startDate: string 
  endDate: string
}

export type ColorState = BaseState<ProductFilters | undefined>
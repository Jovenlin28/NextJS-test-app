import { RootState } from '../store'

export const selectFilters = (state: RootState) => state.productFilters.data

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductFilters } from './filters.model'

// Define the initial state using that type
const initialState: {data: ProductFilters} = {
  data: {
    search: '',
    startDate: '',
    endDate: ''
  }
}

export const filtersSlice = createSlice({
  name: 'filters',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setFilters: (state, action: PayloadAction<ProductFilters>) => {
      state.data = action.payload
    }
  }
})

export const { setFilters } = filtersSlice.actions


export default filtersSlice.reducer
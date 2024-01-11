import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   category: 0,
   sort: {
      name: 'Name',
      sortProperty: 'title'
   }
}

const homeSlice = createSlice({
   name: 'home',
   initialState,
   reducers: {
      setCategory(state, action) {
         state.category = action.payload
      },
      setSort(state, action) {
         state.sort = action.payload
      }
   }
})

export const { setCategory, setSort } = homeSlice.actions
export default homeSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   searchValue: ''
}

const headerSlice = createSlice({
   name: 'header',
   initialState,
   reducers: {
      setSearchValue(state, action) {
         state.searchValue = action.payload
      }
   }
})

export const { setSearchValue } = headerSlice.actions
export default headerSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type headerSliceState = {
   searchValue?: string
}

const initialState: headerSliceState = {
   searchValue: ''
}

const headerSlice = createSlice({
   name: 'header',
   initialState,
   reducers: {
      setSearchValue(state, action: PayloadAction<string>) {
         state.searchValue = action.payload
      }
   }
})

export const { setSearchValue } = headerSlice.actions
export default headerSlice.reducer

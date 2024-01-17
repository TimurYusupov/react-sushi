import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
   sushiData: [],
   category: 0,
   sort: {
      name: 'Name',
      sortProperty: 'title'
   },
   currentPage: 1
}

export const fetchSushi = createAsyncThunk('homeSlice/fetchSushi', async (params) => {
   const { sortParam, categoryParam, searchParam } = params
   const res = await fetch(
      `https://518e0d814bf9a511.mokky.dev/items?${sortParam}${categoryParam}${searchParam}`
   )
   const data = await res.json()
   return data
})

const homeSlice = createSlice({
   name: 'home',
   initialState,
   reducers: {
      setCategory(state, action) {
         state.category = action.payload
      },
      setSort(state, action) {
         state.sort = action.payload
      },
      setCurrentPage(state, action) {
         state.currentPage = action.payload
      }
   },
   extraReducers: (builder) => {
      /* builder.addCase(fetchPizzas.pending, (state) => {
         state.status = Status.LOADING
         state.items = []
      }) */
      builder.addCase(fetchSushi.fulfilled, (state, action) => {
         // state.status = Status.SUCCESS
         state.sushiData = action.payload
      })
      builder.addCase(fetchSushi.rejected, (state) => {
         // state.status = Status.ERROR
         state.sushiData = []
      })
   }
})

export const { setCategory, setSort, setCurrentPage } = homeSlice.actions
export default homeSlice.reducer

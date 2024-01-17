import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
   sushiData: [],
   status: 'loading',
   category: 0,
   sort: {
      name: 'Name',
      sortProperty: 'title'
   },
   currentPage: 1,
   itemsPerPage: 9,
   totalPages: 0
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
      builder.addCase(fetchSushi.pending, (state) => {
         state.status = 'loading'
         state.sushiData = []
      })
      builder.addCase(fetchSushi.fulfilled, (state, action) => {
         state.status = 'success'
         state.sushiData = action.payload
         state.totalPages = Math.ceil(action.payload.length / state.itemsPerPage)
      })
      builder.addCase(fetchSushi.rejected, (state) => {
         state.status = 'error'
         state.sushiData = []
      })
   }
})

export const { setCategory, setSort, setCurrentPage } = homeSlice.actions
export default homeSlice.reducer

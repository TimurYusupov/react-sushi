import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export type TSushiData = {
   id: number
   title: string
   description: string
   category: number
   ingredients: string[]
   price: number
   count: number
   img: string
   portionSize: number
   vegan: boolean
   spicy: boolean
}

export type TSort = {
   name: string
   sortProperty: string
}

export type THomeSliceState = {
   sushiData: TSushiData[]
   status: string
   category: number
   sort: TSort
   currentPage: number
   itemsPerPage: number
   totalPages: number
}

export type TFetchSushiArgs = {
   sortParam: string
   categoryParam: string
   searchParam: string
}

const initialState: THomeSliceState = {
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

export const fetchSushi = createAsyncThunk(
   'homeSlice/fetchSushi',
   async (params: TFetchSushiArgs) => {
      const { sortParam, categoryParam, searchParam } = params
      const res = await fetch(
         `https://518e0d814bf9a511.mokky.dev/items?${sortParam}${categoryParam}${searchParam}`
      )
      const data = await res.json()
      return data
   }
)

const homeSlice = createSlice({
   name: 'home',
   initialState,
   reducers: {
      setCategory(state, action: PayloadAction<number>) {
         state.category = action.payload
      },
      setSort(state, action: PayloadAction<TSort>) {
         state.sort = action.payload
      },
      setCurrentPage(state, action: PayloadAction<number>) {
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

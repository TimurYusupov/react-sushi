import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export type TCartItems = {
   title: string
   img: string
   price: number
   count: number
   id: number
}

type TCartSliceState = {
   cartItems: TCartItems[]
   totalPrice: number
   status: string
}

const initialState: TCartSliceState = {
   cartItems: [],
   totalPrice: 0,
   status: 'loading'
}

export const fetchCartItems = createAsyncThunk('homeSlice/fetchCartItems', async () => {
   const res = await fetch('https://518e0d814bf9a511.mokky.dev/cartItems')
   const data = await res.json()
   return data
})

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchCartItems.pending, (state) => {
         state.status = 'loading'
         state.cartItems = []
      })
      builder.addCase(fetchCartItems.fulfilled, (state, action) => {
         state.status = 'success'
         state.cartItems = action.payload
      })
      builder.addCase(fetchCartItems.rejected, (state) => {
         state.status = 'error'
         state.cartItems = []
      })
   }
})

export const {} = cartSlice.actions
export default cartSlice.reducer

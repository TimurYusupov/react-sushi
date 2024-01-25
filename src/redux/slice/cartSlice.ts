import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   cartItems: [],
   totalPrice: 0
}

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {}
})

export const {} = cartSlice.actions
export default cartSlice.reducer

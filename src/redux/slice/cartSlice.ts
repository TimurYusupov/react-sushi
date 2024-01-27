import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type TCartItem = {
   id: number
   title: string
   img: string
   price: number
   count: number
}

type TCartSliceState = {
   cartItems: TCartItem[]
   totalPrice: number
   status: string
}

const initialState: TCartSliceState = {
   cartItems: [],
   totalPrice: 0,
   status: 'loading'
}

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addToCart(state, action: PayloadAction<TCartItem>) {
         const foundItem = state.cartItems.find((item) => item.id === action.payload.id)

         if (foundItem) {
            foundItem.count++
         } else {
            state.cartItems.push({
               ...action.payload,
               count: 1
            })
         }
      }
   }
})

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer

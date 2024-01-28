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
      addItem(state, action: PayloadAction<TCartItem>) {
         const foundItem = state.cartItems.find((item) => item.id === action.payload.id)

         if (foundItem) {
            foundItem.count++
         } else {
            state.cartItems.push({
               ...action.payload,
               count: 1
            })
         }
      },
      minusItem(state, action: PayloadAction<number>) {
         const foundItem = state.cartItems.find((item) => item.id === action.payload)

         if (foundItem) {
            if (foundItem.count > 1) {
               foundItem.count--
            } else {
               state.cartItems = state.cartItems.filter(
                  (item) => item.id !== action.payload
               )
            }
         }
      },
      removeItem(state, action: PayloadAction<number>) {
         state.cartItems = state.cartItems.filter((item) => item.id !== action.payload)
      },
      clearItems(state) {
         state.cartItems = []
      }
   }
})

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions
export default cartSlice.reducer

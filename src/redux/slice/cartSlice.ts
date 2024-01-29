import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { calcTotalPrice } from '../../utils/calcTotalPrice'
import { calcTotalCount } from '../../utils/calcTotalCount'

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
   totalCount: number
   status: string
}

const initialState: TCartSliceState = {
   cartItems: [],
   totalPrice: Number(localStorage.getItem('totalPrice')) || 0,
   totalCount: Number(localStorage.getItem('totalCount')) || 0,
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

         state.totalPrice = calcTotalPrice(state.cartItems)
         state.totalCount = calcTotalCount(state.cartItems)

         localStorage.setItem('totalPrice', state.totalPrice.toString())
         localStorage.setItem('totalCount', state.totalCount.toString())
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

         state.totalPrice = calcTotalPrice(state.cartItems)
         state.totalCount = calcTotalCount(state.cartItems)

         localStorage.setItem('totalPrice', state.totalPrice.toString())
         localStorage.setItem('totalCount', state.totalCount.toString())
      },
      removeItem(state, action: PayloadAction<number>) {
         state.cartItems = state.cartItems.filter((item) => item.id !== action.payload)

         state.totalPrice = calcTotalPrice(state.cartItems)
         state.totalCount = calcTotalCount(state.cartItems)

         localStorage.setItem('totalPrice', state.totalPrice.toString())
         localStorage.setItem('totalCount', state.totalCount.toString())
      },
      clearItems(state) {
         state.cartItems = []

         state.totalPrice = 0
         state.totalCount = 0

         localStorage.setItem('totalPrice', state.totalPrice.toString())
         localStorage.setItem('totalCount', state.totalCount.toString())
      }
   }
})

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions
export default cartSlice.reducer

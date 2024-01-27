import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import headerSlice from './slice/headerSlice'
import homeSlice from './slice/homeSlice'
import cartSlice from './slice/cartSlice'

export const store = configureStore({
   reducer: {
      headerSlice,
      homeSlice,
      cartSlice
   }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import headerSlice from './slice/headerSlice'
import homeSlice from './slice/homeSlice'

export const store = configureStore({
   reducer: {
      headerSlice,
      homeSlice
   }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

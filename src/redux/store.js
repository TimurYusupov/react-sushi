import { configureStore } from '@reduxjs/toolkit'

import headerSlice from './slice/headerSlice'
import homeSlice from './slice/homeSlice'

export const store = configureStore({
   reducer: {
      headerSlice,
      homeSlice
   }
})

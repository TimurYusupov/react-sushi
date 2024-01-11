import { configureStore } from '@reduxjs/toolkit'

import headerSlice from './slice/headerSlice'

export const store = configureStore({
   reducer: {
      headerSlice
   }
})

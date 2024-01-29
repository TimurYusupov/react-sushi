import { TCartSliceState } from '../redux/slice/cartSlice'

export const saveToLocalStorage = (state: TCartSliceState) => {
   localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
   localStorage.setItem('totalPrice', state.totalPrice.toString())
   localStorage.setItem('totalCount', state.totalCount.toString())
}

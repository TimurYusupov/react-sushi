import { TCartItem } from '../redux/slice/cartSlice'

export const calcTotalPrice = (items: TCartItem[]): number => {
   return items.reduce((sum, obj) => sum + obj.count * obj.price, 0)
}

import { TCartItem } from '../redux/slice/cartSlice'

export const calcTotalCount = (items: TCartItem[]): number => {
   return items.reduce((sum, obj) => sum + obj.count, 0)
}

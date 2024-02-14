import { Link } from 'react-router-dom'
import { TCartItem, addItem, minusItem } from '../../redux/slice/cartSlice'
import { RootState, useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import AddBtn from '../Buttons/AddBtn/AddBtn'

import styles from './SushiCard.module.scss'

type TSushiCardProps = {
   id: number
   title: string
   price: number
   img: string
   portionSize: number
   vegan: boolean
   spicy: boolean
}

const SushiCard: React.FC<TSushiCardProps> = ({
   id,
   title,
   price,
   img,
   portionSize,
   vegan,
   spicy
}) => {
   const dispatch = useAppDispatch()
   const { cartItems } = useSelector((state: RootState) => state.cartSlice)

   const cartItem = cartItems.find((item) => item.id === id)

   const addItemToCart = () => {
      const item: TCartItem = {
         id,
         title,
         img,
         price,
         count: 0
      }

      dispatch(addItem(item))

      toast.success(
         <span>
            <strong>{title.toUpperCase()}</strong> added into cart
         </span>
      )
   }

   const increaseCount = () => {
      const item: TCartItem = {
         id,
         title,
         img,
         price,
         count: 0
      }

      dispatch(addItem(item))
   }

   const decreaseCount = () => {
      dispatch(minusItem(id))
   }

   return (
      <article className={styles.sushiCard}>
         <Link to={`/item/${id}`}>
            <img src={img} alt={title} />
         </Link>

         <div className={styles.rightSide}>
            <div className={styles.info}>
               <Link to={`/item/${id}`}>
                  <h3 className={styles.name}>{title}</h3>
               </Link>
               <p className={styles.price}>EUR {price.toFixed(2)}</p>
               {portionSize > 0 && <p className={styles.portion}>{portionSize} pcs</p>}
               {vegan && <p className={styles.vegan}>vegan</p>}
               {spicy && <p className={styles.spicy}>spicy</p>}
            </div>
            <div className={styles.btnWrapper}>
               <AddBtn
                  countBtnPadding="5px 9px"
                  countTextSize="20px"
                  textContent={'Add'}
                  cartItem={cartItem}
                  addItemToCart={addItemToCart}
                  increaseCount={increaseCount}
                  decreaseCount={decreaseCount}
               />
            </div>
         </div>
      </article>
   )
}

export default SushiCard

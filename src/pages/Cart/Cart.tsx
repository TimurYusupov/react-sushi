import { RootState, useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import { clearItems } from '../../redux/slice/cartSlice'
import { ToastContainer } from 'react-toastify'

import CartItem from '../../components/CartItem/CartItem'
import CartEmpty from '../../components/CartEmpty/CartEmpty'

import styles from './Cart.module.scss'
import 'react-toastify/dist/ReactToastify.css'

import GoBackBtn from '../../components/Buttons/GoBackBtn/GoBackBtn'

const Cart: React.FC = () => {
   const dispatch = useAppDispatch()

   const { cartItems, totalPrice, totalCount } = useSelector(
      (state: RootState) => state.cartSlice
   )

   const cleanCart = () => {
      dispatch(clearItems())
   }

   if (!cartItems.length) {
      return (
         <div>
            <ToastContainer autoClose={1000} />
            <CartEmpty />
         </div>
      )
   }

   return (
      <div className="container">
         <ToastContainer autoClose={1000} />
         <section className={styles.cart}>
            <div className={styles.cartTop}>
               <h1>
                  <img src="/img/cart/shopping-cart.png" alt="Cart" />
                  Cart
               </h1>
               <div className={styles.cartClear} onClick={cleanCart}>
                  <svg
                     width="20"
                     height="20"
                     viewBox="0 0 20 20"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        d="M2.5 5H4.16667H17.5"
                        stroke="#B6B6B6"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                     <path
                        d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z"
                        stroke="#B6B6B6"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                     <path
                        d="M8.33337 9.16667V14.1667"
                        stroke="#B6B6B6"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                     <path
                        d="M11.6666 9.16667V14.1667"
                        stroke="#B6B6B6"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </svg>
                  <span>Clean the cart</span>
               </div>
            </div>

            <div className={styles.cartItems}>
               {cartItems.map((item) => (
                  <CartItem key={item.id} {...item} />
               ))}
            </div>

            <div className={styles.cartBottom}>
               <div className={styles.cartBottomDetails}>
                  <span>
                     Total Sushi: <b>{totalCount} pcs.</b>
                  </span>
                  <span>
                     Order Price: <b className="orange">{totalPrice.toFixed(2)} €</b>
                  </span>
               </div>
            </div>

            <div className={styles.cartBottomButtons}>
               <GoBackBtn
                  backgroundColor="#232323"
                  padding="11px"
                  width="140px"
                  fontSize="16px"
                  fontWeight="600"
                  textTransform="none"
                  borderRadius="30px"
               />
               <button className={`button ${styles.payBtn}`}>Order now</button>
            </div>
         </section>
      </div>
   )
}

export default Cart

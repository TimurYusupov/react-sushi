import { Link } from 'react-router-dom'

import styles from './CartEmpty.module.scss'

const CartEmpty: React.FC = () => {
   return (
      <div className={styles.emptyCart}>
         <h2>
            The cart is empty <span>😕</span>
         </h2>
         <p>
            Most likely, you haven't ordered sushi yet.
            <br />
            To order sushi, please go to the main page
         </p>
         <img src="/img/cart/empty-cart.png" alt="Empty cart" />
         <Link to="/" className={`${styles.cartEmptyBtn} ${styles.goBackBtn}`}>
            <svg
               width="8"
               height="14"
               viewBox="0 0 8 14"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  d="M7 13L1 6.93015L6.86175 1"
                  stroke="#D3D3D3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
               />
            </svg>
            <span>Go back</span>
         </Link>
      </div>
   )
}

export default CartEmpty

import { Link } from 'react-router-dom'

import GoBackBtn from '../Buttons/GoBackBtn/GoBackBtn'

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
         <GoBackBtn
            backgroundColor="#232323"
            padding="16px"
            width="210px"
            fontSize="16px"
            fontWeight="600"
            textTransform="none"
            borderRadius="30px"
         />
      </div>
   )
}

export default CartEmpty

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RootState, useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import { TCartItem, addItem } from '../../redux/slice/cartSlice'

import { ToastContainer, toast } from 'react-toastify'

import styles from './Details.module.scss'

type TDetails = {
   id: number
   img: string
   title: string
   description: string
   price: number
   portionSize: number
   vegan: boolean
   spicy: boolean
}

const SushiDetails: React.FC = () => {
   const { id } = useParams()

   const dispatch = useAppDispatch()

   const [data, setData] = useState<TDetails | null>(null)
   const { cartItems } = useSelector((state: RootState) => state.cartSlice)

   const cartItem = cartItems.find((item) => item.id === Number(id))

   useEffect(() => {
      const fetchDetails = async () => {
         try {
            const response = await fetch(`https://518e0d814bf9a511.mokky.dev/items/${id}`)
            const json = await response.json()
            setData(json)
         } catch (err) {
            console.log('Error during sushi details fetching')
         }
      }

      fetchDetails()
   }, [id])

   const addItemToCart = () => {
      if (data) {
         const item: TCartItem = {
            id: data.id,
            title: data.title,
            img: data.img,
            price: data.price,
            count: 0
         }

         dispatch(addItem(item))

         toast.success(
            <span>
               <strong>{data.title.toUpperCase()}</strong> added into cart
            </span>
         )
      } else {
         toast.error(<span>Could not add into cart</span>)
      }
   }

   if (!data) {
      return (
         <div className={styles.spinnerContainer}>
            <img className={styles.spinner} src="/img/spinner.svg" alt="Spinner" />
         </div>
      )
   }

   return (
      <>
         <ToastContainer autoClose={1000} />

         <section className={styles.details}>
            <div className={styles.detailsImage}>
               <img src={data.img} alt={data.title} />
            </div>

            <div className={styles.detailsInfo}>
               <h2>{data.title}</h2>
               {data.portionSize > 0 && (
                  <p className={styles.portion}>{data.portionSize} pcs</p>
               )}
               {data.vegan && <p className={styles.vegan}>vegan</p>}
               {data.spicy && <p className={styles.spicy}>spicy</p>}
               <p className={styles.description}>{data.description}</p>
               <h3>EUR {data.price.toFixed(2)}</h3>
               <button className={`button ${styles.btn}`} onClick={addItemToCart}>
                  <svg
                     width="12"
                     height="12"
                     viewBox="0 0 12 12"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                        fill="white"
                     />
                  </svg>
                  Order
                  {cartItem && cartItem.count > 0 && (
                     <span className={styles.sushiCount}>{cartItem.count}</span>
                  )}
               </button>
            </div>
         </section>
      </>
   )
}

export default SushiDetails

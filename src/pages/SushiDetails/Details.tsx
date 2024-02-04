import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RootState, useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import { TCartItem, addItem } from '../../redux/slice/cartSlice'

import { ToastContainer, toast } from 'react-toastify'

import styles from './Details.module.scss'

type TDetails = {
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

   const { sushiData } = useSelector((state: RootState) => state.homeSlice)
   const { cartItems } = useSelector((state: RootState) => state.cartSlice)

   const cartItem = cartItems.find((item) => item.id === Number(id))

   const [data, setData] = useState<TDetails | null>(null)

   /* const addItemToCart = () => {
      if (sushiItem) {
         const item: TCartItem = {
            id: sushiItem.id,
            title: sushiItem.title,
            img: sushiItem.img,
            price: sushiItem.price,
            count: 0
         }

         dispatch(addItem(item))

         toast.success(
            <span>
               <strong>{sushiItem.title.toUpperCase()}</strong> added into cart
            </span>
         )
      } else {
         console.log('Nothing ...')
      }
   } */

   const fetchDetails = async () => {
      try {
         const response = await fetch(`https://518e0d814bf9a511.mokky.dev/items/${id}`)
         const json = await response.json()
         setData(json)
      } catch (err) {
         console.log('Error during sushi details fetching')
      }
   }

   const addItemToCart = async () => {
      if (!data) {
         // Data is not available yet, fetch and try again
         await fetchDetails()
      }

      const sushiItem = sushiData.find((item) => item.id === Number(id))
      console.log(sushiItem)

      if (sushiItem) {
         const item: TCartItem = {
            id: sushiItem.id,
            title: sushiItem.title,
            img: sushiItem.img,
            price: sushiItem.price,
            count: 0
         }

         dispatch(addItem(item))

         toast.success(
            <span>
               <strong>{sushiItem.title.toUpperCase()}</strong> added into cart
            </span>
         )
      } else {
         console.log('Nothing ...')
      }
   }

   useEffect(() => {
      /* const fetchDetails = async () => {
         try {
            const response = await fetch(`https://518e0d814bf9a511.mokky.dev/items/${id}`)
            const data = await response.json()
            setData(data)
         } catch (err) {
            console.log('Error during sushi details fetching')
         }
      } */

      fetchDetails()
   }, [])

   if (!data) {
      return <h1>Loading...</h1>
   }

   return (
      <section className={styles.details}>
         <ToastContainer autoClose={1000} />

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
         </div>

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
      </section>
   )
}

export default SushiDetails

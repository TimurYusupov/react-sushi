import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RootState, useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import { TCartItem, addItem, minusItem } from '../../redux/slice/cartSlice'

import { ToastContainer, toast } from 'react-toastify'

import GoBackBtn from '../../components/Buttons/GoBackBtn/GoBackBtn'
import AddBtn from '../../components/Buttons/AddBtn/AddBtn'

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

   const increaseCount = () => {
      if (data) {
         const item: TCartItem = {
            id: data.id,
            title: data.title,
            img: data.img,
            price: data.price,
            count: 0
         }

         dispatch(addItem(item))
      }
   }

   const decreaseCount = () => {
      if (data) {
         dispatch(minusItem(data.id))
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
               <AddBtn
                  id={data.id}
                  cartItem={cartItem}
                  addItemToCart={addItemToCart}
                  increaseCount={increaseCount}
                  decreaseCount={decreaseCount}
               />
            </div>
         </section>

         <div className={styles.backBtn}>
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
      </>
   )
}

export default SushiDetails

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import styles from './Details.module.scss'

type TDetails = {
   img: string
   title: string
   description: string
   price: number
}

const SushiDetails: React.FC = () => {
   const { id } = useParams()
   const [data, setData] = useState<TDetails>({
      img: '',
      title: '',
      description: '',
      price: 0
   })

   useEffect(() => {
      const fetchDetails = async () => {
         try {
            const response = await fetch(`https://518e0d814bf9a511.mokky.dev/items/${id}`)
            const data = await response.json()
            setData(data)
         } catch (err) {
            console.log('Error during sushi details fetching')
         }
      }

      fetchDetails()
   }, [id])

   return (
      <section className={styles}>
         <div className="container">
            <img src={data.img} alt={data.title} />
            <h2>{data.title}</h2>
            <p>{data.description}</p>
            <h3>{data.price.toFixed(2)} €</h3>
         </div>
      </section>
   )
}

export default SushiDetails

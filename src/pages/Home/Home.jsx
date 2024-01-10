import { useEffect, useState } from 'react'

import Categories from '../../components/Categories/Categories'
import Sort from '../../components/Sort/Sort'
import SushiCard from '../../components/SushiCard/SushiCard'

import styles from './Home.module.scss'

const Home = () => {
   const [allSushi, setAllSushi] = useState([])
   const [category, setCategory] = useState(0)
   const [isPopupOpened, setIsPopupOpened] = useState(false)
   const [rotateArrow, setRotateArrow] = useState(false)
   const [sort, setSort] = useState({
      name: 'Name',
      sortProperty: 'title'
   })

   const sortParam = `sortBy=${sort.sortProperty}`
   const categoryParam = `${category > 0 ? `&category=${category}` : ''}`

   const addSushi = (id) => {
      setAllSushi((prev) =>
         prev.map((item) => (item.id === id ? { ...item, count: item.count + 1 } : item))
      )
   }

   useEffect(() => {
      const fetchAllSushi = async () => {
         const res = await fetch(
            `https://518e0d814bf9a511.mokky.dev/items?${sortParam}${categoryParam}`
         )
         const data = await res.json()
         setAllSushi(data)
      }
      fetchAllSushi()
   }, [sortParam, categoryParam])

   return (
      <div className="container">
         <section className={styles.categoriesSort}>
            <Categories category={category} setCategory={setCategory} />
            <Sort
               isPopupOpened={isPopupOpened}
               setIsPopupOpened={setIsPopupOpened}
               rotateArrow={rotateArrow}
               setRotateArrow={setRotateArrow}
               sort={sort}
               setSort={setSort}
            />
         </section>

         <section className={styles.items}>
            <h1>All:</h1>
            <div className={styles.sushiItems}>
               {allSushi.map((item) => (
                  <SushiCard addSushi={addSushi} key={item.id} {...item} />
               ))}
            </div>
         </section>
      </div>
   )
}

export default Home

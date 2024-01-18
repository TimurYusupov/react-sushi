import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
   fetchSushi,
   setCategory,
   setCurrentPage,
   setSort
} from '../../redux/slice/homeSlice'

import Categories from '../../components/Categories/Categories'
import Sort from '../../components/Sort/Sort'
import SushiCard from '../../components/SushiCard/SushiCard'

import styles from './Home.module.scss'
import Pagination from '../../components/Pagination/Pagination'
import Skeleton from '../../components/SushiCard/Skeleton/Skeleton'

const Home = () => {
   const dispatch = useDispatch()
   const { searchValue } = useSelector((state) => state.headerSlice)
   const { sushiData, category, sort, currentPage, itemsPerPage, totalPages, status } =
      useSelector((state) => state.homeSlice)

   const [isPopupOpened, setIsPopupOpened] = useState(false)
   const [rotateArrow, setRotateArrow] = useState(false)

   const startIndex = (currentPage - 1) * itemsPerPage
   const endIndex = startIndex + itemsPerPage
   const slicedSushi = sushiData ? sushiData.slice(startIndex, endIndex) : []

   const sortParam = `sortBy=${sort.sortProperty}`
   const categoryParam = `${category > 0 ? `&category=${category}` : ''}`
   const searchParam = `${searchValue ? `&title=*${searchValue}*` : ''}`

   const categoriesList = ['All', 'Single', 'Maki', 'Rolls', 'Bento', 'Plates']

   const sushiBlocks = slicedSushi.map((item) => <SushiCard key={item.id} {...item} />)
   const skeletons = Array(6).fill(<Skeleton />)

   const selectCategory = (c) => {
      dispatch(setCategory(c))
      dispatch(setCurrentPage(1))
   }

   const changeSort = (sortObj) => {
      dispatch(setSort(sortObj))
   }

   useEffect(() => {
      dispatch(fetchSushi({ sortParam, categoryParam, searchParam }))

      window.scrollTo(0, 0)
   }, [dispatch, sortParam, categoryParam, searchParam])

   return (
      <div className="container">
         <section className={styles.categoriesSort}>
            <Categories
               category={category}
               selectCategory={selectCategory}
               categoriesList={categoriesList}
            />
            <Sort
               isPopupOpened={isPopupOpened}
               setIsPopupOpened={setIsPopupOpened}
               rotateArrow={rotateArrow}
               setRotateArrow={setRotateArrow}
               sort={sort}
               changeSort={changeSort}
            />
         </section>

         <section className={styles.items}>
            <h1>{categoriesList[category]}:</h1>

            {status === 'error' ? (
               <div className={styles.errorInfo}>
                  <h2>An error occurred 😕</h2>
                  <p>
                     Unfortunately, we couldn't fetch the sushis. Please try again later.
                  </p>
               </div>
            ) : status === 'loading' ? (
               <div className={styles.sushiItems}>
                  {skeletons.map((skeleton, i) => (
                     <div key={i}>{skeleton}</div>
                  ))}
               </div>
            ) : sushiData.length === 0 ? (
               <p className={styles.itemsNotFound}>Nothing found 😕</p>
            ) : (
               <div className={styles.sushiItems}>{sushiBlocks}</div>
            )}
         </section>

         <section className="pagination">
            {sushiData.length !== 0 && <Pagination totalPages={totalPages} />}
         </section>
      </div>
   )
}

export default Home

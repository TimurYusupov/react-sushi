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

const Home = () => {
   const dispatch = useDispatch()
   const { searchValue } = useSelector((state) => state.headerSlice)
   const { sushiData, category, sort, currentPage } = useSelector(
      (state) => state.homeSlice
   )

   const [totalPages, setTotalPages] = useState(0)
   const [isPopupOpened, setIsPopupOpened] = useState(false)
   const [rotateArrow, setRotateArrow] = useState(false)

   const itemsPerPage = 9
   const startIndex = (currentPage - 1) * itemsPerPage
   const endIndex = startIndex + itemsPerPage
   const slicedSushi = sushiData ? sushiData.slice(startIndex, endIndex) : []

   const sortParam = `sortBy=${sort.sortProperty}`
   const categoryParam = `${category > 0 ? `&category=${category}` : ''}`
   const searchParam = `${searchValue ? `&title=*${searchValue}*` : ''}`

   const categoriesList = ['All', 'Single', 'Maki', 'Rolls', 'Bento', 'Plates']
   const sushiBlocks = slicedSushi.map((item) => <SushiCard key={item.id} {...item} />)

   const selectCategory = (c) => {
      dispatch(setCategory(c))
      dispatch(setCurrentPage(1))
   }

   const changeSort = (sortObj) => {
      dispatch(setSort(sortObj))
   }

   const selectCurrentPage = (page) => {
      dispatch(setCurrentPage(page))
   }

   useEffect(() => {
      dispatch(fetchSushi({ sortParam, categoryParam, searchParam }))

      setTotalPages(Math.ceil(sushiData.length / itemsPerPage))

      window.scrollTo(0, 0)
   }, [dispatch, sortParam, categoryParam, searchParam, sushiData.length])

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
            <div className={styles.sushiItems}>
               {sushiData.length === 0 ? 'Loading...' : sushiBlocks}
            </div>
         </section>

         <section className="pagination">
            <Pagination
               currentPage={currentPage}
               selectCurrentPage={selectCurrentPage}
               totalPages={totalPages}
            />
         </section>
      </div>
   )
}

export default Home

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import {
   TSushiData,
   fetchSushi,
   setCategory,
   setCurrentPage,
   setSort
} from '../../redux/slice/homeSlice'

import Categories from '../../components/Categories/Categories'
import Sort from '../../components/Sort/Sort'
import SushiCard from '../../components/SushiCard/SushiCard'
import Pagination from '../../components/Pagination/Pagination'
import Skeleton from '../../components/SushiCard/Skeletons/Skeleton'
import TabletSkeleton from '../../components/SushiCard/Skeletons/TabletSkeleton'

import styles from './Home.module.scss'
import { RootState, useAppDispatch } from '../../redux/store'

export type TSortItem = {
   name: string
   sortProperty: string
}

const Home = () => {
   const dispatch = useAppDispatch()
   const { searchValue } = useSelector((state: RootState) => state.headerSlice)
   const { sushiData, category, sort, currentPage, itemsPerPage, totalPages, status } =
      useSelector((state: RootState) => state.homeSlice)

   const [isPopupOpened, setIsPopupOpened] = useState(false)
   const [rotateArrow, setRotateArrow] = useState(false)

   const startIndex = (currentPage - 1) * itemsPerPage
   const endIndex = startIndex + itemsPerPage
   const slicedSushi = sushiData ? sushiData.slice(startIndex, endIndex) : []

   const sortParam = `sortBy=${sort.sortProperty}`
   const categoryParam = `${category > 0 ? `&category=${category}` : ''}`
   const searchParam = `${searchValue ? `&title=*${searchValue}*` : ''}`

   const categoriesList: string[] = ['All', 'Single', 'Maki', 'Rolls', 'Bento', 'Plates']

   const screenWidth = window.innerWidth

   const skeletons =
      screenWidth < 1215 ? Array(6).fill(<TabletSkeleton />) : Array(6).fill(<Skeleton />)

   const sushiBlocks = slicedSushi.map((item: TSushiData) => (
      <SushiCard key={item.id} {...item} />
   ))

   const selectCategory = (c: number) => {
      dispatch(setCategory(c))
      dispatch(setCurrentPage(1))
   }

   const changeSort = (sortObj: TSortItem) => {
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
                  {screenWidth < 460 ? (
                     <img
                        className={styles.spinner}
                        src="/img/spinner.svg"
                        alt="Spinner"
                     />
                  ) : (
                     skeletons.map((skeleton, i) => <div key={i}>{skeleton}</div>)
                  )}
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

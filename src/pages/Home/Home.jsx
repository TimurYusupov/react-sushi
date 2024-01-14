import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setCategory, setSort } from '../../redux/slice/homeSlice'

import Categories from '../../components/Categories/Categories'
import Sort from '../../components/Sort/Sort'
import SushiCard from '../../components/SushiCard/SushiCard'

import styles from './Home.module.scss'
import Pagination from '../../components/Pagination/Pagination'

const Home = () => {
   const dispatch = useDispatch()
   const { searchValue } = useSelector((state) => state.headerSlice)
   const { category, sort } = useSelector((state) => state.homeSlice)

   const [allSushi, setAllSushi] = useState([])
   const [isPopupOpened, setIsPopupOpened] = useState(false)
   const [rotateArrow, setRotateArrow] = useState(false)
   const [currentPage, setCurrentPage] = useState(0)
   const [totalPages, setTotalPages] = useState(0)

   const itemsPerPage = 9
   const startIndex = currentPage * itemsPerPage
   const endIndex = startIndex + itemsPerPage
   const subset = allSushi.slice(startIndex, endIndex)

   const sortParam = `sortBy=${sort.sortProperty}`
   const categoryParam = `${category > 0 ? `&category=${category}` : ''}`
   const searchParam = `${searchValue ? `&title=*${searchValue}*` : ''}`

   const selectCategory = (c) => {
      dispatch(setCategory(c))
   }

   const changeSort = (sortObj) => {
      dispatch(setSort(sortObj))
   }

   const addSushi = (id) => {
      setAllSushi((prev) =>
         prev.map((item) => (item.id === id ? { ...item, count: item.count + 1 } : item))
      )
   }

   const changePage = (selectedPage) => {
      setCurrentPage(selectedPage.selected)
   }

   useEffect(() => {
      const fetchAllSushi = async () => {
         const res = await fetch(
            `https://518e0d814bf9a511.mokky.dev/items?${sortParam}${categoryParam}${searchParam}`
         )
         const data = await res.json()
         setAllSushi(data)
         setTotalPages(Math.ceil(data.length / itemsPerPage))
      }
      fetchAllSushi()
   }, [sortParam, categoryParam, searchParam])

   return (
      <div className="container">
         <section className={styles.categoriesSort}>
            <Categories category={category} selectCategory={selectCategory} />
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
            <h1>All:</h1>
            <div className={styles.sushiItems}>
               {subset.map((item) => (
                  <SushiCard addSushi={addSushi} key={item.id} {...item} />
               ))}
            </div>
         </section>

         <section className={styles.pagination}>
            <Pagination totalPages={totalPages} changePage={changePage} />
         </section>
      </div>
   )
}

export default Home

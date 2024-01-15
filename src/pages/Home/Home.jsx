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
   const [currentPage, setCurrentPage] = useState(1)
   const [totalPages, setTotalPages] = useState(0)

   const itemsPerPage = 9
   const startIndex = (currentPage - 1) * itemsPerPage
   const endIndex = startIndex + itemsPerPage
   const slicedSushi = allSushi.slice(startIndex, endIndex)

   const sortParam = `sortBy=${sort.sortProperty}`
   const categoryParam = `${category > 0 ? `&category=${category}` : ''}`
   const searchParam = `${searchValue ? `&title=*${searchValue}*` : ''}`

   const categoriesList = ['All', 'Single', 'Maki', 'Rolls', 'Bento', 'Plates']

   const selectCategory = (c) => {
      dispatch(setCategory(c))

      setCurrentPage(1)
   }

   const changeSort = (sortObj) => {
      dispatch(setSort(sortObj))
   }

   const addSushi = (id) => {
      setAllSushi((prev) =>
         prev.map((item) => (item.id === id ? { ...item, count: item.count + 1 } : item))
      )
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
               {slicedSushi.map((item) => (
                  <SushiCard addSushi={addSushi} key={item.id} {...item} />
               ))}
            </div>
         </section>

         <section className="pagination">
            <Pagination
               currentPage={currentPage}
               setCurrentPage={setCurrentPage}
               totalPages={totalPages}
            />
         </section>
      </div>
   )
}

export default Home

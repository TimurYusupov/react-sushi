import { useEffect, useRef, useState } from 'react'
import styles from './Sort.module.scss'

const Sort = () => {
   const [isPopupOpened, setIsPopupOpened] = useState(false)
   const [rotateArrow, setRotateArrow] = useState(false)
   const [sort, setSort] = useState('Rating')
   const sortRef = useRef()

   const sortList = [
      {
         name: 'Rating'
      },
      {
         name: 'Lowest Price'
      },
      {
         name: 'Highest Price'
      }
   ]

   const openPopup = () => {
      setRotateArrow(!rotateArrow)
      setIsPopupOpened(!isPopupOpened)
   }

   const selectSort = (objName) => {
      setSort(objName)
      setIsPopupOpened(false)
      setRotateArrow(false)
   }

   useEffect(() => {
      const handleClickOutside = (e) => {
         if (!sortRef.current.contains(e.target)) {
            setIsPopupOpened(false)
            setRotateArrow(false)
         }
      }

      document.addEventListener('click', handleClickOutside)

      return () => {
         document.removeEventListener('click', handleClickOutside)
      }
   }, [])

   return (
      <div className={styles.sort} ref={sortRef}>
         <div className={styles.sortName}>
            <svg
               width="10"
               height="6"
               viewBox="0 0 10 6"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
               className={`${styles.arrow} ${rotateArrow ? styles.rotated : ''}`}
            >
               <path
                  d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                  fill="#2C2C2C"
               />
            </svg>
            <b>Sort by:</b>
            <span onClick={openPopup}>{sort}</span>
         </div>

         {isPopupOpened && (
            <ul className={styles.popup}>
               {sortList.map((obj, i) => (
                  <li
                     className={obj.name === sort ? styles.selected : ''}
                     key={i}
                     onClick={() => selectSort(obj.name)}
                  >
                     {obj.name}
                  </li>
               ))}
            </ul>
         )}
      </div>
   )
}

export default Sort

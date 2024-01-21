import { useState, useRef } from 'react'
import { useAppDispatch } from '../../redux/store'
import { setSearchValue } from '../../redux/slice/headerSlice'
import { setCurrentPage } from '../../redux/slice/homeSlice'

import styles from './Search.module.scss'

const Search: React.FC = () => {
   const dispatch = useAppDispatch()
   const [searchInput, setSearchInput] = useState('')

   const inputRef = useRef<HTMLInputElement | null>(null)

   const clearInput = () => {
      setSearchInput('')
      inputRef.current?.focus()
   }

   const findPizza = () => {
      dispatch(setSearchValue(searchInput))
      dispatch(setCurrentPage(1))
   }

   return (
      <div className={styles.search}>
         <div className={styles.searchInput}>
            <img
               className={styles.searchIcon}
               src={'/img/header/search-icon.svg'}
               alt="Search Icon"
               width={20}
            />
            <input
               type="text"
               placeholder="Find sushi"
               ref={inputRef}
               value={searchInput}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchInput(e.target.value)
               }
            />
            {searchInput && (
               <img
                  className={styles.clearIcon}
                  src={'/img/header/clear-search.svg'}
                  alt="clear search"
                  width={20}
                  onClick={clearInput}
               />
            )}
         </div>
         <button className="button" onClick={findPizza}>
            Find
         </button>
      </div>
   )
}

export default Search

import { useState, useRef } from 'react'
import styles from './Search.module.scss'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slice/headerSlice'

const Search = () => {
   const dispatch = useDispatch()
   const [searchInput, setSearchInput] = useState('')

   const inputRef = useRef()

   const clearInput = () => {
      setSearchInput('')
      inputRef.current.focus()
   }

   const findPizza = () => {
      dispatch(setSearchValue(searchInput))
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
               onChange={(e) => setSearchInput(e.target.value)}
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

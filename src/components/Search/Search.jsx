import { useRef, useState } from 'react'
import styles from './Search.module.scss'

const Search = () => {
   const [searchInput, setSearchInput] = useState('')
   const inputRef = useRef()

   const clearInput = () => {
      setSearchInput('')
      inputRef.current.focus()
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
         <button className="button">Find</button>
      </div>
   )
}

export default Search
